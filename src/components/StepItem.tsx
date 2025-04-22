import { Icon, List } from '@raycast/api';
import type { StepTypes } from '../types/Step';

import StepActions from './StepActions';

export default function StepItem(props: StepTypes) {
  const { title, subtitle, url, hasSearch, icon, query, search, path } = props;

  const rightIcon = hasSearch ? { icon: Icon.MagnifyingGlass } : {};

  return (
    <List.Item
      key={title}
      icon={{ source: icon! }}
      title={title ?? 'component empty'}
      subtitle={subtitle}
      accessories={[rightIcon]}
      actions={<StepActions url={url!} name={title!} query={query!} search={search!} path={path!} />}
    />
  );
}
