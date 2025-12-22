import React from 'react';
import { List } from '@raycast/api';

import type { StepTypes } from '../types/Step';

import StepItem from './StepItem';

interface StepsListTypes {
  steps: StepTypes[];
  traveled?: string[];
  currentQuery?: string;
}

/**
 * Render a list of step items, optionally grouped under a breadcrumb-style section title.
 *
 * @param steps - Array of step objects to render as individual StepItem entries.
 * @param traveled - Optional ordered breadcrumb segments; when provided they are joined with ` › ` and used as the List.Section title. If empty or omitted, no section title is rendered.
 * @param currentQuery - Optional query string forwarded to each StepItem (for highlighting or filtering purposes).
 * @returns The JSX element containing the rendered StepItem components, wrapped in a List.Section when a title is present or a fragment otherwise.
 */
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