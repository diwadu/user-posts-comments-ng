import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../common/base.component';
import { PostsService } from './posts.service';
import { Observable, forkJoin } from 'rxjs';
import { UserPostModel } from '../common/models/user-post.model';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends BaseComponent implements OnInit {

  public usersPosts: UserPostModel[];

  constructor(private injector: Injector, private postsService: PostsService) {
    super(injector);
  }

  ngOnInit() {
    const users$ = this.postsService.getUsers();
    const posts$ = this.postsService.getPosts();

    forkJoin([users$, posts$]).subscribe(val => {
      console.log(val);
      this.usersPosts = this.postsService.combineUsersAndPosts(val[0], val[1]);
      console.log(this.usersPosts);
    });
  }

}
