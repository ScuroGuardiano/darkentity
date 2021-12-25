import { Component, Input, OnInit } from '@angular/core';
import { ListPostsService } from 'src/app/services/list-posts.service';
import IPostListElement from 'src/app/services/post-list-element';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private listPostsService: ListPostsService) { }

  posts: IPostListElement[] = [];

  @Input() namespace: string = 'blog';

  ngOnInit(): void {
    this.listPostsService.listPosts(this.namespace, 666, 0, 'date:desc')
    .then(posts => this.posts = posts);
  }

  removeNamespaceFromKey(key: string): string {
    return key.replace(this.namespace + '/', '');
  }
}
