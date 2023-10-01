import { BlockType } from './block-type.enum';
import { Field } from './field';

export interface Block {
  type: BlockType,
  body?: Field,
  rawCode?: Field,
}
