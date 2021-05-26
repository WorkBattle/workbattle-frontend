import { BrowserModule } from '@angular/platform-browser';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler,
  NgModule,
} from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ConfigurationService } from '../lib/service/configuration.service';
import { PublicRouterGuard } from '../lib/guard/public-router.guard';
import { PrivateRouterGuard } from '../lib/guard/private-router.guard';
import { AuthService } from '../lib/service/auth.service';
import { PersonalAreaComponent } from './dashboard/personal-area/personal-area.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalAreaContestComponent } from './dashboard/personal-area/contest/personal-area-contest.component';
import { ContestComponent } from './dashboard/contest/contest.component';
import { NotfoundComponent } from './dashboard/notfound/notfound.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { SubmissionComponent } from './dashboard/submission/submission.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { ContestSubmissionComponent } from './dashboard/contest/submission/contest-submission.component';
import { SubmissionCommentComponent } from './dashboard/submission/comment/submission-comment.component';
import { ContestService } from '../lib/service/contest.service';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { LoginModalComponent } from './landing/login-modal/login-modal.component';
import { RegisterModalComponent } from './landing/register-modal/register-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { JwtInterceptor } from '../lib/interceptor/jwt.interceptor';
import { RefreshInterceptor } from '../lib/interceptor/refresh.interceptor';
import { DefaultErrorhandler } from '../lib/errorhandler/default.errorhandler';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../lib/service/user.service';
import { CreateContestModalComponent } from './dashboard/personal-area/create-contest/create-contest-modal.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateSubmissionComponent } from './dashboard/contest/create-submission/create-submission.component';
import { SubmissionService } from '../lib/service/submission.service';
import { NzUploadModule } from 'ng-zorro-antd/upload';

registerLocaleData(ru);

export function initApp(
  configurationService: ConfigurationService
): () => Promise<void> {
  return () => configurationService.load().toPromise();
}

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PersonalAreaComponent,
    DashboardComponent,
    PersonalAreaContestComponent,
    ContestComponent,
    NotfoundComponent,
    SubmissionComponent,
    UserProfileComponent,
    ContestSubmissionComponent,
    SubmissionCommentComponent,
    LoginModalComponent,
    RegisterModalComponent,
    CreateContestModalComponent,
    CreateSubmissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzResultModule,
    NzIconModule,
    NzModalModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzUploadModule,
    NzSelectModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzButtonModule,
  ],
  providers: [
    AuthService,
    UserService,
    PublicRouterGuard,
    PrivateRouterGuard,
    ContestService,
    SubmissionService,
    ConfigurationService,
    NzNotificationService,
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_I18N, useValue: ru_RU },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: DefaultErrorhandler,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigurationService],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
