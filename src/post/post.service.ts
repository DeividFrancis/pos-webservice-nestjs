import { Inject, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly repository: Repository<Post>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const category = await this.categoryService.findOne(createPostDto.category);

    const post = this.repository.create({ ...createPostDto, category });
    post.slug = slugify(post.title, { lower: true });

    await this.repository.insert(post);

    return post;
  }

  findAll() {
    return this.repository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const post = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const category = await this.categoryService.findOne(updatePostDto.category);

    const post = await this.repository.preload({
      id,
      ...updatePostDto,
      category,
    });

    if (post.published) post.published_at = new Date();

    await this.repository.save(post);

    return post;
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
