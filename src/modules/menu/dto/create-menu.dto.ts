import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMenuDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    category: string

}
