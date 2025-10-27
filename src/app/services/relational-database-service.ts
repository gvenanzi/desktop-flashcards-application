import { Injectable } from '@angular/core';
import {Collection, Flashcard, mapCollection, mapFlashcard, mapTest, Test} from '../models/RDBFlashcard.schema';

@Injectable({
  providedIn: 'root'
})
export class RelationalDatabaseService {

  // collection handlers
  public async addCollection(name: string, description: string): Promise<void> {
    await window.electron.ipcRenderer.invoke('add-collection', name, description); // returns the id of the last inserted collection
  }

  public async getCollections(): Promise<Collection[]> {
    const rowCollections = await window.electron.ipcRenderer.invoke('get-collections');
    return rowCollections.map(mapCollection)
  }

  public async getCollectionById(collectionId: number): Promise<Collection> {
    const rowCollection = await window.electron.ipcRenderer.invoke('get-collection', collectionId);
    return mapCollection(rowCollection);
  }

  // flashcard handlers
  public async addFlashcard(question: string, answer: string, collectionId: number): Promise<void> {
    await window.electron.ipcRenderer.invoke('add-card', question, answer, collectionId); // returns the id of the last inserted collection
  }

  public async getFlashcardById(flashcardId: number): Promise<Flashcard> {
    const rowFlashcard = await window.electron.ipcRenderer.invoke('get-card-by-id', flashcardId);
    return mapFlashcard(rowFlashcard);
  }

  public async getFlashcardsByCollection(collectionId: number): Promise<Flashcard[]> {
    const rowFlashcards = await window.electron.ipcRenderer.invoke('get-cards-by-collection', collectionId);
    return rowFlashcards.map(mapFlashcard)
  }

  public async getLastWrongFlashcardsByCollection(collectionId: number): Promise<Flashcard[]> {
    const rowFlashcards = await window.electron.ipcRenderer.invoke('get-wrong-cards-by-collection', collectionId);
    return rowFlashcards.map(mapFlashcard)
  }

  public async updateFlashcardsQuestionAndAnswer(flashcardId: number, question: string, answer: string): Promise<number> {
    return await window.electron.ipcRenderer.invoke('update-card-only-question-and-answer', flashcardId, question, answer);
  }

  public async updateFlashcardsLastTimeGuess(flashcardId: number, guessStatus: boolean): Promise<number> {
    return await window.electron.ipcRenderer.invoke('update-card-only-last-time-guess', flashcardId, guessStatus);
  }

  public async deleteFlashcardsById(flashcardId: number): Promise<number> {
    return await window.electron.ipcRenderer.invoke('delete-card', flashcardId);
  }

  // test handlers
  public async addTest(dateTime: string, rights: number, wrongs: number, collectionId: number): Promise<number> {
    return await window.electron.ipcRenderer.invoke('add-test', dateTime, rights, wrongs, collectionId); // returns the id of the last inserted collection
  }

  public async getTestsByCollection(collectionId: number): Promise<Test[]> {
    const rowTests = await window.electron.ipcRenderer.invoke('get-tests', collectionId);
    return rowTests.map(mapTest);
  }

  public async getLastTestByCollection(collectionId: number): Promise<Test> {
    const rowTest = await window.electron.ipcRenderer.invoke('get-last-test', collectionId);
    return mapTest(rowTest);
  }
}
