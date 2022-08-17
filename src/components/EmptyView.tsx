import { ActionPanel, Action, Icon, List, openExtensionPreferences } from '@raycast/api';
import { Action$ } from 'raycast-toolkit';

export default function EmptyView({ stepsTraveled = [] }) {
  const route = stepsTraveled.join(' › ');
  return (
    <List.EmptyView
      icon={Icon.Airplane}
      title={`Step for route '${route}' not found`}
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Default actions">
            <Action.OpenInBrowser url={`https://www.pokemon.com/`} />
            <Action$.SelectFile
              title="Select a csv"
              prompt="Select a .json file"
              onSelect={(path) => console.log('Selected file at path:', path)}
            />
          </ActionPanel.Section>
          <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
