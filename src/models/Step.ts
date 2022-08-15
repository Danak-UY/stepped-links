export default class Step {
  constructor(step) {
    console.log(step);
    this.name = step._name;
    this.url = step._url;
    this.hasSearch = Boolean(step._search);
    this.icon = 'create icon';
    this.step = 'set next step';
    this.insideStems = 'build inside steps';
  }
}
