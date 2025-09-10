import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  httpClient = inject(HttpClient);

  get<T>(endopoint: string): Observable<T> {
    return this.httpClient.get<T>(endopoint, { headers: this.httpHeaders });
  }

  post<T>(endopoint: string, data: any): Observable<T> {
    return this.httpClient.post<T>(endopoint, data, { headers: this.httpHeaders });
  }

  put<T>(endopoint: string, data: any): Observable<T> {
    return this.httpClient.put<T>(endopoint, data, { headers: this.httpHeaders });
  }

  delete<T>(endopoint: string): Observable<T> {
    return this.httpClient.delete<T>(endopoint);
  }
}
