import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../common/base.component';
import { PostsService } from './posts.service';
import { Observable, forkJoin } from 'rxjs';
import { UserPostModel } from '../common/models/user-post.model';
import { environment } from 'src/environments/environment';
import * as $ from "jquery"

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends BaseComponent implements OnInit {

  usersPosts: UserPostModel[];
  paginationPrevDisabled = false;
  paginationNextDisabled = false;
  currentPostContent: string;
  currentPostId: number;


  pagination = {
    start: 0,
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalPages: 0,
    totalCount: 0,
    currentPage: 0
  };

  constructor(private injector: Injector, private postsService: PostsService) {
    super(injector);
  }

  ngOnInit() {
    this.getData(this.pagination.start);
    this.pagination.totalCount = this.getTotalPostsCount();
  }

  next(): void {
    this.pagination.start = this.pagination.start + environment.pageSize;
    this.getData(this.pagination.start)
  }

  prev(): void {
    this.pagination.start = this.pagination.start - environment.pageSize;
    this.getData(this.pagination.start)
  }

  setPostContent(postContent: string) {
    this.currentPostContent = postContent;
  }

  setPostId(postId: number) {
    this.currentPostId = postId;
  }

  deletePost() {
    this.postsService.deletePost(this.currentPostId).subscribe(data => {
      console.log(data);
      this.pagination.start = 0;
      this.getData(0);
      (<any>jQuery('#deletePostModal')).modal('hide');

    });
  }

  private getData(start: number): void {
    const users$ = this.postsService.getUsers();
    const posts$ = this.postsService.getPosts(start, environment.pageSize);

    forkJoin([users$, posts$]).subscribe(val => {
      this.usersPosts = this.postsService.combineUsersAndPosts(val[0], val[1]);
      console.log(this.usersPosts);
      this.setPrevButtonState();
      this.setNextButtonState();
      this.pagination.totalPages = Math.ceil(this.pagination.totalCount / environment.pageSize);
      this.pagination.currentPage = Math.ceil(start / environment.pageSize) + 1;
    });
  }

  private setPrevButtonState(): void {
    this.pagination.start <= 0 ? this.paginationPrevDisabled = true : this.paginationPrevDisabled = false;
  }

  private setNextButtonState(): void {
    const totalCount = this.getTotalPostsCount();
    (totalCount - this.pagination.start) <= environment.pageSize ? this.paginationNextDisabled = true : this.paginationNextDisabled = false;
  }

}
