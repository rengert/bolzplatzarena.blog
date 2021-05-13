import { Field } from './field';
import { Taxonomy } from './taxonomy';

export interface Teaser {
  title: string;
  body: Field;
  link: string;
  date: string;
  category: Taxonomy;
  tags: Taxonomy[];
}
