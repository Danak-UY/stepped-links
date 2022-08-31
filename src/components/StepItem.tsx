import { Icon, List } from '@raycast/api';

import StepTypes from '../types/Step';

import StepActions from './StepActions';

interface StepItemTypes {
  step: StepTypes;
}

export default function StepItem(props: StepTypes) {
  const { title, subtitle, url, hasSearch, icon, insideSteps } = props;

  const rightIcon = hasSearch ? { icon: Icon.MagnifyingGlass } : {};

  return (
    <List.Item
      key={title}
      // icon={getFavicon("https://dev.mercadopago.com.ar")}
      // icon={{ tooltip: 'test', source: Icon[item.icon], tintColor: Color.Blue }}
      icon={{ source: icon }}
      title={title ?? 'component empty'}
      subtitle={subtitle}
      accessories={[rightIcon]}
      actions={<StepActions url={url} name={title} />}
    />
  );
}
