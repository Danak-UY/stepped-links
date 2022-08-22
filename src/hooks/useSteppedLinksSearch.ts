import { useState, useMemo, useEffect } from 'react';

import { getFinalStep } from '../helpers/steps';

import StepTypes from '../types/Step';
import { parseSteps } from '../helpers/steps';

import Storage from '../services/storage';

async function loadSteps(callback) {
  const stepsInfo = await Storage.getItem('steppedRoutes', {});
  console.log('loadSteps -->', Object.keys(stepsInfo).length);
  callback(stepsInfo);
}

type UserSearch = {
  steppedRoute?: string[];
  query?: string;
};

export default function useSteppedLinksSearch() {
  const [stepsInfo, setStepsInfo] = useState({});

  useEffect(() => {
    loadSteps((steps) => {
      setCurrentSearchSteps({ searchSteps: parseSteps(steps) });
      setStepsInfo(steps);
    });
  }, []);

  const initialRotues = useMemo(() => {
    console.log('parse routes calculated -->', Object.keys(stepsInfo).length);
    return { searchSteps: parseSteps(stepsInfo) };
  }, [stepsInfo]);

  const [currentSearchSteps, setCurrentSearchSteps] = useState<StepTypes[]>();

  // useEffect(() => {
  //   // setCurrentSearchSteps(initialRotues);
  //   console.log('update current routes calculated -->', Object.keys(stepsInfo).length);
  //   setCurrentSearchSteps({ searchSteps: parseSteps(stepsInfo) });
  // }, [stepsInfo]);

  const peformSearch = ({ steppedRoute, query }: UserSearch) => {
    if (steppedRoute?.length > 0) {
      console.log('user search', steppedRoute, query);

      const { lastRoute, namesFound, stepsTraveled } = getFinalStep(stepsInfo, steppedRoute);
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
