import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts/posts.service';
import { PostModel } from '../common/models/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public postData: PostModel;

  constructor(private activatedRoute: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit() {
    const postId = this.activatedRoute.snapshot.params['postId'];
    const postData = this.postsService.getPostById(postId).subscribe(data => {
      this.postData = data;
      console.log(this.postData);
    });
  }

}
