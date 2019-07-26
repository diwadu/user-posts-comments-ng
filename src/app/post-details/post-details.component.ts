import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostModel } from "../common/models/post.model";
import { PostDetailsService } from "./post-details.service";
import { CommentModel } from "../common/models/comment.model";
import { forkJoin } from "rxjs";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"]
})
export class PostDetailsComponent implements OnInit {
  public post: PostModel;
  public comments: CommentModel[];
  public currentCommentId: number;
  public formOpened = false;
  public newCommentForm: FormGroup;
  public submitted = false;
  private postId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postDetailsService: PostDetailsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.params["postId"];
    this.getData();
    this.newCommentForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      body: ["", [Validators.required, Validators.minLength(20)]]
    });
  }

  get f() {
    return this.newCommentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.newCommentForm.invalid) {
      return;
    }
    let comment = new CommentModel(
      0,
      this.postId,
      this.newCommentForm.get("name").value,
      this.newCommentForm.get("email").value,
      this.newCommentForm.get("body").value
    );
    this.postDetailsService.createComment(comment).subscribe(
      val => {
        $("#alertCommentCreated").show();
      },
      err => {
        console.error(err);
      }
    );
  }

  getData() {
    const post$ = this.postDetailsService.getPostById(this.postId);
    const comments$ = this.postDetailsService.getPostComments(this.postId);

    forkJoin([post$, comments$]).subscribe(val => {
      console.log(val);
      this.post = val[0];
      this.comments = val[1];
    });
  }

  setCommentId(commentId: number) {
    this.currentCommentId = commentId;
  }

  deleteComment() {
    this.postDetailsService
      .deleteComment(this.currentCommentId)
      .subscribe(data => {
        console.log(data);
        this.getData();
        jQuery("#deleteCommentModal").modal("hide");
      });
  }

  openCloseForm(): void {
    this.formOpened = !this.formOpened;
  }
}
