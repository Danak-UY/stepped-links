import { ActionPanel, Action, Icon, open, openExtensionPreferences } from '@raycast/api';
import { Action$ } from 'raycast-toolkit';

interface StepActionsTypes {
  url: string;
  name: string;
}

export default function StepActions(props: StepActionsTypes) {
  const { url, name } = props;
  return (
    <ActionPanel>
      <ActionPanel.Section title="Default actions">
        <Action.OpenInBrowser url={url} />
        <Action
          title="Open in Firefox"
          onAction={() => console.log(url, 'org.mozilla.firefox')}
          shortcut={{ modifiers: ['cmd'], key: 't' }}
        />
        <Action.CopyToClipboard content={name} />
        <Action$.SelectFile
          title="Select a csv"
          prompt="Select a .json file"
          onSelect={(path) => console.log('Selected file at path:', path)}
        />
      </ActionPanel.Section>
      <ActionPanel.Submenu
        title="Other borwsers"
        icon={Icon.Alarm}
        shortcut={{ modifiers: ['cmd'], key: 'arrowRight' }}
      >
        <Action
          title="Open in Firefox"
          onAction={() => open(url, 'org.mozilla.firefox')}
          shortcut={{ modifiers: ['cmd'], key: 'f' }}
        />
        <Action
          title="Open in Edge"
          onAction={() => open(url, 'com.microsoft.edgemac')}
          shortcut={{ modifiers: ['cmd'], key: 'e' }}
        />
        <Action
          title="Open in Safari"
          onAction={() => open(url, 'com.apple.Safari')}
          shortcut={{ modifiers: ['cmd'], key: 's' }}
        />
        <Action
          title="Open in Brave"
          onAction={() => open(url, 'com.brave.Browser')}
          shortcut={{ modifiers: ['cmd'], key: 'b' }}
        />
      </ActionPanel.Submenu>
      <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
    </ActionPanel>
  );
}
