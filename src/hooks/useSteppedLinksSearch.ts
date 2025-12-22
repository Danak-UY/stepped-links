import type { UserSearch, SearchSteps } from '../types/Search';

import { useState, useMemo, useEffect } from 'react';

import { getFinalStep, parseSteps } from '../helpers/steps';
import Storage from '../services/storage';

/**
 * Loads stored stepped routes from persistent storage and passes them to the provided callback.
 *
 * @param callback - Function invoked with the retrieved steps object (defaults to an empty object when no data is stored)
 */
async function loadSteps(callback: (steps: any) => void) {
  const stepsInfo = await Storage.getItem('steppedRoutes', {});
  callback(stepsInfo);
}

/**
 * Manages stepped-route search state and provides a search handler for link navigation.
 *
 * @returns An object with the current parsed search state, the latest query string, and a search function.
 * - `currentSearchSteps` - The current search result state containing parsed `searchSteps` and, when applicable, `namesFound` and `stepsTraveled`.
 * - `currentQuery` - The most recent trimmed query string used for the last search (empty string when none).
 * - `peformSearch` - Function that accepts a `UserSearch` ({ steppedRoute?: string[]; query?: string }) and updates `currentSearchSteps`:
 *   - when `steppedRoute` is provided and non-empty, updates state to the parsed final step and includes `namesFound` and `stepsTraveled`;
 *   - when `steppedRoute` is absent or empty, resets `currentSearchSteps` to the initial parsed routes;
 *   - updates `currentQuery` to the trimmed `query` when it differs from the current value.
 */
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