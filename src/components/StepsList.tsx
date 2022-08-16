import { useEffect } from 'react';
import { List } from '@raycast/api';

import StepTypes from '../types/Step';

import StepItem from './StepItem';

interface StepsListTypes {
  steps: StepTypes[];
}

export default function StepsList({ steps }: StepsListTypes) {
  useEffect(() => {
    console.log('StepsList', steps);
  }, [steps]);

  return (
    <List.Section title="Lager › Github">
      {steps.map((step: StepTypes) => (
        <StepItem {...step} />
      ))}
    </List.Section>
  );
}
