import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CustomersService } from './../services/customers.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customers.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customersService.findAll();
  }

  @Get(':customerId')
  @HttpCode(HttpStatus.ACCEPTED)
  getCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.findOne(customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    console.log(payload);
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }

}
