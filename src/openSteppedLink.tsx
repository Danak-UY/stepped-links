import { useEffect, useState, useMemo } from 'react';
import { List } from '@raycast/api';

import getPreferences from './helpers/preferences';

import StepsList from './components/StepsList';
import EmptyView from './components/EmptyView';

import useSteppedLinksSearch from './hooks/useSteppedLinksSearch';

/**
 * Renders a searchable list UI for finding and displaying step-by-step links.
 *
 * The component displays either a populated steps list or an empty view depending on search results.
 * User input in the search bar is parsed by the application's `querySeparators` preference into a route and an optional query, then dispatched to the stepped-link search handler.
 *
 * @returns A JSX element containing the search list and the corresponding results view
 */
export default function OpenSteppedLink() {
  const preferences = useMemo(() => getPreferences(), []);
  const [isLoading, setIsLoading] = useState(true);

  const { currentSearchSteps, currentQuery, peformSearch } = useSteppedLinksSearch();
  const { searchSteps, namesFound, stepsTraveled } = currentSearchSteps;

  useEffect(() => {
    setIsLoading(false);
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
          <StepsList steps={searchSteps} traveled={namesFound} currentQuery={currentQuery} />
        ) : (
          <EmptyView stepsTraveled={stepsTraveled} />
        ))}
    </List>
  );
}