import Storage from './services/storage';

import { showToast, Toast, showHUD } from '@raycast/api';
import { chooseFolder, saveFile } from './controller/finder';

import { currentDateISO } from './helpers/date';

/**
 * Export stored stepped routes to a user-selected folder as a dated config file.
 *
 * If the user selects a folder, retrieves `steppedRoutes` from storage and, if present,
 * writes them to `stepped-links.<ISO date>.config` in the chosen folder. Shows a HUD message
 * indicating success, or a HUD message if there are no links to export. If no folder is selected,
 * shows a HUD message indicating the selection was canceled.
 */
export default async function ExportStepsConfig() {
  showToast({
    style: Toast.Style.Animated,
    title: 'Exporting file',
  });

  const folderPath = await chooseFolder();

  if (folderPath) {
    const stepsInfo = await Storage.getItem('steppedRoutes', []);
    const date = currentDateISO();

    if (stepsInfo) {
      await saveFile(`stepped-links.${date}.config`, folderPath, stepsInfo);
      showHUD('✅ Links exported successfully');
    } else {
      showHUD('❌ No links to export');
    }
  } else {
    showHUD('❌ No folder selected');
  }
}