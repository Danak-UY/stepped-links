import { ActionPanel, Action, Icon, List, openExtensionPreferences } from '@raycast/api';
import { Action$ } from 'raycast-toolkit';

export default function EmptyView() {
  return (
    <List.EmptyView
      icon={Icon.Airplane}
      title="Type something to get started"
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
