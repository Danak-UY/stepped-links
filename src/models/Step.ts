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

  constructor(step: string | null, data: object | string) {
    this.name = step ?? 'Undefined name';
    this.url = data._url ?? 'Undefined url';
    this.hasSearch = Boolean(data._search);
    this.icon = 'Folder';
    this.step = step ?? 'Undefined step';
    this.insideSteps = Object.values(data).length;
  }
}
