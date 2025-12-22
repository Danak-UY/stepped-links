import { showHUD } from '@raycast/api';

/**
 * Notifies the user that QuickLinks export is not implemented.
 *
 * Displays a heads-up notification with the message "❌ QuickLinks export not implemented yet".
 */
export default async function ExportStepsConfigQuickLinks() {
  showHUD('❌ QuickLinks export not implemented yet');
}