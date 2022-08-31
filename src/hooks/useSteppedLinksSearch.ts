import { useState, useMemo } from 'react';

import { getFinalStep } from '../helpers/steps';

import StepTypes from '../types/Step';
import { parseSteps } from '../helpers/steps';

type UserSearch = {
  steppedRoute?: string[];
  query?: string;
};

export default function useSteppedLinksSearch(routes) {
  const initialRotues = useMemo(() => ({ searchSteps: parseSteps(routes) }), [routes]);
  const [currentSearchSteps, setCurrentSearchSteps] = useState<StepTypes[]>(initialRotues);

  const peformSearch = ({ steppedRoute, query }: UserSearch) => {
    if (steppedRoute?.length > 0) {
      console.log('user search', steppedRoute, query);

      const { lastRoute, namesFound, stepsTraveled } = getFinalStep(routes, steppedRoute);
      console.log('step found', currentSearchSteps.lastRoute);

      const newState = {
        searchSteps: parseSteps(lastRoute),
        namesFound,
        stepsTraveled,
      };

      setCurrentSearchSteps(newState);
    } else {
      setCurrentSearchSteps(initialRotues);
    }
  };

  return { currentSearchSteps, peformSearch };
}
