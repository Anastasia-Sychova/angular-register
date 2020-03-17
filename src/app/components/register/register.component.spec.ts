import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@services/auth.service';
import { AuthServiceSpy } from '@mock/auth.service.spy';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          MatInputModule,
          MatIconModule,
          MatButtonModule,
          MatSnackBarModule,
          MatCheckboxModule
        ],
        declarations: [ RegisterComponent ],
        providers: [
          {provide: FormGroup, useValue: {}},
          {
            provide: AuthService,
            useClass: AuthServiceSpy
          },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
