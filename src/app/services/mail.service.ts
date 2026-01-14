import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleMail } from '../models/mail.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private server = environment.server;

  constructor(private http: HttpClient) {}

  sendEmail(mail: SimpleMail): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': 'qdhewxcxhnsgfp8ppiq2pino677plqs0rlga3j3vzwnwqawpwa'
    });

    return this.http.post(`${this.server}/api/mailto`, mail, { headers });
  }
}
