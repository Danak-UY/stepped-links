import { ActionPanel, Action, Icon, List, openExtensionPreferences } from '@raycast/api';
import { Action$ } from 'raycast-toolkit';

interface EmptyViewTypes {
  stepsTraveled?: string[];
}

export default function EmptyView({ stepsTraveled = [] }: EmptyViewTypes) {
  const route = stepsTraveled.join(' › ');
  return <List.EmptyView icon={Icon.Airplane} title={`Step for route '${route}' not found`} />;
}
