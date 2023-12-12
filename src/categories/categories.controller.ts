// src/Categories/Categories.controller.ts
import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './Categories.service';
import { Categories } from './Categories.entity';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async create(@Body() createCategoriesDto: Partial<Categories>): Promise<Categories> {
    return this.categoriesService.create(createCategoriesDto);
  }

  @Put(':id/update')
  async update(@Param('id') id: number, @Body() updateCategoriesDto: Partial<Categories>): Promise<Categories> {
    return this.categoriesService.update(id, updateCategoriesDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categories> {
    return this.categoriesService.findOne(id);
  }

  @Get()
  async findMany(): Promise<Categories[]> {
    return this.categoriesService.findMany();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
