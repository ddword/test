import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test file system';
  public currentFolderId: string = '';
 
  public onCurrentFolderId(id) {
    this.currentFolderId = id;
  }
}
