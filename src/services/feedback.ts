import { showHUD, showToast, Toast } from '@raycast/api';

export default class Feedback {
  static hud(title: string) {
    showHUD(title);
  }

  static async toast(title: string, message = '', style: Toast.Style = Toast.Style.Success): Promise<Toast> {
    return await showToast({
      title,
      message,
      style,
    });
  }
}
