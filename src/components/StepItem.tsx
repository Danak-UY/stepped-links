import { Icon, List } from '@raycast/api';

import StepTypes from '../types/Step';

import StepActions from './StepActions';

interface StepItemTypes {
  step: StepTypes;
}

export default function StepItem(props: StepTypes) {
  const { name, url, hasSearch, icon, step, insideSteps } = props;

  return (
    <List.Item
      key={name}
      // icon={getFavicon("https://dev.mercadopago.com.ar")}
      // icon={{ tooltip: 'test', source: Icon[item.icon], tintColor: Color.Blue }}
      icon={{ tooltip: 'test', source: Icon[icon] }}
      title={step}
      subtitle={name || url}
      accessories={[{ text: url, tooltip: 'Just Do It!' }]}
      actions={<StepActions url={url} name={name} />}
    />
  );
}
