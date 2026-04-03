import type { StepTypes } from '../types/Step';
import type { Route, RouteStep } from '../types/Route';
import { URL, NAME, SEARCH, CONFIG_KEYS } from '../types/Keys';

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
    this.hasSearch = this.hasSearchLink(data);
    this.icon = this.buildIcon(data);
    this.step = step ?? '';
    this.insideSteps = this.countInsideSteps(data);
  }

  private asRecord(data: RouteStep | Route): Record<string, unknown> | undefined {
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      return data as Record<string, unknown>;
    }
    return undefined;
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

    const record = this.asRecord(data);
    if (!record) return '';

    const insideSteps: string[] = this.getInsideSteps(record);
    if (insideSteps.length === 0) {
      return (record[NAME] as string) ?? (record[URL] as string) ?? '';
    }

    return `{ ${insideSteps.length} } - ${record[NAME]}`;
  }

  private buildUrl(data: Route): string {
    if (typeof data === 'string') {
      return data;
    }

    if (Array.isArray(data)) {
      this.combo = data;
      return '';
    }

    const record = this.asRecord(data);
    if (!record) return '';

    return objectHasKey(record, URL) ? (record[URL] as string) : '';
  }

  private buildIcon(data: Route): string {
    if (typeof data === 'string') {
      return Icon.Link;
    }

    if (Array.isArray(data)) {
      return Icon.Layers;
    }

    const record = this.asRecord(data);
    if (!record) return Icon.Hashtag;

    if (this.hasInsideSteps(record)) {
      return Icon.Folder;
    }

    if (this.hasSearchLinkInRecord(record)) {
      return Icon.MagnifyingGlass;
    }

    if (this.hasUrlLinkInRecord(record)) {
      return Icon.Link;
    }

    return Icon.Hashtag;
  }

  private hasUrlLink(data: RouteStep): boolean {
    const record = this.asRecord(data);
    if (!record) return false;
    return objectHasKey(record, URL) && Boolean(record[URL]);
  }

  private hasSearchLink(data: RouteStep): boolean {
    const record = this.asRecord(data);
    if (!record) return false;
    return objectHasKey(record, SEARCH) && Boolean(record[SEARCH]);
  }

  private hasUrlLinkInRecord(record: Record<string, unknown>): boolean {
    return objectHasKey(record, URL) && Boolean(record[URL]);
  }

  private hasSearchLinkInRecord(record: Record<string, unknown>): boolean {
    return objectHasKey(record, SEARCH) && Boolean(record[SEARCH]);
  }

  private getInsideSteps(data: object): string[] {
    const keys: string[] = Object.keys(data);
    return keys.filter((k) => !CONFIG_KEYS.includes(k));
  }

  private countInsideSteps(data: RouteStep): number {
    const record = this.asRecord(data);
    if (!record) return 0;
    return this.getInsideSteps(record).length;
  }

  private hasInsideSteps(data: object): boolean {
    return this.countInsideSteps(data as RouteStep) > 0;
  }
}
