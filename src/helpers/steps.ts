import Step from '../models/Step';
import StepTypes from '../types/Step';

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

  return Object.entries(steps).map(([step, data]) => new Step(step, data));
}
