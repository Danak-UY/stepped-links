import type { UserSearch, SearchSteps } from '../types/Search';

import { useState, useMemo, useEffect } from 'react';

import { getFinalStep, parseSteps } from '../helpers/steps';
import Storage from '../services/storage';

async function loadSteps(callback: (steps: any) => void) {
  const stepsInfo = await Storage.getItem('steppedRoutes', {});
  callback(stepsInfo);
}

export default function useSteppedLinksSearch() {
  const [stepsInfo, setStepsInfo] = useState({});
  const [currentSearchSteps, setCurrentSearchSteps] = useState<SearchSteps>({});
  const [currentQuery, setCurrentQuery] = useState<string>('');

  const initialRotues = useMemo(() => {
    return { searchSteps: parseSteps(stepsInfo) };
  }, [stepsInfo]);

  useEffect(() => {
    loadSteps((steps) => {
      setCurrentSearchSteps({ searchSteps: parseSteps(steps) });
      setStepsInfo(steps);
    });
  }, []);

  const peformSearch = ({ steppedRoute, query }: UserSearch) => {
    if (steppedRoute?.length > 0) {
      const { lastRoute, namesFound, stepsTraveled } = getFinalStep(stepsInfo, steppedRoute);

      const newState = {
        searchSteps: parseSteps(lastRoute),
        namesFound,
        stepsTraveled,
      };

      setCurrentSearchSteps(newState);
    } else {
      setCurrentSearchSteps(initialRotues);
    }

    if (query !== currentQuery) {
      setCurrentQuery(query?.trim() ?? '');
    }
  };

  return { currentSearchSteps, currentQuery, peformSearch };
}
