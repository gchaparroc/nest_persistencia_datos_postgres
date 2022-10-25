import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/users.dtos';
import { ProductsService } from './../../products/services/products.service';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';
 
@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      private customersService: CustomersService,
  ){}


  findAll() {
    console.log("en el servicio");
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      //throw 'Producto no existe';
      throw new NotFoundException(`El Usuario #${id} no existe`);
    }
    return user;
  }

  
  async create(data: CreateUserDto) {
    console.log(data);
    const newUser = this.userRepo.create(data);
    if(data.customerId){
      const custumer = await this.customersService.findOne(data.customerId);
      newUser.customer = custumer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
     
  }

  remove(id: number) {
    return this.userRepo.delete(id)
  }
/*
  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks(){
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
*/  
}
