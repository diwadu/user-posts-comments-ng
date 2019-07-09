import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class CommentModel {
    constructor(
        public id: number,
        public postId: number,
        public name: string,
        public email: string,
        public body: string) { }
}

@Injectable({
    providedIn: 'root'
})
export class CommentModelAdapter implements Adapter<CommentModel> {

    adapt(item: any): CommentModel {
        return new CommentModel(
            item.id,
            item.postId,
            item.name,
            item.email,
            item.body
        );
    }
}