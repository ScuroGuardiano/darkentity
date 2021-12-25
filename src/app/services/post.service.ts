import { Injectable } from '@angular/core';
import IPost from 'functions/api/blog/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  public async getPost(key: string): Promise<IPost | null> {
    const url = environment.api + `/blog/post/${key}`;
    const response = await fetch(url);

    if (response.status !== 200) {
      console.error(`Error while fetching post ${key}: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  }
}
