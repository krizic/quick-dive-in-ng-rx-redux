import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { TasksPageModule } from './pages/tasks-page/tasks-page.module';
import { SigninPageModule } from './pages/signin-page/signin-page.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { appRoutes } from './routes/app.routes';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { taskPageReducer } from './pages/tasks-page/reducers/tasks-page.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports:      [
    ApiModule.forRoot(),
    BrowserModule,
    TasksPageModule,
    SigninPageModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({
      tasksPage: taskPageReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    AuthGuard
  ],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
