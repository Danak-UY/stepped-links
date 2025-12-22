import { useMemo } from 'react';
import { ActionPanel, Action, Icon, open, openCommandPreferences } from '@raycast/api';

import getPreferences from '../helpers/preferences';
import { mergeUrl } from '../helpers/url';
import CreateStepForm from '../createStepForm';

interface StepActionsTypes {
  url: string;
  search: string;
  name: string;
  query: string;
  path: string;
}

/**
 * Render an action panel offering browser, clipboard, edit, and preferences actions for a step.
 *
 * @param props - Component props.
 * @param props.url - Fallback base URL used when `query` and `search` are not combined.
 * @param props.search - Search string used as the base when `query` is present.
 * @param props.query - Query string merged into the base URL; may replace a wildcard from preferences.
 * @returns The ActionPanel JSX element containing the step's actions.
 */
export default function StepActions(props: StepActionsTypes) {
  const { url, search, query } = props;
  const preferences = useMemo(() => getPreferences(), []);
  const finalUrl = mergeUrl((query && search) ?? url, query, preferences.queryWildcard);

  return (
    <ActionPanel>
      <ActionPanel.Section>
        <Action.OpenInBrowser url={finalUrl} />
        <Action.CopyToClipboard content={finalUrl} shortcut={{ modifiers: ['cmd'], key: 'c' }} />
        <Action.Push
          title="Edit step"
          target={<CreateStepForm {...props} />}
          icon={Icon.Pencil}
          shortcut={{ modifiers: ['cmd'], key: 'e' }}
        />
        <Action
          title="Open Command Preferences"
          onAction={openCommandPreferences}
          icon={Icon.Cog}
          shortcut={{ modifiers: ['opt'], key: 'p' }}
        />
      </ActionPanel.Section>
      <ActionPanel.Submenu
        title="Other borwsers"
        icon={Icon.AppWindow}
        shortcut={{ modifiers: ['cmd'], key: 'arrowRight' }}
      >
        <Action
          title="Open in Chrome"
          onAction={() => open(finalUrl, 'org.google.chrome')}
          shortcut={{ modifiers: ['cmd'], key: 'g' }}
        />
        <Action
          title="Open in Firefox"
          onAction={() => open(finalUrl, 'org.mozilla.firefox')}
          shortcut={{ modifiers: ['cmd'], key: 'f' }}
        />
        <Action
          title="Open in Edge"
          onAction={() => open(finalUrl, 'com.microsoft.edgemac')}
          shortcut={{ modifiers: ['cmd'], key: 'e' }}
        />
        <Action
          title="Open in Safari"
          onAction={() => open(finalUrl, 'com.apple.Safari')}
          shortcut={{ modifiers: ['cmd'], key: 's' }}
        />
        <Action
          title="Open in Brave"
          onAction={() => open(finalUrl, 'com.brave.Browser')}
          shortcut={{ modifiers: ['cmd'], key: 'b' }}
        />
      </ActionPanel.Submenu>
    </ActionPanel>
  );
}