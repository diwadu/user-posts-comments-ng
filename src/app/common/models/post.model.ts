import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export interface IPostModel {
    id: number;
    title: string;
    content: string;
    userId: number;
}

export class PostModel implements IPostModel {
    constructor(public id: number,
        public title: string,
        public content: string,
        public userId: number) { }
}

@Injectable({
    providedIn: 'root'
})
export class PostModelAdapter implements Adapter<PostModel> {

    adapt(item: any): PostModel {
        return new PostModel(
            item.id,
            item.title,
            item.body,
            item.userId
        );
    }
}