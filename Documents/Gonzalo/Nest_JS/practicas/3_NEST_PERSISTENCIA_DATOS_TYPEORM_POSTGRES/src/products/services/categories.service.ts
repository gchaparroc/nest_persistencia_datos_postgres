import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './../entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './../dtos/categories.dtos';


@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>){}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      //throw 'Categoria no existe';
      throw new NotFoundException(`La categoria #${id} no existe`);
    }
    return category;
  }
  
  create(data: CreateCategoryDto) {
      //const newProduct = new Product();
      //newProduct.name = data.name;
      //newProduct.description = data.description;
      //newProduct.price = data.price;
      //newProduct.stock = data.stock;
      //newProduct.image = data.image;
      const newCategory = this.categoryRepo.create(data);
      return this.categoryRepo.save(newCategory);
    }
  

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(category, changes);
      return this.categoryRepo.save(category);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id)
  }
  
}
