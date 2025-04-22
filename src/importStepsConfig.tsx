import { showToast, Toast, showHUD, LocalStorage } from '@raycast/api';
import { chooseFile, readFile } from './controller/finder';
import { FILE_TYPES } from './helpers/constants';

import Storage from './services/storage';

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
