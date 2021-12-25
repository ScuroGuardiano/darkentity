import { Component, Input, OnInit } from '@angular/core';
import IPost from 'functions/api/blog/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private postService: PostService
  ) { }

  @Input() namespace: string = 'blog';
  @Input() key?: string | null;

  post?: IPost | null;

  ngOnInit(): void {
    if (!this.key) {
      console.error("No key passed to PostComponent, aborting loading post...");
      return;
    }
    this.postService.getPost(`${this.namespace}/${this.key}`)
    .then(post => this.post = post);
  }

}
