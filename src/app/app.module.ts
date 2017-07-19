import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { TasksPageModule } from './pages/tasks-page/tasks-page.module';
import { SigninPageModule } from './pages/signin-page/signin-page.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { appRoutes } from './routes/app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports:      [
    ApiModule.forRoot(),
    BrowserModule,
    TasksPageModule,
    SigninPageModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard
  ],
  bootstrap:    [AppComponent]
})
export class AppModule {
}
