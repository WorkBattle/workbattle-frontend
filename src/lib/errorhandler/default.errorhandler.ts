import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfigurationService} from '../service/configuration.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {environment} from '../../environments/environment';

@Injectable()
export class DefaultErrorhandler implements ErrorHandler {
  constructor(private notificationService: NzNotificationService,
              private config: ConfigurationService) {
  }

  handleError(error): void {
    if (error instanceof HttpErrorResponse && error.url.includes(this.config.getApiEndpoint())) {
      this.notificationService.error('Ошибка!', error.error);
    }
    if (!environment.production) {
      throw error;
    }
  }
}
