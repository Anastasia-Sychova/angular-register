import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '@services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isAuthorized = false;
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
    if (this.registerForm.invalid) {
      let message = '';
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
      if (message) {
        this.messageService.open(message, 'CLOSE');
      }
      return;
    }
  }

}
