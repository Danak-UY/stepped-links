import { Form, ActionPanel, Action } from '@raycast/api';
import { useState } from 'react';

import Storage from './services/storage';
import { merge } from 'lodash';

const buildPath = (path, content) => {
  return {
    [path]: content,
  };
};

const buildStepPath = ({ path, url, name, search }) => {
  const pathArr = path.split(' ').filter(Boolean).reverse();
  const step = {
    _url: url,
    _name: name,
    _search: search,
  };

  let obj = {};

  for (const onePath of pathArr) {
    obj = Object.keys(obj).length ? buildPath(onePath, obj) : buildPath(onePath, step);
  }

  return obj;
};

const addStepToStorage = async (step) => {
  const stepPath = buildStepPath(step);
  console.log('file', stepPath);

  const stepsInfo = await Storage.getItem('steppedRoutes', {});

  merge(stepsInfo, stepPath);
  await Storage.setItem('steppedRoutes', stepsInfo);
};

export default function CreateStepForm() {
  const [hasSearch, setHasSearch] = useState(false);
  const handleSubmit = (values) => {
    addStepToStorage(values);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create new step" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="path" autoFocus info="Path to search for the link" defaultValue="ry docs" title="Path" />

      <Form.TextField id="name" info="Name of the link" defaultValue="Raycast" title="Name" />
      <Form.TextField
        id="url"
        info="Url to be oppened"
        defaultValue="https://developers.raycast.com/api-reference/"
        title="Url"
      />
      <Form.Checkbox id="hasSearch" label="Add search" title="Add search" value={hasSearch} onChange={setHasSearch} />
      {hasSearch && (
        <Form.TextField
          id="search"
          info="Search to be oppened"
          defaultValue="https://developers.raycast.com/api-reference/{{q}}"
          title="Search"
        />
      )}
    </Form>
  );
}
