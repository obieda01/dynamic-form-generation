import { QuestionAbstract } from '../models/question-abstract';

export class TextQuestion extends QuestionAbstract {
  type = 'input';
  cType: string;

  constructor(options: {} = {}) {
    super(options);
    this.cType = options['cType'] || '';
  }
}

