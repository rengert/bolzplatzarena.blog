import { Block } from './block';
import { PageType } from './page-type.enum';
import { Teaser } from './teaser';

export interface Page {
  title: string;
  blocks: Block[];
  posts: Teaser[];
  permalink: string;
  type: PageType;
}
