import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from './../global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GlobalService]
})
export class DashboardComponent implements OnInit {
  files = [];
  
  constructor(public _GlobalService: GlobalService) { } 
  
  public _currentFolderId: string = '';
  @Output() currentFolderId: EventEmitter<string> = new EventEmitter();

  async ngOnInit() {
    //this.files = [];
    //if (localStorage.getItem('xSessionId')) {
    this.rewriteServicesFiles();
  }
  
  public onClickFolder(event, {id = '', isFolder = true} = {}) {
    if (isFolder) {
      this._currentFolderId = id;
      this.currentFolderId.emit(this._currentFolderId);
      this.rewriteServicesFiles();
    }
    return false;
  }
  
  public onDelete(event, id) {
    console.log('deleteServicesFiles');
    this._GlobalService.deleteFileResource(id);
    this.rewriteServicesFiles();
    return false;
  }
  
  public onMoveTo(event, fileId) {
    console.log('moveServicesFiles');
    const destId = '';
    this._GlobalService.moveToSource(fileId, destId);
  }
  
  public async rewriteServicesFiles() {
    let res: any = await this._GlobalService.rewriteFiles(this._currentFolderId);
    if (res && res.data) {
      this.files = res.data;
    }
  }
}
