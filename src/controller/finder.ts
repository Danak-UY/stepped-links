import Finder from '../services/finder';
import { confirmAlert, Alert, showToast, Toast } from '@raycast/api';

export async function chooseFile(type: string): Promise<string | void> {
  try {
    return await Finder.chooseFile(type);
  } catch {
    const options: Alert.Options = {
      title: 'Not file choosen',
      message: 'You must choose a file to continue',
      primaryAction: {
        title: 'Choose a file',
      },
    };

    if (await confirmAlert(options)) {
      return chooseFile(type);
    }
  }
}

export async function chooseFolder(): Promise<string | void> {
  try {
    return await Finder.chooseFolder();
  } catch {
    const options: Alert.Options = {
      title: 'Not folder choosen',
      message: 'You must choose a folder to continue',
      primaryAction: {
        title: 'Choose a folder',
      },
    };

    if (await confirmAlert(options)) {
      return chooseFolder();
    }
  }
}

export async function readFile(path: string): Promise<object | void> {
  try {
    return await Finder.readFile(path);
  } catch {
    showToast({
      style: Toast.Style.Failure,
      title: 'Error reading file',
    });
  }
}

export async function saveFile(name: string, path: string, data: object): Promise<object | void> {
  try {
    return await Finder.saveFile(name, path, data);
  } catch {
    showToast({
      style: Toast.Style.Failure,
      title: 'Error saving file',
    });
  }
}
