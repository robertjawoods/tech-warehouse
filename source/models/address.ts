import { BaseModel } from "./baseModel";

export class Address extends BaseModel<Address> {
    id: number;
    userId: string;
    lineOne: string;
    lineTwo: string;
    city: string;
    postalCode: string;
    country: string;
}