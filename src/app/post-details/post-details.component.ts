import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../common/models/post.model';
import { PostDetailsService } from './post-details.service';
import { CommentModel } from '../common/models/comment.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public post: PostModel;
  public comments: CommentModel[];
  public currentCommentId: number;
  public formOpened: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private postDetailsService: PostDetailsService) { }

  ngOnInit() {
    this.getData(this.activatedRoute.snapshot.params['postId']);
  }

  getData(postId: number) {

    const post$ = this.postDetailsService.getPostById(postId);
    const comments$ = this.postDetailsService.getPostComments(postId);

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
    this.postDetailsService.deleteComment(this.currentCommentId).subscribe(data => {
      console.log(data);
      this.getData(this.activatedRoute.snapshot.params['postId']);
      jQuery('#deleteCommentModal').modal('hide');

    });
  }

  openCloseForm(): void {
    this.formOpened = !this.formOpened;
  }

}
