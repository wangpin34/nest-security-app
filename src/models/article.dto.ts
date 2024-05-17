export class Article {
  readonly id: string;
  title: string;
  content: string;
  published: boolean;
  readonly authorId: string;
  readonly createdAt: Date;
  updatedAt: Date;
}
