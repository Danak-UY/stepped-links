import Step from '../models/Step';
import StepTypes from '../types/Step';

export function getFinalStep(routes: object, steps: string[] = []) {
  if (steps.length === 0) {
    return routes;
  }

  let lastRoute: object | string | string[] | undefined = routes;
  const currentSteps = [];

  steps.forEach((step: string) => {
    if (!lastRoute) {
      return console.log('No route');
    }

    const stepRoute: object | string | string[] | undefined = lastRoute[step];

    currentSteps.push(step);
    lastRoute = stepRoute;
  });

  return lastRoute;
}

export function parseSteps(steps: object): StepTypes[] {
  return Object.entries(steps).map(([step, data]) => new Step(step, data));
}
