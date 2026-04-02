import type { StepInterface } from './types/StepJson';

import { useState, useEffect } from 'react';
import { Form, ActionPanel, Action } from '@raycast/api';

import { addStepToStorage } from './helpers/steps';

export default function CreateStepForm({ path, name, url, search }: StepInterface) {
  const [hasSearch, setHasSearch] = useState(Boolean(search));
  const [isLoading, setIsLoading] = useState(false);

  const [stepInfo, setStepInfo] = useState({
    path,
    name,
    url,
    search,
  });

  useEffect(() => {
    setStepInfo({
      path,
      name,
      url,
      search,
    });
  }, [path, name, url, search]);

  const handleSubmit = async (values: StepInterface) => {
    setIsLoading(true);
    await addStepToStorage(values);
    setIsLoading(false);
  };

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create new step" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="path"
        autoFocus
        info="Path to search for the link"
        placeholder="ry docs"
        defaultValue={stepInfo.path}
        title="Path"
      />

      <Form.TextField
        id="name"
        info="Name of the link"
        defaultValue={stepInfo.name}
        title="Name"
        placeholder="Raycast Docs"
      />
      <Form.TextField
        id="url"
        info="Url to be oppened"
        defaultValue={stepInfo.url}
        title="Url"
        placeholder="https://developers.raycast.com/api-reference/"
      />
      <Form.Checkbox id="hasSearch" label="Add search" title="Add search" value={hasSearch} onChange={setHasSearch} />
      {hasSearch && (
        <Form.TextField
          id="search"
          info="Search to be oppened"
          defaultValue={stepInfo.search}
          title="Search"
          placeholder="https://developers.raycast.com/api-reference/{{q}}"
        />
      )}
    </Form>
  );
}
