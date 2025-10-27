import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {CreateCollectionPage} from './pages/create-collection-page/create-collection-page';
import {FlashcardCollectionPage} from './pages/flashcard-collection-page/flashcard-collection-page';
import {FlashcardListPage} from './pages/flashcard-list-page/flashcard-list-page';
import {CreateFlashcardPage} from './pages/create-flashcard-page/create-flashcard-page';
import {EditFlashcardPage} from './pages/edit-flashcard-page/edit-flashcard-page';
import {FlashcardsTestPage} from './pages/flashcards-test-page/flashcards-test-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'createCollection',
    component: CreateCollectionPage,
  },
  {
    path: 'collection/:id/test',
    component: FlashcardsTestPage,
  },
  {
    path: 'collection/:id/test-wrongs',
    component: FlashcardsTestPage,
  },
  {
    path: 'collection/:id',
    component: FlashcardCollectionPage,
  },
  {
    path: 'collection/:id/flashcardList',
    component: FlashcardListPage,
  },
  {
    path: 'collection/:id/createFlashcard',
    component: CreateFlashcardPage,
  },
  {
    path: 'collection/:collectionId/editFlashcard/:flashcardId',
    component: EditFlashcardPage,
  },
];
