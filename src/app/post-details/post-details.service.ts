import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PostModel, PostModelAdapter } from '../common/models/post.model';

import { map } from "rxjs/operators";
import { BaseService } from '../common/base.service';
import { CommentModel, CommentModelAdapter } from '../common/models/comment.model';

@Injectable({
    providedIn: 'root'
})
export class PostDetailsService extends BaseService {

    constructor(
        private http: HttpClient,
        private postModelAdapter: PostModelAdapter,
        private commentModelAdapter: CommentModelAdapter,
        injector: Injector) {
        super(injector);
    }

    getPostById(postId: number): Observable<PostModel> {
        return this.http.get<PostModel>(`${environment.apiUrl}/posts/${postId}`).pipe(
            map((data: any) => this.postModelAdapter.adapt(data))
        )
    }

    getPostComments(postId: number): Observable<CommentModel[]> {
        return this.http.get(`${environment.apiUrl}/comments?postId=${postId}`).pipe(
            map((data: any[]) => data.map(item => this.commentModelAdapter.adapt(item)))
        )
    }

    deleteComment(commentId: number) {
        return this.http.delete(`${environment.apiUrl}/comments/${commentId}`);
    }

    createComment(comment: CommentModel) {
        return this.http.post(`${environment.apiUrl}/comments`, comment);
    }
}