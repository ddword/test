import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { GlobalService } from './../global.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  providers: [GlobalService]
})
export class ControlPanelComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  folderForm: FormGroup;
  
  constructor(
    public _GlobalService: GlobalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }
  
  @Input() currentFolderId: string;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log("File", droppedFile.relativePath, file);
          this.postServiceFile(file);
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
  
  public onSelectFolder(event){
    if (event.target.value.length > 0) {
      const folder = event.target.value;
      this.folderForm.get('dirname').setValue(folder);
    }
  }
  
  createForm() {
    this.folderForm = this.fb.group({
      dirname: ['']
    });
  }
  
  ngOnInit(): void { }

  async postServiceFile(file) {
    let body = {
      description: file.type,
      is_folder: true,
      metadata: {
        parent_id: this.currentFolderId
      },
      size: file.size,
      title: file.name
    };
    const upload_session_id: string = '3205697';
    await this._GlobalService.postFile(this.currentFolderId, body);
    this._GlobalService.uploadFile(upload_session_id, file);
  }
  
  async onSubmitCreateFolder() {
    let body = {
      is_folder: true,
      metadata: {
        parent_id: this.currentFolderId
      },
      title: this.folderForm.get('dirname').value
    };

    await this._GlobalService.postFile(this.currentFolderId, body);
  }

}
