import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(50)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
 