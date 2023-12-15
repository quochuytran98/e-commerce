// src/Category/Category.controller.ts
import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.schema';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async create(@Body() createCategoriesDto: Partial<Category>): Promise<Category> {
    return this.categoriesService.create(createCategoriesDto);
  }

  @Put(':id/update')
  async update(@Param('id') id: number, @Body() updateCategoriesDto: Partial<Category>): Promise<Category> {
    return this.categoriesService.update(id, updateCategoriesDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post('/list')
  async findMany(): Promise<Category[]> {
    return this.categoriesService.findMany();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
