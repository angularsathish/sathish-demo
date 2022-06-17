import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Posts: any = [];
  Comments: any = [];
  submitted = false;
  commentForm!: FormGroup;
  isValid: boolean = false;

  constructor(
    private apiServ: PostService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.readPost();
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.commentForm = this.fb.group({
      message: ['', Validators.required],
      postId: ['', Validators.required],
      _id: [null],
    });
  }

  readPost() {
    this.apiServ.getPosts().subscribe((data) => {
      this.Posts = data;
    });
  }

  removePost(post) {
    if (window.confirm('Are you sure?')) {
      console.log('delete post', post);
      this.apiServ.deletePost(post._id).subscribe((data) => {
        this.readPost();
      });
    }
  }

  editPost(post) {
    this.router.navigate(['/dashboard/posts'], {
      state: { data: post },
    });
  }

  editComment(post) {
    console.log('post', post);
    this.getComments(post._id);
  }

  getComments(id) {
    this.commentForm.patchValue({ postId: id });
    this.apiServ.getComments(id).subscribe((data) => {
      console.log('comment list', data);
      this.Comments = data;
    });
  }

  get myForm() {
    return this.commentForm.controls;
  }

  SubmitForm() {
    this.submitted = true;
    if (!this.commentForm.valid) {
      this.commentForm.markAllAsTouched();
      return;
    } else {
      return this.apiServ.createComments(this.commentForm.value).subscribe({
        complete: () => {
          this.commentForm.reset();
          this.submitted = false;
          console.log('Comments successfully created!');
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  handleChange(type) {
    if (type === 'TABLE') {
      this.isValid = false;
    } else if (type === 'CARD') {
      this.isValid = true;
    }
  }
}
