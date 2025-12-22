/**
 * Produce a timestamp string for the current local date and time in an ISO-like layout.
 *
 * @returns A string representing the current local date and time in the format `YYYY-MM-DDThh-mm-ss` (note: the time portion uses hyphens between hours, minutes, and seconds). 
 */
export function currentDateISO() {
  const date = new Date();

  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1 + '').padStart(2, '0');
  const DD = (date.getDate() + '').padStart(2, '0');

  const hh = (date.getHours() + '').padStart(2, '0');
  const mm = (date.getMinutes() + '').padStart(2, '0');
  const ss = (date.getSeconds() + '').padStart(2, '0');

  return `${YYYY}-${MM}-${DD}T${hh}-${mm}-${ss}`;
}