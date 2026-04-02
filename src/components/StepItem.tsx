import { Icon, List } from '@raycast/api';
import type { StepTypes } from '../types/Step';

import StepActions from './StepActions';

interface StepItemProps extends StepTypes {
  title?: string;
  url?: string;
  query?: string;
  search?: string;
  path?: string;
}

export default function StepItem({
  title = '',
  subtitle = '',
  url = '',
  hasSearch = false,
  icon = Icon.Link,
  query = '',
  search = '',
  path = '',
}: StepItemProps) {
  const rightIcon = hasSearch ? { icon: Icon.MagnifyingGlass } : {};
  const itemKey = `${path || title}-${url}`;

  return (
    <List.Item
      key={itemKey}
      icon={{ source: icon }}
      title={title || 'component empty'}
      subtitle={subtitle}
      accessories={[rightIcon]}
      actions={<StepActions url={url} name={title} query={query} search={search} path={path} />}
    />
  );
}
