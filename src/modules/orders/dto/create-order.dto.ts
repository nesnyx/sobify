import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    customerName: string;

    @IsString()
    @IsNotEmpty()
    productName: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    

}



export class CreateNewOrderDto {
    @IsNotEmpty()
    @IsString()
    itemId : string

    @IsNotEmpty()
    @IsString()
    customerName: string;

    @IsString()
    @IsNotEmpty()
    productName: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class CreateOrderItemDto {

    @IsNotEmpty()
    @IsString()
    customerName: string;

    @IsNotEmpty()
    @IsString()
    menuItemId: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

}