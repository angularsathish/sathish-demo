import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: AuthService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get myForm() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log('registerForm', this.registerForm.value);
    this.submitted = true;
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    } else {
      return this.apiService.createUser(this.registerForm.value).subscribe({
        complete: () => {
          console.log('User successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/auth/login'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
