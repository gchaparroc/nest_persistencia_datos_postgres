import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'product´s name'})
  readonly name: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;
  
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly codigo: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
