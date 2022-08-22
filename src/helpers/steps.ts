import Step from '../models/Step';
import StepTypes from '../types/Step';

import { Icon } from '@raycast/api';

export function getFinalStep(routes: object, steps: string[] = []) {
  if (steps.length === 0) {
    return routes;
  }

  let lastRoute: object | string | string[] | undefined = routes;
  let lastStep = '';
  const stepsTraveled = [];
  const namesFound: string[] = [];

  for (const step of steps) {
    if (!lastRoute) {
      break;
    }

    const stepRoute: object | string | string[] | undefined = lastRoute[step];

    if (stepRoute?._name) {
      namesFound.push(stepRoute._name);
    }

    stepsTraveled.push(step);
    lastRoute = stepRoute;
    lastStep = step;
  }

  return { lastRoute, namesFound, lastStep, stepsTraveled };
}

export function parseSteps(steps: object | string | string[] | undefined = {}): StepTypes[] {
  if (!steps) {
    return [];
  }

  if (typeof steps === 'string' || Array.isArray(steps)) {
    return [new Step(null, steps)];
  }

  const { _url, _search, _name, ...restSteps } = steps;

  // console.log('steps', steps, restSteps);

  const rootStep = buildRootStep(_url, _search, _name, restSteps);
  const parsedSteps = Object.entries(restSteps)
    .sort()
    .map(([step, data]) => new Step(step, data));

  return rootStep ? [rootStep, ...parsedSteps] : parsedSteps;
}

function buildRootStep(url, search, name, restSteps) {
  if (!url && !search && !name) {
    return;
  }

  const getInsideSteps = (data: object): string[] => {
    const CONFIG_KEYS = ['_url', '_name', '_search'];
    const keys: string[] = Object.keys(data);
    return keys.filter((k) => !CONFIG_KEYS.includes(k));
  };

  return {
    title: name ?? url,
    subtitle: name ? url : '',
    url: url,
    hasSearch: Boolean(search),
    icon: Icon.BullsEye,
  };
}
