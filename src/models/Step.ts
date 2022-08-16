import StepTypes from '../types/Step';

// interface StepConstructor {
//   step: string;
//   data: object;
// }

export default class Step implements StepTypes {
  name: string;
  url: string;
  hasSearch: boolean;
  icon: string;
  step: string;
  insideSteps: number;

  constructor(step: string, data: object) {
    console.log(step);
    this.name = step;
    this.url = data._url;
    this.hasSearch = Boolean(data._search);
    this.icon = 'Folder';
    this.step = step;
    this.insideSteps = Object.values(data).length;
  }
}
