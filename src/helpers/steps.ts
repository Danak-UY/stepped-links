import type { StepTypes } from '../types/Step';
import type { Route } from '../types/Route';
import type { StepInterface } from '../types/StepJson';
import type { SearchSteps } from '../types/Search';
import { NAME } from '../types/Keys';

import { merge } from 'lodash';
import { Icon, Toast, LocalStorage } from '@raycast/api';

import Step from '../models/Step';
import Storage from '../services/storage';
import Feedback from '../services/feedback';

export const getFinalStep = (routes: object, steps: string[] = []): SearchSteps => {
  if (steps.length === 0) {
    return routes;
  }

  let lastRoute: Route = routes;
  let lastStep = '';
  const stepsTraveled = [];
  const namesFound: string[] = [];

  for (const step of steps) {
    if (!lastRoute) {
      break;
    }

    const stepRoute = (lastRoute as Record<string, Route>)[step] as Route;

    if (stepRoute && typeof stepRoute === 'object' && stepRoute !== null && NAME in stepRoute) {
      namesFound.push(stepRoute[NAME] as string);
    }

    stepsTraveled.push(step);
    lastRoute = stepRoute;
    lastStep = step;
  }

  return { lastRoute, namesFound, lastStep, stepsTraveled };
};

export const parseSteps = (steps: Route = {}): StepTypes[] => {
  if (!steps) {
    return [];
  }

  if (typeof steps === 'string' || Array.isArray(steps)) {
    return [new Step(null, steps)];
  }

  const { _url, _search, _name, ...restSteps } = steps;

  const rootStep = buildRootStep(_url, _search, _name);
  const parsedSteps = Object.entries(restSteps)
    .sort()
    .map(([step, data]) => new Step(step, data));

  return rootStep ? [rootStep, ...parsedSteps] : parsedSteps;
};

export const buildRootStep = (url: string, search: string, name: string, restSteps?: string[]) => {
  if (!url && !search && !name) {
    return;
  }

  return {
    title: name ?? url ?? '',
    subtitle: name ? url : '',
    url: url,
    hasSearch: Boolean(search),
    search: search,
    icon: Icon.BullsEye,
  };
};

export const buildPath = (path: string, content: any) => {
  return {
    [path]: content,
  };
};

export const buildStepPath = ({ path, url, name, search }: StepInterface) => {
  const pathArr = path.split(' ').filter(Boolean).reverse();
  const step = {
    _url: url,
    _name: name,
    _search: search,
  };

  let obj = {};

  for (const onePath of pathArr) {
    obj = Object.keys(obj).length ? buildPath(onePath, obj) : buildPath(onePath, step);
  }

  return obj;
};

export const addStepToStorage = async (step: StepInterface) => {
  try {
    Feedback.toast('Saving new step', Toast.Style.Animated);
    const stepPath = buildStepPath(step);

    const stepsInfo = await Storage.getItem('steppedRoutes', {});

    merge(stepsInfo, stepPath);
    await Storage.setItem('steppedRoutes', stepsInfo as LocalStorage.Value);

    Feedback.toast('Step created', Toast.Style.Success);
  } catch (e) {
    console.error(e);
    Feedback.toast('There was a problem saving step', Toast.Style.Failure);
  }
};
