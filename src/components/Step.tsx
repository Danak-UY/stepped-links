import { Icon, List } from '@raycast/api';

import itemTypes from '../types/Step';

import StepActions from './StepActions';

export default function Step({ item: ItemTypes }) {
  return (
    <List.Item
      key={item.id}
      // icon={getFavicon("https://dev.mercadopago.com.ar")}
      // icon={{ tooltip: 'test', source: Icon[item.icon], tintColor: Color.Blue }}
      icon={{ tooltip: 'test', source: Icon[item.icon] }}
      title={item.step}
      subtitle={item.title || item.accessory}
      accessories={[{ text: item.subtitle, date: new Date(), tooltip: 'Just Do It!' }]}
      actions={<StepActions />}
    />
  );
}
