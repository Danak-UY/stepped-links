import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { showInFinder } from '@raycast/api';
import { homedir } from 'os';
import { runAppleScript } from 'run-applescript';
import { objToJson, jsonToObj } from '../helpers/parser';

export default class Finder {
  static async chooseFile(): Promise<string> {
    console.log('chooseFile');
    const appleScript = `
      set chosenFile to choose file with prompt "Elije una carpeta" of type "public.json"
      return POSIX path of chosenFile
    `;

    const filePath = await runAppleScript(appleScript);
    console.log('the file choosen', filePath);
    return filePath;
  }

  static async chooseFolder(): Promise<string> {
    console.log('chooseFolder');
    const appleScript = `
      set chosenFile to choose folder with prompt "Elije una carpeta"
      return POSIX path of chosenFile
    `;

    const folderPath: string = await runAppleScript(appleScript);
    console.log('the folder choosen', folderPath);
    return folderPath;
  }

  static async saveFile(fileName: string, path: string, data: object) {
    console.log('saveFile', fileName, path, data);
    const file = join(path, `${fileName}.json`);
    await writeFile(file, objToJson(data));
  }

  static async readFile(path: string): Promise<object> {
    console.log('readFile', path);
    const file = await readFile(path, { encoding: 'utf8' });
    const parsedFile = jsonToObj(file);
    return parsedFile;
  }

  static showFileInFinder(path: string) {
    console.log('showFileInFinder');
    // showInFinder(join(homedir(), "Downloads"));
    showInFinder(path);
  }
}
