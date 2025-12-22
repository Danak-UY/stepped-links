import { Icon } from '@raycast/api';

interface StepIcon {
  type: string;
}

/**
 * Selects an Icon by name from the @raycast/api Icon set, falling back to `Icon.Alarm` if the name is not found.
 *
 * @param type - The Icon name to look up; should be a key from the exported `Icon` collection.
 * @returns The matching Icon value if found, `Icon.Alarm` otherwise.
 */

export default function StepIcon({ type }: StepIcon) {
  return (Icon as Record<string, Icon>)[type] ?? Icon.Alarm;
}