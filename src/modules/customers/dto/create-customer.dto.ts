import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    phone : string;


    @IsOptional()
    @IsString()
    address?: string;
}
