import { showHUD, showToast, Toast } from '@raycast/api';

export default class Feedback {
  static hud(title: string) {
    showHUD(title);
  }

  static async toast(title: string, style: Toast.Style = Toast.Style.Success, message = ''): Promise<Toast> {
    return await showToast({
      title,
      message,
      style,
    });
  }
}
