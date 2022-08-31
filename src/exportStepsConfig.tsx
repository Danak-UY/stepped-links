import Storage from './services/storage';

import { showToast, Toast, showHUD } from '@raycast/api';
import { chooseFolder, saveFile } from './controller/finder';

import { currentDate_YYYY_MM_DDTH } from './helpers/date';

export default async function ExportStepsConfig() {
  showToast({
    style: Toast.Style.Animated,
    title: 'Loading file',
  });

  const folderPath = await chooseFolder();

  if (folderPath) {
    const stepsInfo = await Storage.getItem('steppedRoutes', []);
    const date = currentDate_YYYY_MM_DDTH();
    stepsInfo && (await saveFile(`stepped-links.${date}.config`, folderPath, stepsInfo));

    showHUD('✅ Links exported successfully');
  }
}
