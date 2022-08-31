import { Application, getPreferenceValues } from "@raycast/api";

interface Preferences {
  querySeparators: string;
  queryWildcard: string;
  defaultBrowser: Application;
}

export default () => {
  return getPreferenceValues<Preferences>();
};
