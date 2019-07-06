import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../common/base.component';
import { PostsService } from './posts.service';
import { Observable, forkJoin } from 'rxjs';
import { UserPostModel } from '../common/models/user-post.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends BaseComponent implements OnInit {

  usersPosts: UserPostModel[];
  paginationStart: number = 0;
  paginationPrevDisabled = false;
  paginationNextDisabled = false;
  paginationPageNumber = 0;
  totalCount: number = 0;
  postContent: string;

  constructor(private injector: Injector, private postsService: PostsService) {
    super(injector);
  }

  ngOnInit() {
    this.getData(this.paginationStart);
    this.totalCount = this.getTotalPostsCount();
  }

  next(): void {
    this.paginationStart = this.paginationStart + environment.pageSize;
    this.getData(this.paginationStart)
  }

  prev(): void {
    this.paginationStart = this.paginationStart - environment.pageSize;
    this.getData(this.paginationStart)
  }
  setPostContent(postContent: string) {
    this.postContent = postContent;
  }

  private getData(start: number): void {
    const users$ = this.postsService.getUsers();
    const posts$ = this.postsService.getPosts(start, environment.pageSize);

    forkJoin([users$, posts$]).subscribe(val => {
      this.usersPosts = this.postsService.combineUsersAndPosts(val[0], val[1]);
      console.log(this.usersPosts);
      this.setPrevButtonState();
      this.setNextButtonState();

    });
  }

  private setPrevButtonState(): void {
    this.paginationStart <= 0 ? this.paginationPrevDisabled = true : this.paginationPrevDisabled = false;
  }

  private setNextButtonState(): void {
    const totalCount = this.getTotalPostsCount();
    (totalCount - this.paginationStart) <= environment.pageSize ? this.paginationNextDisabled = true : this.paginationNextDisabled = false;
  }

}
