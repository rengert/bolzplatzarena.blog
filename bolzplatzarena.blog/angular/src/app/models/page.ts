import { Block } from './block';
import { PageType } from './page-type.enum';
import { Post } from './post';

export interface Page {
  title: string;
  blocks: Block[];
  posts: Post[];
  permalink: string;
  type: PageType;
}
