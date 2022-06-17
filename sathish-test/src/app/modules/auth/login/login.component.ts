import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm!: FormGroup;
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
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get myForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      return this.apiService.loginUser(this.loginForm.value).subscribe({
        next(data) {
          sessionStorage.setItem('token', data.token);
        },
        complete: () => {
          //
          console.log('User successfully Login!'),
            this.ngZone.run(() => this.router.navigateByUrl('/'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
