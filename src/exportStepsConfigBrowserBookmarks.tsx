import { showHUD } from '@raycast/api';

/**
 * Display a HUD informing the user that browser bookmarks import is not implemented.
 *
 */
export default async function ExportStepsConfigBrowserBookmarks() {
  showHUD('❌ Browser bookmarks import not implemented yet');
}