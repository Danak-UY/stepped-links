import { showHUD } from '@raycast/api';

/**
 * Display a HUD message indicating that the QuickLinks import is not implemented.
 */
export default async function ImportStepsConfigQuickLinks() {
  showHUD('❌ QuickLinks import not implemented yet');
}