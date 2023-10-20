import { IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAddressDto {

    @IsInt()
    @IsPositive()
    user_id: number;

    @IsInt()
    @IsPositive()
    city_id: number;

    @IsString()
    @MinLength(3)
    @MaxLength(150)
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsOptional()
    complement: string;

    @IsString()
    @MinLength(8)
    @MaxLength(9)
    postal_code: string;

    @IsString()
    @MinLength(1)
    @MaxLength(11)
    address_number: string;

}
