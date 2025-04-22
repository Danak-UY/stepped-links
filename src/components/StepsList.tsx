import React from 'react';
import { List } from '@raycast/api';

import type { StepTypes } from '../types/Step';

import StepItem from './StepItem';

interface StepsListTypes {
  steps: StepTypes[];
  traveled?: string[];
  currentQuery?: string;
}

export default function StepsList({ steps, traveled = [], currentQuery }: StepsListTypes) {
  const listTitle = traveled.join(' › ') ?? '';

  const Wrapper = listTitle ? List.Section : React.Fragment;
  const wrapperProps = listTitle ? { title: listTitle } : {};

  return (
    <Wrapper {...wrapperProps}>
      {steps.map((innerStep: StepTypes) => (
        <StepItem key={`${innerStep.step}-${innerStep.url}`} {...innerStep} query={currentQuery} />
      ))}
    </Wrapper>
  );
}
