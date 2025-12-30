import { IsNotEmpty, IsString, Max, MaxLength, MinLength } from "class-validator";

export class QueryAgentDTO {
    @IsNotEmpty()
    @MaxLength(100)
    query: string


    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(15)
    telp: string
}
