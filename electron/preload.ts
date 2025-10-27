import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        invoke: (...args: Parameters<typeof ipcRenderer.invoke>) =>
            ipcRenderer.invoke(...args),
        on: (...args: Parameters<typeof ipcRenderer.on>) =>
            ipcRenderer.on(...args),
    },
});
