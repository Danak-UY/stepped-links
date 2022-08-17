import React from 'react';
import { List } from '@raycast/api';

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
      {steps.map((step: StepTypes) => (
        <StepItem {...step} />
      ))}
    </Wrapper>
  );
}
