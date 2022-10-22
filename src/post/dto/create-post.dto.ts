export class CreatePostDto {
  title: string;

  description: string;

  author: string;

  slug: string;

  category: number;

  published: boolean;

  published_at: Date;
}
