import Storage from './services/storage';

import { showToast, Toast, showHUD } from '@raycast/api';
import { chooseFolder, saveFile } from './controller/finder';

import { currentDateISO } from './helpers/date';

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
