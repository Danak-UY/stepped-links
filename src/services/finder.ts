import { join } from 'path';
import { writeFile, readFile } from 'fs/promises';

import { showInFinder } from '@raycast/api';
import { runAppleScript } from 'run-applescript';

import { objToJson, jsonToObj } from '../helpers/parser';

export default class Finder {
  static async chooseFile(type: string): Promise<string> {
    const appleScript = `
      set chosenFile to choose file with prompt "Elije una carpeta" of type "${type}"
      return POSIX path of chosenFile
    `;

    const filePath = await runAppleScript(appleScript);
    return filePath;
  }

  static async chooseFolder(): Promise<string> {
    const appleScript = `
      set chosenFile to choose folder with prompt "Elije una carpeta"
      return POSIX path of chosenFile
    `;

    const folderPath: string = await runAppleScript(appleScript);
    return folderPath;
  }

  static async saveFile(fileName: string, path: string, data: object) {
    const file = join(path, `${fileName}.json`);
    await writeFile(file, objToJson(data));
  }

  static async readFile(path: string): Promise<object> {
    const file = await readFile(path, { encoding: 'utf8' });
    const parsedFile = jsonToObj(file);
    return parsedFile;
  }

  static showFileInFinder(path: string) {
    showInFinder(path);
  }
}
