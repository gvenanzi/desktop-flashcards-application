// src/electron.d.ts
export interface ElectronAPI {
  ipcRenderer: {
    invoke(channel: string, ...args: any[]): Promise<any>;
    on(channel: string, listener: (event: any, ...args: any[]) => void): void;
    send(channel: string, ...args: any[]): void;
    removeListener(channel: string, listener: (...args: any[]) => void): void;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
