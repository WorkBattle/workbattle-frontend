import { BrowserModule } from '@angular/platform-browser';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

registerLocaleData(ru);

export function initApp(
  configurationService: ConfigurationService
): () => Promise<void> {
  return () => configurationService.load().toPromise();
}

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzResultModule,
  ],
  providers: [
    PublicRouterGuard,
    PrivateRouterGuard,
    AuthService,
    ConfigurationService,
    { provide: NZ_I18N, useValue: ru_RU },
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
