import { IsNotEmpty, IsString } from "class-validator";

export class CreateMerchantDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    whatsappNumber: string;
}
