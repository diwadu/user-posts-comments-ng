import { UserModel } from './user.model';
import { PostModel } from './post.model';

export interface IUserPostModel {
    userId: number;
    userName: string;
    postId: number;
    postTitle: string;
    postContent: string;
}

export class UserPostModel implements IUserPostModel {
    constructor(
        public userId: number,
        public userName: string,
        public postId: number,
        public postTitle: string,
        public postContent: string,
    ) {

    }

    public static combineUsersAndPosts(users: UserModel[], posts: PostModel[]): UserPostModel[] {
        let result = posts.map((p: PostModel) => {
            let user = users.filter((u: UserModel) => {
                return u.id === p.userId;
            })[0];
            return new UserPostModel(user.id, user.name, p.id, p.title, p.content);
        });
        return result;
    }
}