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

  static async readFile(filePath: string): Promise<object> {
    try {
      const fileContent = await readFile(filePath, { encoding: 'utf8' });
      const parsedFile = jsonToObj(fileContent);
      return parsedFile;
    } catch (error) {
      console.error('Error reading file:', filePath, error);
      throw error;
    }
  }

  static showFileInFinder(path: string) {
    showInFinder(path);
  }
}
