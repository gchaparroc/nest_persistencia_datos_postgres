import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './../entities/product.entity';
import { Category } from './../entities/category.entity';
import { Brand } from './../entities/brand.entity';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from './../dtos/products.dtos';
import { Repository, Between, FindConditions } from 'typeorm';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ){}

  /*Metodo para retornar todos los productos*/
  /*
  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }
  */
   /*Metodo para retornar todos los productos con paginacion*/
   findAll(params?: FilterProductsDto) {
    if(params){
      const where: FindConditions<Product> = {};
      const {limit, offset} = params;
      const {maxPrice, minPrice} = params;
      console.log(minPrice, maxPrice);
      if (minPrice && maxPrice){
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  /*Metodo para retornar un producto por id*/
  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations:['brand', 'categories'],
    });
    if (!product) {
      //throw 'Producto no existe';
      throw new NotFoundException(`El Producto #${id} no existe`);
    }
    return product;
  }

  /*Metodo para crear nuevos productos*/
  async create(data: CreateProductDto) {
    console.log(data);
    //const newProduct = new Product();
    //newProduct.name = data.name;
    //newProduct.description = data.description;
    //newProduct.price = data.price;
    //newProduct.stock = data.stock;
    //newProduct.image = data.image;
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoriesId) {
      const categories = await this.categoryRepo.findByIds(data.categoriesId);
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }
   
  /*Metodo para actualizar*/
  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoriesId) {
      const categories = await this.categoryRepo.findByIds(changes.categoriesId);
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
      return this.productRepo.save(product);
    
  }

  async addCategoryToProduct(productId: number, categoryId: number){
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number){
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }
  
  /*Metodo para eliminar*/
  remove(id: number) {
    return this.productRepo.delete(id)
  }
  
}
