export class QuestionAbstract {
    value: String;
    id: number;
    multiple: boolean;
    min: number;
    required: boolean;
    text: string;
    type: string;
  
    constructor(options: {
        value?: String;
        id?: number,
        multiple?: boolean,
        min?: number,
        required?: boolean,
        text?: string,
        type?: string,
      } = {}) {
      this.value = options.value || '';
      this.id = options.id  === undefined ? 1 : options.id;
      this.multiple = !!options.multiple ;
      this.min = options.min  === undefined ? 1 : options.min;
      this.required = !!options.required;
      this.text = options.text || '';
      this.type = options.type || '' ;
      
    }
  }
  