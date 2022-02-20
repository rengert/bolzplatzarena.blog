import { Block } from './block';
import { MetaInfo } from './meta-info';
import { PageType } from './page-type.enum';
import { Taxonomy } from './taxonomy';
import { Teaser } from './teaser';

export interface Page extends MetaInfo {
  id: string;
  blocks: Block[];
  posts: Teaser[];
  link: string;
  type: PageType;
  tags: Taxonomy[];
  sortOrder: number;
}
