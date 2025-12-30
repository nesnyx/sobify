import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMenuDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    category: string

}
