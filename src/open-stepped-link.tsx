import { useEffect, useState, useMemo } from "react";
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
} from "@raycast/api";
import { getFavicon } from "@raycast/utils";

import { runAppleScript } from "run-applescript";

import { Action$ } from "raycast-toolkit";

import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const writeToFile = async (rootPath) => {
  const file = join(rootPath, "stepped.confgi.json");
  await writeFile(file, JSON.stringify({ test: "http://google.com" }, null, 2));
  // open(file);
};

const readToFile = async (pathFile) => {
  const file = await readFile(pathFile, { encoding: "utf8" });
  const parsed = JSON.parse(file);
  console.log("readed", parsed.$configs);
};

import getPreferences from "./helpers/preferences";

const ITEMS = [
  {
    id: "1",
    title: "Test link",
    subtitle: "http://google.com",
    accessory: "Accessory",
  },
  {
    id: "2",
    title: "Test step",
    subtitle: "{ 5 }",
    accessory: "Accessory",
  },
  {
    id: "3",
    title: "Test combo",
    subtitle: "[ 3 ]",
    accessory: "Accessory",
  },
];

const peformSearch = async ({ steps, query }: { steps: string; query: string }) => {
  console.log(steps, query);

  // const installedApplications = await getApplications();
  // console.log("The following applications are installed on your Mac:");
  // console.log(installedApplications.map((a) => a.path).join("\n"));
};

const chooseFolder = async () => {
  // const path = await runAppleScript(`
  //       set chosenFile to choose folder with prompt "Elije una carpeta"
  //       set raycastPath to POSIX path of (path to application "Raycast")
  //       do shell script "open " & raycastPath
  //       return POSIX path of chosenFile
  //     `);
  const path = await runAppleScript(`
            set chosenFile to choose folder with prompt "Elije una carpeta"
            return POSIX path of chosenFile
          `);

  console.log("the folder choosen", path);
  // writeToFile(path);
};

const chooseFile = async () => {
  const path = await runAppleScript(`
        set chosenFile to choose file with prompt "Elije una carpeta" of type "public.json"
        return POSIX path of chosenFile
      `);

  console.log("the file choosen", path);
  readToFile(path);
};

export default function OpenSteppedLink() {
  const preferences = useMemo(() => getPreferences(), []);
  const [search, setSearch] = useState<{ steps: string; query: string }>({});

  useEffect(() => {
    peformSearch(search);
  }, [search]);

  useEffect(() => {
    console.log(`Raycast version: ${environment.raycastVersion}`);
    console.log(`Extension name: ${environment.extensionName}`);
    console.log(`Command name: ${environment.commandName}`);
    console.log(`Assets path: ${environment.assetsPath}`);
    console.log(`Support path: ${environment.supportPath}`);
    console.log(`Is development mode: ${environment.isDevelopment}`);
    console.log(`Theme: ${environment.theme}`);
    console.log(`LaunchType: ${environment.launchType}`);

    // readFile(environment.supportPath);
    // chooseFolder();
    chooseFile();
  }, []);

  const searchLink = (ev: string) => {
    const [steps, query] = ev.split(preferences.querySeparators);
    setSearch({ steps, query });
  };

  return (
    <List
      onSearchTextChange={searchLink}
      searchBarPlaceholder="Steps for oppening the url..."
      throttle
      navigationTitle="Open Pull Requests"
    >
      {ITEMS.map((item) => (
        <List.Item
          key={item.id}
          // icon={getFavicon("https://dev.mercadopago.com.ar")}
          icon={{ tooltip: "test", source: Icon.Airplane, tintColor: Color.Blue }}
          title={item.title}
          subtitle={{ tooltip: "test", value: item.subtitle }}
          accessories={[{ icon: Icon.Airplane, text: item.accessory, date: new Date(), tooltip: "Just Do It!" }]}
          actions={
            <ActionPanel>
              <ActionPanel.Section title="Default actions">
                <Action.OpenInBrowser url={`https://www.pokemon.com/`} />
                <Action.CopyToClipboard content={item.title} />
                <Action$.SelectFile
                  title="Select a csv"
                  prompt="Select a .json file"
                  onSelect={(path) => console.log("Selected file at path:", path)}
                />
              </ActionPanel.Section>
              <ActionPanel.Submenu
                title="Other borwsers"
                icon={Icon.Alarm}
                shortcut={{ modifiers: ["cmd"], key: "arrowRight" }}
              >
                <Action
                  title="Open in Firefox"
                  onAction={() => open(`https://www.pokemon.com/`, "org.mozilla.firefox")}
                  shortcut={{ modifiers: ["cmd"], key: "f" }}
                />
                <Action
                  title="Open in Edge"
                  onAction={() => open(`https://www.pokemon.com/`, "com.microsoft.edgemac")}
                  shortcut={{ modifiers: ["cmd"], key: "e" }}
                />
                <Action
                  title="Open in Safari"
                  onAction={() => open(`https://www.pokemon.com/`, "com.apple.Safari")}
                  shortcut={{ modifiers: ["cmd"], key: "s" }}
                />
                <Action
                  title="Open in Brave"
                  onAction={() => open(`https://www.pokemon.com/`, "com.brave.Browser")}
                  shortcut={{ modifiers: ["cmd"], key: "b" }}
                />
              </ActionPanel.Submenu>
              <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
