import StepTypes from '../types/Step';

import { Icon } from '@raycast/api';

// interface StepConstructor {
//   step: string;
//   data: object;
// }

export default class Step implements StepTypes {
  title: string;
  subtitle: string;
  url: string;
  combo: string[];
  hasSearch: boolean;
  icon: string;
  // step: string;
  insideSteps: number;

  constructor(step: string | null, data: object | string | string[]) {
    this.title = this.buildTitle(step, data) ?? 'Class empty';
    this.subtitle = this.buildSubtitle(step, data);
    this.url = this.buildUrl(data);
    this.combo = [];
    this.hasSearch = this.hasSearchLink(data);
    this.icon = this.buildIcon(data);
    this.insideSteps = this.countInsideSteps(data);
  }

  private buildTitle(step, data) {
    if (typeof data === 'string') {
      return step ?? data;
    }

    if (Array.isArray(data)) {
      return `[ ${data.length} ]`;
    }

    return step;
  }

  private buildSubtitle(step, data) {
    if (typeof data === 'string') {
      return step ? data : '';
    }

    if (Array.isArray(data)) {
      const joined = data.map((v) => `'${v}'`).join(',');
      return `[ ${joined} ]`;
    }

    const insideSteps: string[] = this.getInsideSteps(data);
    if (insideSteps.length === 0) {
      return data._name ?? data._url;
    }

    return `{ ${insideSteps.length} } - ${data._name}`;
  }

  private buildUrl(data) {
    if (typeof data === 'string') {
      return data;
    }

    if (Array.isArray(data)) {
      this.combo = data;
      return;
    }

    return data._url;
  }

  private buildIcon(data: object | string | string[]) {
    if (typeof data === 'string') {
      return Icon.Link;
    }

    if (Array.isArray(data)) {
      return Icon.Layers;
    }

    if (this.hasInsideSteps(data)) {
      return Icon.Folder;
    }

    if (this.hasSearchLink(data)) {
      return Icon.MagnifyingGlass;
    }

    if (this.hasUrlLink(data)) {
      return Icon.Link;
    }

    return Icon.Hashtag;
  }

  private hasUrlLink(data: object) {
    return Boolean(data._url);
  }

  private hasSearchLink(data: object) {
    return Boolean(data._search);
  }

  private getInsideSteps(data: object): string[] {
    const CONFIG_KEYS = ['_url', '_name', '_search'];
    const keys: string[] = Object.keys(data);
    return keys.filter((k) => !CONFIG_KEYS.includes(k));
  }

  private countInsideSteps(data: object): number {
    return this.getInsideSteps(data).length;
  }

  private hasInsideSteps(data: object): boolean {
    return this.countInsideSteps(data) > 0;
  }
}
