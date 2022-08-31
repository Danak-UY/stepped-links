import { useEffect, useState, useMemo } from 'react';
import { List } from '@raycast/api';

import mockedRoutes from './steps.mocked.json';
import configRoutes from './step-url.config.json';

import getPreferences from './helpers/preferences';

import StepsList from './components/StepsList';
import EmptyView from './components/EmptyView';

import useSteppedLinksSearch from './hooks/useSteppedLinksSearch';

export default function OpenSteppedLink() {
  const preferences = useMemo(() => getPreferences(), []);
  const [isLoading, setIsLoading] = useState(true);

  const { currentSearchSteps = {}, peformSearch } = useSteppedLinksSearch();
  const { searchSteps, namesFound, stepsTraveled } = currentSearchSteps;

  useEffect(() => {
    setIsLoading(false);
    console.log('search steps', Object.keys(currentSearchSteps).length);
  }, [currentSearchSteps]);

  const searchForSteps = (ev: string) => {
    setIsLoading(true);
    const [route, query] = ev.split(preferences.querySeparators);
    const steppedRoute: string[] = route.split(' ').filter(Boolean);
    peformSearch({ steppedRoute, query });
  };

  return (
    <List
      onSearchTextChange={searchForSteps}
      searchBarPlaceholder="Steps for oppening the url..."
      throttle
      isLoading={isLoading}
    >
      {searchSteps &&
        (searchSteps?.length > 0 ? (
          <StepsList steps={searchSteps} traveled={namesFound} />
        ) : (
          <EmptyView stepsTraveled={stepsTraveled} />
        ))}
    </List>
  );
}
