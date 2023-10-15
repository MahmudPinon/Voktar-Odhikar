
import { IsString, IsEmail, IsNotEmpty, MaxLength, IsInt, Matches, IsNumber } from 'class-validator';


export class IndustryInfo {
@IsEmail()
    email: string;
/*
@MaxLength(100)
    LiecenseNum: string; */

@IsNotEmpty()
    id: number;

@IsString()
    name: string;

@IsInt()
    distributor_number: number;

@Matches(/^\d{4}-\d{2}-\d{2}$/)
    dob: string;

}

export class IndustryInfo1{
    @IsString()
    name: string;
    @IsEmail() @IsString()
    email: string;
    @IsString()
    password: string;
}






/*
export class IndustryInfo{
    name: string;
    id: number;
    price: number;
    unit: number;
    username: string;
    first_name: string;
    last_name:string;
    password: string;
    address: string;
    age: number;
    LiecenseNum : string;
}


export class industryUpdateInfo{
    name: string;
    username: string;
    password: string;
    address: string;
    age: number;
} */