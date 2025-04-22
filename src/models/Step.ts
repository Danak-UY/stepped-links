import type { StepTypes } from '../types/Step';
import type { Route, RouteStep } from '../types/Route';
import { URL, NAME, SEARCH } from '../types/Keys';

import { Icon } from '@raycast/api';

import { objectHasKey } from '../helpers/validator';

export default class Step implements StepTypes {
  title: string;
  subtitle: string;
  url: string;
  combo: string[];
  hasSearch: boolean;
  icon: string;
  step: string;
  insideSteps: number;

  constructor(step: string | null, data: RouteStep) {
    this.title = this.buildTitle(step, data) ?? 'Class empty';
    this.subtitle = this.buildSubtitle(step, data);
    this.url = this.buildUrl(data);
    this.combo = [];
    this.hasSearch = this.hasSearchLink(data as Record<string, any>);
    this.icon = this.buildIcon(data);
    this.step = step ?? '';
    this.insideSteps = this.countInsideSteps(data as Record<string, any>);
  }

  private buildTitle(step: string | null, data: RouteStep): string {
    if (typeof data === 'string') {
      return step ?? data;
    }

    if (Array.isArray(data)) {
      return `[ ${data.length} ]`;
    }

    return step!;
  }

  private buildSubtitle(step: string | null, data: RouteStep): string {
    if (typeof data === 'string') {
      return step ? data : '';
    }

    if (Array.isArray(data)) {
      const joined = data.map((v) => `'${v}'`).join(',');
      return `[ ${joined} ]`;
    }

    const insideSteps: string[] = this.getInsideSteps(data);
    if (insideSteps.length === 0) {
      return data[NAME] ?? data[URL];
    }

    return `{ ${insideSteps.length} } - ${data[NAME]}`;
  }

  private buildUrl(data: Route): string {
    if (typeof data === 'string') {
      return data;
    }

    if (Array.isArray(data)) {
      this.combo = data;
      return '';
    }

    return objectHasKey(data!, URL) ? data![URL] : '';
  }

  private buildIcon(data: Route): string {
    if (typeof data === 'string') {
      return Icon.Link;
    }

    if (Array.isArray(data)) {
      return Icon.Layers;
    }

    if (this.hasInsideSteps(data!)) {
      return Icon.Folder;
    }

    if (this.hasSearchLink(data!)) {
      return Icon.MagnifyingGlass;
    }

    if (this.hasUrlLink(data!)) {
      return Icon.Link;
    }

    return Icon.Hashtag;
  }

  private hasUrlLink(data: Record<string, any>): boolean {
    return objectHasKey(data, URL) && Boolean(data[URL]);
  }

  private hasSearchLink(data: Record<string, any>): boolean {
    return objectHasKey(data, SEARCH) && Boolean(data[SEARCH]);
  }

  private getInsideSteps(data: object): string[] {
    const CONFIG_KEYS = [URL, NAME, SEARCH];
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
