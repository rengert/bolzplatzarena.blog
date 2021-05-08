import { Block } from './block';
import { Field } from './field';

export interface Post {
  title: string;
  teaser: { body: Field };
  blocks: Block[];
  permalink: string;
}
