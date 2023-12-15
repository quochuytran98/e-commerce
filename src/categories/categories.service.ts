// src/Categories/Categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './categories.schema';
import { SequenceService } from '../shared/sequence.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly CategoriesModel: Model<Category>,
    private readonly sequenceService: SequenceService
  ) {}

  async create(createCategoriesDto: Partial<Category>): Promise<Category> {
    const categoryId = await this.sequenceService.getNextId(Category.name);
    return this.CategoriesModel.create({ id: categoryId, ...createCategoriesDto });
  }

  async update(id: number, updateCategoriesDto: Partial<Category>): Promise<Category> {
    const category = await this.CategoriesModel.findByIdAndUpdate(id, updateCategoriesDto, { new: true });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.CategoriesModel.findOne({ id }, { _id: 0 });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async findMany(): Promise<Category[]> {
    return this.CategoriesModel.find();
  }

  async remove(id: number): Promise<void> {
    const result = await this.CategoriesModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
