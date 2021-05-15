import { Block } from './block';
import { PageType } from './page-type.enum';
import { Teaser } from './teaser';

export interface Page {
  title: string;
  blocks: Block[];
  posts: Teaser[];
  link: string;
  type: PageType;

  //meta
  keywords: string;
  description: string;
  robots: string;
  metaTitle: string;
}
