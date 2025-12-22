import { ActionPanel, Action, Icon, List, openExtensionPreferences } from '@raycast/api';
import { Action$ } from 'raycast-toolkit';

interface EmptyViewTypes {
  stepsTraveled?: string[];
}

/**
 * Render an empty-state view indicating that a step for the constructed route was not found.
 *
 * @param stepsTraveled - Sequence of step labels that will be joined with " › " to form the route shown in the title; defaults to an empty array.
 * @returns A JSX element that displays an airplane icon and a title stating the missing step for the joined route.
 */
export default function EmptyView({ stepsTraveled = [] }: EmptyViewTypes) {
  const route = stepsTraveled.join(' › ');
  return <List.EmptyView icon={Icon.Airplane} title={`Step for route '${route}' not found`} />;
}