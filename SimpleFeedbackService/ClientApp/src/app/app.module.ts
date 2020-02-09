 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FeedformComponent } from './feedback-form/feedbackform.component'
import { FeedbackListComponent } from './feedback-list/feedbacklist.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ClientAppsComponent } from './clientapps/clientapps.component';
import { FeedbackTypesComponent } from './feedbacktypes/feedbacktypes.component';
import { BaseHttpService } from './services/BaseHttpService';
import { FeedbackState } from './state/feedback.state'
import { NglModule } from 'ng-lightning/ng-lightning'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FeedformComponent,
    FeedbackListComponent,
    ClientAppsComponent,
    FeedbackTypesComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NglModule.forRoot(),
    NgxsModule.forRoot([
      FeedbackState,
    ]),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'feedback/:token', component: FeedformComponent },
      { path: 'feedback', component: FeedformComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'client-apps', component: ClientAppsComponent },
      { path: 'feedbacktypes', component: FeedbackTypesComponent },
      { path: 'feebacklist/:token', component: FeedbackListComponent },
    ])
  ],
  providers: [
    BaseHttpService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'fi' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
