import { message } from 'antd';

export function showErrorMessage(err: Error): void {
  message.error(err.message);
}

export function showSuccessMessage(text: string): void {
  message.success(text);
}
