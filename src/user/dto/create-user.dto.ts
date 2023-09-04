import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { Role } from "../../enum/role.enum";

export class CreateUserDto {
    
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name:string;

    @IsEmail()
    @MaxLength(100)
    email:string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minSymbols: 0,
        minLowercase: 0,
        minUppercase: 0,
    })
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role: number;


    @IsString()
    @MinLength(11)
    @MaxLength(11)
    cpf: string;


    @IsString()
    @MaxLength(11)
    @MinLength(10)
    phone_number: string;

}
