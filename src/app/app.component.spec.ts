import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { RegisterComponent } from '@components/register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '@services/auth.service';
import { AuthServiceSpy } from '@mock/auth.service.spy';

describe('AppComponent', () => {
  let fixture;
  let app;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        RegisterComponent,
        AppComponent
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceSpy
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('content should be loaded', () => {
    fixture.detectChanges();
    expect(app.contentLoaded).toBeTruthy();
  });
});
