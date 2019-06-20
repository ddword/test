import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from './../global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [GlobalService]
})
export class NavbarComponent implements OnInit {
  sessionForm: FormGroup;
  
  public xSessionId: string = '';
  /*@Output() xSessionIdValue: EventEmitter<string> = new EventEmitter();*/

  constructor(
    public _GlobalService: GlobalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }
  
  createForm() {
    this.sessionForm = this.fb.group({
      xSessionId: ['']
    });
  }
  
  ngOnInit() {
  }
  
  public onSubmitSaveSession() {
    this.xSessionId = this.sessionForm.get('xSessionId').value;
    localStorage['xSessionId'] = this.xSessionId;
    //this.xSessionIdValue.emit(this.xSessionId);
  }  
}
