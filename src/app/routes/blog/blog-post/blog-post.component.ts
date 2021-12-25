import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  key?: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key');
  }

}
