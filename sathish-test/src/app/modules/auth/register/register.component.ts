import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsService } from 'src/app/services/toasts.service';

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
    private apiService: AuthService,
    private toastServ: ToastsService
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
      try {
        // synchronous operation
        return this.apiService.createUser(this.registerForm.value).subscribe({
          next: (beers) => {
            console.log(beers);
          },
          error: (e) => {
            this.toastServ.showWarningToast('Invalid API Data', e());
          },
          complete: () =>
            this.ngZone.run(() => this.router.navigateByUrl('/auth/login')),
        });
      } catch (error) {
        console.log('try catch error', error);
        // handle error, only executed in case of error
      }
    }
  }
}
