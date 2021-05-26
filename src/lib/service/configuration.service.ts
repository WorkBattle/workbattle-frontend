import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { mapTo, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configuration = {};

  constructor(private httpClient: HttpClient) {}

  load(): Observable<void> {
    return this.httpClient.get('/assets/config.json').pipe(
      tap((configuration: any) => {
        this.configuration = configuration;
      })
    );
  }

  getApiEndpoint(): string {
    return environment.production
      ? `${location.protocol}//${location.host}/api/v${this.getValue(
          'apiVersion'
        )}`
      : this.getValue('api');
  }

  getValue(key: string, defaultValue?: any): any {
    return this.configuration[key] || defaultValue;
  }
}
