import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel, UserModelAdapter } from '../common/models/user.model';
import { PostModel, PostModelAdapter } from '../common/models/post.model';

import { map } from "rxjs/operators";
import { UserPostModel } from '../common/models/user-post.model';
import { BaseService } from '../common/base.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseService {

  constructor(private http: HttpClient,
    private userModelAdapter: UserModelAdapter,
    private postModelAdapter: PostModelAdapter,
    injector: Injector) {
    super(injector);
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get
      (`${environment.apiUrl}/users`).pipe(
        map((data: any[]) => data.map(item => this.userModelAdapter.adapt(item)))
      )
  }

  getPosts(start: number, limit: number): Observable<PostModel[]> {
    const pagingQuery = this.createPagingQuery(start, limit);
    return this.http.get<PostModel[]>(`${environment.apiUrl}/posts?${pagingQuery}`).pipe(
      map((data: any[]) => data.map(item => this.postModelAdapter.adapt(item)))
    );
  }

  combineUsersAndPosts(users: UserModel[], posts: PostModel[]): UserPostModel[] {
    return UserPostModel.combineUsersAndPosts(users, posts);
  }

}
