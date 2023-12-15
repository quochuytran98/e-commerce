// categories.module.ts
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './categories.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    SharedModule
    // Import other modules if needed
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService] // Export if CategoriesService should be used in other modules
})
export class CategoriesModule {}
