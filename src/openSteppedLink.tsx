import { useEffect, useState, useMemo } from 'react';
import {
  ActionPanel,
  Action,
  Icon,
  List,
  open,
  Color,
  openExtensionPreferences,
  getApplications,
  environment,
  Detail,
  showHUD,
  showToast,
  Toast,
} from '@raycast/api';
import { getFavicon } from '@raycast/utils';

import { runAppleScript } from 'run-applescript';

import { Action$ } from 'raycast-toolkit';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

import { getFinalStep } from './helpers/steps';
import routes from './steps.mocked.json';

import Finder from './services/finder';
import Storage from './services/storage';

import getPreferences from './helpers/preferences';

/**
 * Icons
 * - Direct link (no extra steps [name, url, search]) [Link, Anchor]
 * - Search [Hashtag, MagnifyingGlass]
 * - Combo [Tray, Layers]
 * - Step with more links [Center, Folder]
 */

const ITEMS = [
  {
    id: '1',
    step: 'ti',
    title: 'Test link',
    accessory: 'http://google.com',
    icon: 'Anchor',
  },
  {
    id: '2',
    step: 'sm',
    title: 'Test step',
    subtitle: '{ 5 }',
    accessory: 'http://google.com',
    icon: 'Folder',
  },
  {
    id: '3',
    step: 'new',
    subtitle: '[ 3 ]',
    accessory: 'http://google.com',
    icon: 'Tray',
  },
  {
    id: '4',
    step: 'ot',
    accessory: 'http://google.com',
    icon: 'MagnifyingGlass',
  },
];

const peformSearch = async ({ steps, query }, setLinks) => {
  console.log('user search', steps, query);
  console.log('routes', routes);

  const links = getFinalStep(routes, steps);
  console.log('step found', getFinalStep(routes, steps));

  setLinks(links);
};

export default function OpenSteppedLink() {
  const preferences = useMemo(() => getPreferences(), []);
  const [search, setSearch] = useState<{ steps: string[]; query: string }>({});
  const [links, setLinks] = useState(routes);

  useEffect(() => {
    peformSearch(search, setLinks);
  }, [search]);

  // useEffect(() => {
  //   console.log(`Raycast version: ${environment.raycastVersion}`);
  //   console.log(`Extension name: ${environment.extensionName}`);
  //   console.log(`Command name: ${environment.commandName}`);
  //   console.log(`Assets path: ${environment.assetsPath}`);
  //   console.log(`Support path: ${environment.supportPath}`);
  //   console.log(`Is development mode: ${environment.isDevelopment}`);
  //   console.log(`Theme: ${environment.theme}`);
  //   console.log(`LaunchType: ${environment.launchType}`);
  // }, []);

  const searchLink = (ev: string) => {
    const [stepsStr, query] = ev.split(preferences.querySeparators);
    const steps = stepsStr.split(' ').filter(Boolean);
    setSearch({ steps, query });
  };

  return (
    <>
      {false && <Detail markdown="# Hello  _World_!" />}
      {true && (
        <List
          onSearchTextChange={searchLink}
          searchBarPlaceholder="Steps for oppening the url..."
          throttle
          navigationTitle="Open Pull Requests"
        >
          {false && (
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
          )}
          <List.Section title="Lager › Github">
            {true &&
              ITEMS.map((item) => (
                <List.Item
                  key={item.id}
                  // icon={getFavicon("https://dev.mercadopago.com.ar")}
                  // icon={{ tooltip: 'test', source: Icon[item.icon], tintColor: Color.Blue }}
                  icon={{ tooltip: 'test', source: Icon[item.icon] }}
                  title={item.step}
                  subtitle={item.title || item.accessory}
                  accessories={[{ text: item.subtitle, date: new Date(), tooltip: 'Just Do It!' }]}
                  actions={
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
                  }
                />
              ))}
          </List.Section>
        </List>
      )}
    </>
  );
}

/**
 * Load routes list
 * Render first level links
 * Search on user input
 * If no results show empty
 * Else render results
 *  Links
 *    Icon
 *    Step
 *    Name
 *    More steps
 */
