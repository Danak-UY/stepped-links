import { showToast, Toast, showHUD } from '@raycast/api';
import { chooseFile, readFile } from './controller/finder';
import { FILE_TYPES } from './helpers/constants';

import Storage from './services/storage';

export default async function ImportStepsConfig() {
  showToast({
    style: Toast.Style.Animated,
    title: 'Loading file',
  });

  const filePath = await chooseFile(FILE_TYPES.JSON);
  console.log('file', filePath);

  if (filePath) {
    const fileInfo: object = await readFile(filePath);
    console.log('file info', fileInfo);

    if (fileInfo) {
      await Storage.setItem('steppedRoutes', fileInfo);

      showHUD('✅ Links imported successfully');
    }
  }
}
