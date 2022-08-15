import { LocalStorage } from '@raycast/api';
import { objToJson, jsonToObj } from '../helpers/parser';

export default class Storage {
  static async setItem(key: string, data: LocalStorage.Value) {
    await LocalStorage.setItem(key, objToJson(data));
  }

  static async getItem<T>(key: string, defaultValue: T): Promise<object | T> {
    return jsonToObj((await LocalStorage.getItem(key)) ?? 'null') ?? defaultValue;
  }

  static async removeItem(key: string) {
    await LocalStorage.removeItem(key);
  }

  static async clear() {
    await LocalStorage.clear();
  }
}
