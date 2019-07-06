import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export interface IUserModel {
    id: number;
    name: string;
}

export class UserModel implements UserModel {
    constructor(public id: number, public name: string) { }
}

@Injectable({
    providedIn: 'root'
})
export class UserModelAdapter implements Adapter<UserModel> {

    adapt(item: any): UserModel {
        return new UserModel(
            item.id,
            item.name
        );
    }
}