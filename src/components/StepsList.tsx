import React from 'react';
import { List, Icon } from '@raycast/api';

import StepTypes from '../types/Step';

import StepItem from './StepItem';

interface StepsListTypes {
  steps: StepTypes[];
  traveled: string[];
}

export default function StepsList({ steps, traveled = [] }: StepsListTypes) {
  const listTitle = traveled.join(' › ');

  const Wrapper = listTitle ? List.Section : React.Fragment;

  return (
    <Wrapper title={listTitle}>
      {/* <List.Item
        title="Step"
        subtitle="{ 3 } Name | Url | Combo | Non culpa eu id veniam cupidatat nulla dolor velit commodo consectetur sint ut duis."
        icon={{ source: Icon.Alarm }}
        accessories={[
          { text: 'Non culpa eu id veniam cupidatat nulla dolor velit commodo consectetur sint ut duis.' },
          { text: '[ 4 ]' },
        ]}
      />
      <List.Item title="https://mercadolibre.github.io/fury_seller-central-ui/" icon={{ source: Icon.Link }} />
      <List.Item title="[ 2 ]" subtitle="[ 'gh ty ri', 'gh ry ti' ]" icon={{ source: Icon.Layers }} /> */}
      {steps.map((step: StepTypes) => (
        <StepItem {...step} />
      ))}
    </Wrapper>
  );
}
