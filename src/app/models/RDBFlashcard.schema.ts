export interface Collection {
  id: number;
  name: string;
  description: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  lastTimeHasBeenAnswered: boolean | null;
  collectionId: number;
}

export interface Test {
  id: number;
  dateTime: string; // SALVALE COSì new Date().toISOString()
  rights: number;
  wrongs: number;
  collectionId: number;
}

export function mapCollection(row: any): Collection {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
  };
}

export function mapFlashcard(row: any): Flashcard {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    lastTimeHasBeenAnswered: row.last_time_has_been_answered === null ? null : row.last_time_has_been_answered,
    collectionId: row.collection_id,
  };
}

export function mapTest(row: any): Test {
  return {
    id: row.id,
    dateTime: row.date_time,
    rights: row.rights,
    wrongs: row.wrongs,
    collectionId: row.collection_id,
  };
}

