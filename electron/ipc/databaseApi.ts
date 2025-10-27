import { ipcMain } from 'electron';
import db from '../database';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export function registerHandlers() {

  // collection handlers
  ipcMain.handle('add-collection', (event: IpcMainInvokeEvent, name: string, description: string) => {
    const result = db.prepare('INSERT INTO collection (name, description) VALUES (?, ?)').run(name, description);
    return result.lastInsertRowid; // todo restituisci errore se l'inserimento non va a buon fine
  });

  ipcMain.handle('get-collections', (event) => {
    return db.prepare('SELECT * FROM collection').all();
  });

  ipcMain.handle('get-collection', (event, collectionId: number) => {
    return db.prepare('SELECT * FROM collection WHERE id = ?').get(collectionId);
  });

  ipcMain.handle('delete-collection', (event, collectionId: number) => {
    return db.prepare('DELETE FROM collection WHERE id = ?').run(collectionId).changes;
  });

  // flashcard handlers
  ipcMain.handle('add-card', (event, question: string, answer: string, collectionId: number) => {
    const result = db.prepare('INSERT INTO flashcard (question, answer, collection_id) VALUES (?, ?, ?)').run(question, answer, collectionId);
    return result.lastInsertRowid;
  });

  ipcMain.handle('get-card-by-id', (event, flashcardId: number) => {
    return db.prepare('SELECT * FROM flashcard WHERE id = ? LIMIT 1').get(flashcardId);
  });

  ipcMain.handle('get-cards-by-collection', (event, collectionId: number) => {
    return db.prepare('SELECT * FROM flashcard WHERE collection_id = ?').all(collectionId);
  });

  ipcMain.handle('get-wrong-cards-by-collection', (event, collectionId: number) => {
    return db.prepare('SELECT * FROM flashcard WHERE collection_id = ? and last_time_has_been_answered = FALSE').all(collectionId);
  });

  ipcMain.handle('update-card-only-question-and-answer', (event, cardId: number, question: string, answer: string) => {
    return db.prepare('UPDATE flashcard SET question = ?, answer = ? WHERE id = ?').run(question, answer, cardId).changes;
  });

  ipcMain.handle('update-card-only-last-time-guess', (event, cardId: number, lastTimeHasBeenAnswered: boolean) => {
    return db.prepare('UPDATE flashcard SET last_time_has_been_answered = ? WHERE id = ?').run(lastTimeHasBeenAnswered ? 1 : 0, cardId).changes;
  });

  ipcMain.handle('delete-card', (event, cardId: number) => {
    return db.prepare('DELETE FROM flashcard WHERE id = ?').run(cardId).changes;
  });

  // test handlers
  ipcMain.handle('add-test', (event, dateTime: string, rights: number, wrongs: number, collectionId: number) => {
    const result = db.prepare('INSERT INTO test (date_time, rights, wrongs, collection_id) VALUES (?, ?, ?, ?)').run(dateTime, rights, wrongs, collectionId);
    return result.lastInsertRowid;
  });

  ipcMain.handle('get-tests', (event, collectionId: number) => {
    return db.prepare('SELECT * FROM test WHERE collection_id = ?').all(collectionId);
  });

  ipcMain.handle('get-last-test', (event, collectionId: number) => {
    return db.prepare('SELECT * FROM test WHERE collection_id = ? ORDER BY date_time DESC LIMIT 1').get(collectionId);
  });
}

