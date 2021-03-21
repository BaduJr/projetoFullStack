import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  //private SERVER_URL = "http://localhost:3000/";
  private SERVER_URL = "http://3.14.86.122:3000/";

  constructor(private httpClient: HttpClient) { }

  public listAll(){  
		return this.httpClient.get(this.SERVER_URL + 'listDevice');
	} 
  
  public save(data: any) {
    return this.httpClient.post(this.SERVER_URL + 'addDevice', data); 
  }

  public delete(id: any) {
    return this.httpClient.delete(this.SERVER_URL + 'deleteDevice/' + id);
  }
}