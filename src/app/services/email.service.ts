import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendMailForgetPassword( email: string ){
    //console.log(email)

    let url = base_url + '/email';

    return this.http.post( url, email );
  }


}
