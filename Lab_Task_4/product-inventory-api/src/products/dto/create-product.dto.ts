import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsInt,
  Min,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  price: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  stock?: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export { CreateProductDto as createProductDto };
