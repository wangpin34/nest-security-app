export class Article {
  readonly id: string;
  title: string;
  content: string;
  published: boolean;
  readonly authorId: string;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.published = published;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static from({
    id,
    title,
    content,
    published,
    authorId,
    createdAt,
    updatedAt,
  }: {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new Article(
      id,
      title,
      content,
      published,
      authorId,
      createdAt,
      updatedAt,
    );
  }
}
