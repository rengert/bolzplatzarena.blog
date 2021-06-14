import { Block } from './block';
import { MetaInfo } from './meta-info';
import { PageType } from './page-type.enum';
import { Teaser } from './teaser';

export interface Page extends MetaInfo {
  blocks: Block[];
  posts: Teaser[];
  link: string;
  type: PageType;
}
