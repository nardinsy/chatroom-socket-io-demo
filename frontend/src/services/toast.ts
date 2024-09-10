export interface ToastService {
  showSuccess(message: string): void;
  showError(message: string): void;
  registerToastServer(server: ToastServer): void;
  unregisterToastServer(server: ToastServer): void;
}

export enum ToastType {
  success,
  error,
}

export interface ToastServer {
  show(message: string, type: ToastType): void;
}
