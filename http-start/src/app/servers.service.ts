import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ServersService {
  constructor(private http: Http) {
  }

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // changed from post to put
    return this.http.put('https://test-server-30137.firebaseio.com/servers.json',
      servers,
      {headers: headers}); // this is an observable
  }

  getServers() {
    return this.http.get('https://test-server-30137.firebaseio.com/servers.json')
      .pipe(
        map(
        (response: Response) => {
          const data = response.json();
          data.forEach(server => {
            server.name = 'FETCHED_' + server.name;
          });
          return data;
      }),
        catchError(
          (error: Response) => {
            return throwError('Something went wrong');
          }
        )
      );
  }

  getAppName() {
    return this.http.get('https://test-server-30137.firebaseio.com/appName.json')
      .pipe(map(
        (res: Response) => {
          return res.json();
        }
      ));
  }
}
