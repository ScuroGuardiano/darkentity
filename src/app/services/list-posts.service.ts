import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import IPostListElement from './post-list-element';
import { sorting_t } from './sorting';

@Injectable({
  providedIn: 'root'
})
export class ListPostsService {

  constructor() { }

  public async listPosts(
    namespace: string,
    limit: number,
    offset: number,
    sorting: sorting_t,
    tags?: string[]
  ): Promise<IPostListElement[]> {
    let url = environment.api + '/blog/list-posts';
    url += `?namespace=${namespace}`;
    url += `&limit=${limit}`;
    url += `&offset=${offset}`;
    url += `&sorting=${sorting}`;

    if (tags) {
      url += `&tags=${tags.join('&tags=')}`;
    }

    const response = await fetch(url);

    if (response.status !== 200) {
      console.error(`Error while fetching post list: ${response.status} ${response.statusText}`);
      return [];
    }

    return await response.json();
  }
}
