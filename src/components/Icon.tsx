import { Icon } from '@raycast/api';

interface StepIcon {
  type: string;
}

/**
 * Icons
 * - Direct link (no extra steps [name, url, search]) [Link, Anchor]
 * - Search [Hashtag, MagnifyingGlass]
 * - Combo [Tray, Layers]
 * - Step with more links [Center, Folder]
 */

export default function StepIcon({ type }: StepIcon) {
  return Icon[type] ?? Icon.Alarm;
}
