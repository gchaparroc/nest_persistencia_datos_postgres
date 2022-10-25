import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from './../entities/cutomer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customers.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private customerRepo: Repository<Customer>){}

  findAll() {
    return this.customerRepo.find();
  }

  findOne(id: number) {
    const customer = this.customerRepo.findOne(id);
    if (!customer) {
      //throw 'Producto no existe';
      throw new NotFoundException(`El Cliente #${id} no existe`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  remove(id: number) {
    return this.customerRepo.delete(id);
  }
}
