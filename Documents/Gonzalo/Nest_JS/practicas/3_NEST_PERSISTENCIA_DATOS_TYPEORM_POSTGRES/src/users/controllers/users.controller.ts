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
import { UsersService } from './../services/users.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from './../dtos/users.dtos';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de Usuarios' })
  getUsers() {
    console.log("En el controlador");
    return this.usersService.findAll();
  }

  /*
  @Get('tasks')
  getTasks() {
    return this.usersService.getTasks();
  }
  */

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
/*
  @Get(':id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrdersByUser(id);
  }
*/
}
