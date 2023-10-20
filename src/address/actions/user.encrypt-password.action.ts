import { BadRequestException } from "@nestjs/common";
import { returnOnlyNumber } from "../../helpers/return-only-number.helper";

export const postalCodeValidator = (postal_code:string) => {
    postal_code = returnOnlyNumber(postal_code);
    if(postal_code.length != 8)
    {
    throw new BadRequestException('postal_code is not valid!');
    }
    return postal_code;
}