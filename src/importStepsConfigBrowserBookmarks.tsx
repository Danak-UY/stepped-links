import { showHUD } from '@raycast/api';

/**
 * Notifies the user that browser bookmarks import is not implemented.
 *
 * Displays a short HUD message informing the user the browser bookmarks import feature is not yet available.
 */
export default async function ImportStepsConfigBrowserBookmars() {
  showHUD('❌ Browser bookmars import not implemented yet');
}