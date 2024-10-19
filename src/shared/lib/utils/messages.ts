import { message } from 'antd';

message.config({ top: 60, maxCount: 1 });

export function showErrorMessage(text: string): void {
  message.error(text);
}

export function showSuccessMessage(text: string): void {
  message.success(text);
}
