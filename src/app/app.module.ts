import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from '@components/register/register.component';
import { AuthService } from '@services/auth.service';
import { AuthInterceptor } from '@interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    {provide: FormGroup, useValue: {}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
