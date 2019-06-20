import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class GlobalService {
  apiURL: string = 'http://jeremie.eastus.cloudapp.azure.com:9081';
  xSessionId: string = '2952904';
  
  constructor( public http: HttpClient ) {}
  
  public postFile(parent_id, body) {
    return new Promise((resolve, reject) => {
      
      let headers = new HttpHeaders().set('X-Session-Id', this.xSessionId);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      
      this.http.post(`${this.apiURL}/fs/files/${parent_id ? parent_id : 'root'}`, body, {headers: headers})
          .subscribe(res => {
            resolve(res);
          },
          error => {
            reject(error);
          });
    });
  }
  
  public uploadFile(upload_session_id, data) {
    return new Promise((resolve, reject) => {
      
      let headers = new HttpHeaders().set('X-Session-Id', this.xSessionId);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      
      this.http.patch(`${this.apiURL}/fs/upload/${upload_session_id}`, data, {headers: headers})
        .subscribe(res => { 
          resolve(res); 
        },
        error => {
          reject(error);
        });
    });     
  }
  
  public rewriteFiles(id) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('X-Session-Id', this.xSessionId);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      
      this.http.get(`${this.apiURL}/fs/files/${id ? `?filters=parent='${id}'` : ''}`, {headers: headers})
          .subscribe(res => {
            console.log('rewriteFiles Done');
            resolve(res);  
          },
          error => {
            reject(error);
          });
    });
  }
  
  public deleteFileResource(id) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('X-Session-Id', this.xSessionId);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      
      this.http.delete(`${this.apiURL}/fs/files/${id}`, {headers: headers})
          .subscribe(res => {
            console.log('getFile Done');
              resolve(res);
            },
            error => {
              reject(error);
            });
    });
  }
  
  public moveToSource(fileId, destId) {
    let headers = new HttpHeaders().set('X-Session-Id', this.xSessionId);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      
    let body = {
      destId
    };
    
    this.http.patch(`${this.apiURL}/fs/files/${fileId}/move`, body, {headers: headers})
      .subscribe(res => {
        console.log('getFile Done', res);
        },
        error => {
          console.log('error', error);
        });  
  }
}
