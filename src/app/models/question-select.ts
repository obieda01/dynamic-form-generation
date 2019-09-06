import { QuestionAbstract } from '../models/question-abstract';

export class SelectQuestion extends QuestionAbstract {
  type = 'select';
  options: {id: number, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}

