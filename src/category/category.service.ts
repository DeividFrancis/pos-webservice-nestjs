import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly respository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.respository.create(createCategoryDto);
    await this.respository.insert(category);
    return category;
  }

  async findAll() {
    return await this.respository.find();
  }

  async findOne(id: number) {
    return await this.respository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.respository.preload({
      id,
      ...updateCategoryDto,
    });

    await this.respository.save(category);
    return category;
  }

  remove(id: number) {
    return this.respository.delete(id);
  }
}
