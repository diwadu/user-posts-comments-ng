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

  public usersPosts: UserPostModel[];

  paginationStart: number = 0;
  paginationPrevDisabled = false;
  paginationNextDisabled = false;
  paginationPageNumber = 0;

  totalCount: number = 0;

  constructor(private injector: Injector, private postsService: PostsService) {
    super(injector);
  }

  ngOnInit() {
    this.getData(this.paginationStart);
    this.totalCount = this.getTotalPostsCount();
  }

  private getData(start: number): void {
    const users$ = this.postsService.getUsers();
    const posts$ = this.postsService.getPosts(start, environment.pageSize);

    forkJoin([users$, posts$]).subscribe(val => {
      console.log(val);
      this.usersPosts = this.postsService.combineUsersAndPosts(val[0], val[1]);
      console.log(this.usersPosts);
      this.paginationPageNumber = this.pageSize /
        //20 start
        //10 pageSize 
        //100 wsyztskie

        this.setPrevButtonState();
      this.setNextButtonState();

    });
  }

  private setPrevButtonState(): void {
    if (this.paginationStart <= 0) {
      this.paginationPrevDisabled = true;
    } else {
      this.paginationPrevDisabled = false;
    }
  }

  private setNextButtonState(): void {
    const totalCount = this.getTotalPostsCount()
    if ((totalCount - this.paginationStart) <= environment.pageSize) {
      this.paginationNextDisabled = true;
    } else {
      this.paginationNextDisabled = false;
    }
  }

  next(): void {
    this.paginationStart = this.paginationStart + environment.pageSize;
    this.getData(this.paginationStart)
  }

  prev(): void {
    this.paginationStart = this.paginationStart - environment.pageSize;
    this.getData(this.paginationStart)
  }

}
