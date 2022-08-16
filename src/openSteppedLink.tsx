import { useEffect, useState, useMemo } from 'react';
import {
  ActionPanel,
  Action,
  Icon,
  List,
  open,
  Color,
  openExtensionPreferences,
  getApplications,
  environment,
  Detail,
  showHUD,
  showToast,
  Toast,
} from '@raycast/api';
import { getFavicon } from '@raycast/utils';

import { runAppleScript } from 'run-applescript';

import { Action$ } from 'raycast-toolkit';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

import { getFinalStep } from './helpers/steps';
import mockedRoutes from './steps.mocked.json';

import Finder from './services/finder';
import Storage from './services/storage';

import getPreferences from './helpers/preferences';

import StepTypes from '../types/Step';
import { parseSteps } from './helpers/steps';

import StepsList from './components/StepsList';
import EmptyView from './components/EmptyView';

const peformSearch = async ({ steppedRoute, query }: UserSearch, setCurrentSearchSteps) => {
  if (steppedRoute) {
    console.log('user search', steppedRoute, query);
    console.log('routes', mockedRoutes);

    const currentSearchSteps = getFinalStep(mockedRoutes, steppedRoute);
    console.log('step found', currentSearchSteps);

    setCurrentSearchSteps(parseSteps(currentSearchSteps));
  }
};

type UserSearch = {
  steppedRoute?: string[];
  query?: string;
};

export default function OpenSteppedLink() {
  const preferences = useMemo(() => getPreferences(), []);
  const [search, setSearch] = useState<UserSearch>({});
  const [currentSearchSteps, setCurrentSearchSteps] = useState<StepTypes[]>(parseSteps(mockedRoutes));

  useEffect(() => {
    peformSearch(search, setCurrentSearchSteps);
  }, [search]);

  const searchForSteps = (ev: string) => {
    const [route, query] = ev.split(preferences.querySeparators);
    const steppedRoute: string[] = route.split(' ').filter(Boolean);
    setSearch({ steppedRoute, query });
  };

  return (
    <List onSearchTextChange={searchForSteps} searchBarPlaceholder="Steps for oppening the url..." throttle>
      {currentSearchSteps.length > 0 ? <StepsList steps={currentSearchSteps} /> : <EmptyView />}
    </List>
  );
}

/**
 * Load routes list
 * Render first level links
 * Search on user input
 * If no results show empty
 * Else render results
 *  Links
 *    Icon
 *    Step
 *    Name
 *    More steps
 */
