import { Form, ActionPanel, Action, showToast, Toast } from '@raycast/api';
import { useState, useEffect } from 'react';

import Storage from './services/storage';
import { merge } from 'lodash';
import Feedback from './services/feedback';

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
  try {
    Feedback.toast('Saving new step', Toast.Style.Animated);
    const stepPath = buildStepPath(step);
    // console.log('file', stepPath);

    const stepsInfo = await Storage.getItem('steppedRoutes', {});

    merge(stepsInfo, stepPath);
    await Storage.setItem('steppedRoutes', stepsInfo);

    Feedback.toast('Step created', Toast.Style.Success);
  } catch (e) {
    console.error(e);
    Feedback.toast('There was a problem saving step', Toast.Style.Failure);
  }
};

export default function CreateStepForm({ path, name, url, search }) {
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

  const handleSubmit = async (values) => {
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
