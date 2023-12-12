// src/Categories/Categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './Categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)
    private readonly CategoriesModel: typeof Categories
  ) {}

  async create(createCategoriesDto: Partial<Categories>): Promise<Categories> {
    return this.CategoriesModel.create(createCategoriesDto);
  }

  async update(id: number, updateCategoriesDto: Partial<Categories>): Promise<Categories> {
    const Categories = await this.CategoriesModel.findByPk(id);

    if (!Categories) {
      throw new NotFoundException(`Categories with id ${id} not found`);
    }

    await Categories.update(updateCategoriesDto);

    return Categories;
  }

  async findOne(id: number): Promise<Categories> {
    const Categories = await this.CategoriesModel.findByPk(id);

    if (!Categories) {
      throw new NotFoundException(`Categories with id ${id} not found`);
    }

    return Categories;
  }

  async findMany(): Promise<Categories[]> {
    return this.CategoriesModel.findAll();
  }

  async remove(id: number): Promise<void> {
    const Categories = await this.CategoriesModel.findByPk(id);

    if (!Categories) {
      throw new NotFoundException(`Categories with id ${id} not found`);
    }

    await Categories.destroy();
  }
}
