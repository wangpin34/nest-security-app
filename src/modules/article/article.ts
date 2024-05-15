export class Article {
  constructor(id: number, authorId: number, isPublished: boolean) {
    this.id = id;
    this.authorId = authorId;
    this.isPublished = isPublished;
  }
  id: number;
  isPublished: boolean;
  authorId: number;
}
