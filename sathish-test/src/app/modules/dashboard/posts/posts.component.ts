import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  submitted = false;
  postForm!: FormGroup;
  private filesControl = new FormControl(null, [
    FileUploadValidators.filesLimit(1),
    Validators.required,
  ]);

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: PostService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    const param = history.state.data;
    console.log('param', param);
    this.postForm.patchValue(param);
    // const token = sessionStorage.getItem('token');
    // // const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    // const userId = JSON.parse(atob(token.split('.')[1])).userId;
  }

  mainForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      description: [''],
      _id: [null],
      image: this.filesControl,
    });
  }

  get myForm() {
    return this.postForm.controls;
  }

  get file() {
    return this.postForm.get('image');
  }

  onSubmit() {
    console.log('registerForm', this.postForm.value);
    this.submitted = true;
    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    } else {
      const id = this.postForm.value._id;
      if (id == null) {
        return this.apiService.createPost(this.postForm.value).subscribe({
          complete: () => {
            console.log('Post successfully created!'),
              this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
          },
          error: (e) => {
            console.log(e);
          },
        });
      } else {
        return this.apiService.updatePost(id, this.postForm.value).subscribe({
          complete: () => {
            console.log('Post successfully Updated!'),
              this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}
