import { Application, getPreferenceValues } from '@raycast/api';

interface PreferencesTypes {
  querySeparators: string;
  queryWildcard: string;
  defaultBrowser: Application;
  defaultConfigApp: Application;
}

export default class Preferences {
  static getUserPreferences(): PreferencesTypes {
    return getPreferenceValues<PreferencesTypes>();
  }
}
