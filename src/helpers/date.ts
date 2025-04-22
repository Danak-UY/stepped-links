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
