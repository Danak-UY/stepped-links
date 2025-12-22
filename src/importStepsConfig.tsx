import { showToast, Toast, showHUD, LocalStorage } from '@raycast/api';
import { chooseFile, readFile } from './controller/finder';
import { FILE_TYPES } from './helpers/constants';

import Storage from './services/storage';

/**
 * Import step configuration from a user-selected JSON file into local storage.
 *
 * Prompts the user to choose a JSON file, reads its contents, and if a value is present stores it under the `steppedRoutes` key. Displays an animated toast while importing and shows HUD messages for these outcomes:
 * - "✅ Links imported successfully" when the file contained a value and was saved
 * - "❌ NO links to import" when the file was read but contained no value
 * - "❌ No folder selected" when the user cancels the file selection
 */
export default async function ImportStepsConfig() {
  showToast({
    style: Toast.Style.Animated,
    title: 'Importing file',
  });

  const filePath = await chooseFile(FILE_TYPES.JSON);

  if (filePath) {
    const fileInfo = (await readFile(filePath)) as unknown as LocalStorage.Value;

    if (fileInfo) {
      await Storage.setItem('steppedRoutes', fileInfo);
      showHUD('✅ Links imported successfully');
    } else {
      showHUD('❌ NO links to import');
    }
  } else {
    showHUD('❌ No folder selected');
  }
}