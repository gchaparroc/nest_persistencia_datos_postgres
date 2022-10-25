import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Length,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'El mail del usuario' })
  readonly email: string;
  
  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  // Agregamos atributo de relacion
  @IsOptional()
  @IsPositive()
  @ApiProperty() 
  readonly customerId: number; 
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
