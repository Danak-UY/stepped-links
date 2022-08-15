import { ActionPanel, Action, Icon, open, openExtensionPreferences } from '@raycast/api';
import { Action$ } from 'raycast-toolkit';

export default function StepActions() {
  return (
    <ActionPanel>
      <ActionPanel.Section title="Default actions">
        <Action.OpenInBrowser url={`https://www.pokemon.com/`} />
        <Action
          title="Open in Firefox"
          onAction={() => console.log(`https://www.pokemon.com/`, 'org.mozilla.firefox')}
          shortcut={{ modifiers: ['cmd'], key: 't' }}
        />
        <Action.CopyToClipboard content={item.title} />
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
          onAction={() => open(`https://www.pokemon.com/`, 'org.mozilla.firefox')}
          shortcut={{ modifiers: ['cmd'], key: 'f' }}
        />
        <Action
          title="Open in Edge"
          onAction={() => open(`https://www.pokemon.com/`, 'com.microsoft.edgemac')}
          shortcut={{ modifiers: ['cmd'], key: 'e' }}
        />
        <Action
          title="Open in Safari"
          onAction={() => open(`https://www.pokemon.com/`, 'com.apple.Safari')}
          shortcut={{ modifiers: ['cmd'], key: 's' }}
        />
        <Action
          title="Open in Brave"
          onAction={() => open(`https://www.pokemon.com/`, 'com.brave.Browser')}
          shortcut={{ modifiers: ['cmd'], key: 'b' }}
        />
      </ActionPanel.Submenu>
      <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
    </ActionPanel>
  );
}
