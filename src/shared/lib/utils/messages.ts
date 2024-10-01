import { message } from 'antd';

export function showErrorMessage(text: string): void {
  message.error(text);
}

export function showSuccessMessage(text: string): void {
  message.success(text);
}
