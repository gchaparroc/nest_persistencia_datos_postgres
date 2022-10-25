import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Brand } from './../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>){}

  /*Metodo para retornar todos los productos*/
  findAll() {
    return this.brandRepo.find();
  }

  /*Metodo para retornar un producto por id*/
  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      relations: ['products'],
      where: {
        id,
      },
    });
    if (!brand) {
      //throw 'Producto no existe';
      throw new NotFoundException(`La marca #${id} no existe`);
    }
    return brand;
  }

  /*Metodo para crear nuevos productos*/
  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }


  /*Metodo para actualizar */
  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne(id);
    this.brandRepo.merge(brand, changes);
      return this.brandRepo.save(brand);
  }


  /*Metodo para eliminar*/
  remove(id: number) {
    return this.brandRepo.delete(id)
  }
  
}
