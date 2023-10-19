import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCityDto {

    @MinLength(3)
    @MaxLength(100)
    @IsString()
    name: string;

    @IsInt()
    state_id: number;

}
