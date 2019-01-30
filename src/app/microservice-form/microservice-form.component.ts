import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MicroserviceConfig } from '../microservice';

@Component({
  selector: 'app-microservice-form',
  templateUrl: './microservice-form.component.html',
  styleUrls: ['./microservice-form.component.css']
})
export class MicroserviceFormComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  schemes = ['http', 'https'];
  hostProviders = ['static', 'dynamic'];
  runtimes = ['jar', 'war'];

  model = new MicroserviceConfig(
    'capco_service', // input
    '1', // input
    '/app', // input
    'dynamic', // select - populated from "hostProviders"
    window.location.hostname, // input - only show when hostProviders is "static"
    8080, // input (number)
    'http', // select - populated from "schemes"
    {}, // don't worry about this
    'jar', // select - populated from "runtimes"
    '', // input - split on spaces before POST
    '', // input - split on spaces before POST
    null // file upload - must be a .jar or .war file.
  );

  submitted = false;

  ngOnInit() {
  }

  onSubmit() {

    if (this.model.file.length > 0) {
        const file: File = this.model.file[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        let options = {
          headers: new HttpHeaders({
            'Accept': 'application/json'
          })
         };

        this.http.post<any>('/microservices/upload', formData, options).pipe(
          catchError(this.handleError)
        ).subscribe((data) => {

          // Send new POST request to http://192.168.50.129:8001/microservices/start
          //
          const postBody = {
            'servicekey': this.model.serviceKey,
            'serviceid': this.model.serviceId,
            'basepath': this.model.basePath,
            'hostprovider': this.model.hostProvider,
            'host': this.model.host,
            'port': this.model.port,
            'scheme': this.model.scheme,
            'metadata': this.model.metadata,
            'runtime': this.runtimes,
            'args': this.model.args,
            'environment': this.model.environment,
            'filepath': data.filepath
          };

          options = {
            headers: new HttpHeaders({
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            })
          };
          return this.http.post<any>('/microservices/start', postBody, options).pipe(
            catchError(this.handleError)
          ).subscribe(console.log);
        });
    }

    this.submitted = true;
  }

  fileChange(event) {
    this.model.file = event.target.files;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
    }
}
