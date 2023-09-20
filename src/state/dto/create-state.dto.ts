import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateStateDto {

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsString()
    @MinLength(2)
    @MaxLength(2)
    abbreviation: string;
}
