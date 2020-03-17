import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '@services/message.service';
import { Register } from '@interfaces/register.interface';
import { Status } from '@interfaces/status.interface';
import {AuthService} from '@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isAuthorized = true;
  nameValidator = [
    Validators.required,
    Validators.minLength(1)
  ];
  websiteValidator = [
    Validators.required,
    Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
  ];
  emailValidator = [
    Validators.required,
    Validators.email
  ];
  passwordValidator = [
    Validators.required,
    Validators.minLength(8)
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    if (!this.isAuthorized) {
      this.registerForm = this.fb.group({
        first_name: new FormControl('', this.nameValidator),
        last_name: new FormControl('', this.nameValidator),
        website: new FormControl('', this.websiteValidator),
        email: new FormControl('', this.emailValidator),
        password: new FormControl('', this.passwordValidator),
        confirm_password: new FormControl('', this.passwordValidator),
      });
    }
  }

  registerUser() {
    const controls = this.registerForm.controls;
    let message = '';
    if (this.registerForm.invalid) {
      switch (true) {
        case controls.first_name.errors !== null:
          message += controls.first_name.errors.required ? 'First name field required.\n' : '';
        case controls.last_name.errors !== null:
          message += controls.last_name.errors.required ? 'Last name field required.\n' : '';
        case controls.website.errors !== null:
          message += controls.website.errors.required ? 'Website field required.\n' : '';
        case controls.email.errors !== null:
          message += controls.email.errors.required ? 'Email field required.\n' : '';
          message += controls.email.errors.email ? 'Invalid email format.\n' : '';
        case controls.password.errors !== null:
          message += controls.password.errors.required ? 'Password field required.\n' : '';
          message += controls.password.errors.pattern ? 'Password is too short.\n' : '';
        case controls.confirm_password.errors !== null:
          message += controls.confirm_password.errors.required ? 'Password re-enter field required.\n' : '';
          message += controls.confirm_password.errors.pattern ? 'Confirm password is too short.\n' : '';
      }
    }
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirm_password').value;
    message += password !== confirmPassword ? 'Passwords must be match.' : '';
    if (message) {
      this.messageService.open(message, 'CLOSE');

      return;
    }

    const formValues = this.registerForm.getRawValue();
    const registerBody = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      website: formValues.website,
      email: formValues.email,
      password: formValues.password,
    } as Register;
    this.authService
      .register(registerBody)
      .subscribe((response: Status) => {
        console.log(response);
        this.authService.setStatus(response);
        this.isAuthorized = this.authService.isAuthorized();
        this.messageService.open('Your account has been created!', 'CLOSE');
      }, (error) => {
        this.messageService.open(error.error, 'CLOSE');
      });
  }
  back() {
    window.location.href = 'https://google.com';
  }
}
