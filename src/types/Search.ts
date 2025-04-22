import type { StepTypes } from './Step';
import type { Route } from './Route';

export type UserSearch = {
  steppedRoute: string[];
  query: string;
};

export type SearchSteps = {
  searchSteps?: StepTypes[];
  namesFound?: string[];
  stepsTraveled?: string[];
  lastRoute?: Route;
  lastStep?: string;
};
