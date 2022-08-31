import { ActionPanel, Action, Icon, open, openCommandPreferences } from '@raycast/api';
import CreateStepForm from '../createStepForm';

interface StepActionsTypes {
  url: string;
  name: string;
}

export default function StepActions(props: StepActionsTypes) {
  const { url, name } = props;
  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.OpenInBrowser url={url} />
        <Action.CopyToClipboard content={url} shortcut={{ modifiers: ['cmd'], key: 'enter' }} />
        <Action.Push
          title="Edit step"
          target={<CreateStepForm {...props} />}
          shortcut={{ modifiers: ['opt'], key: 'enter' }}
        />
        <Action
          title="Open Command Preferences"
          onAction={openCommandPreferences}
          icon={Icon.Cog}
          shortcut={{ modifiers: ['cmd'], key: 'p' }}
        />
      </ActionPanel.Section>
      <ActionPanel.Submenu
        title="Other borwsers"
        icon={Icon.AppWindow}
        shortcut={{ modifiers: ['cmd'], key: 'arrowRight' }}
      >
        <Action
          title="Open in Chrome"
          onAction={() => open(url, 'org.google.chrome')}
          shortcut={{ modifiers: ['cmd'], key: 'g' }}
        />
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
    </ActionPanel>
  );
}
