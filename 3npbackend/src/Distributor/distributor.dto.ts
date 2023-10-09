import { Contains, IsBoolean, IsString, Matches, MinLength, IsArray } from 'class-validator'

export class DistributorInfo{
    disId:string;
    @IsString()
    disName:string;
    @IsString()
    username:string;
    @MinLength(6)
    @IsString()
    password:string;
    @IsString()
    @Contains("Dhaka",{message: 'Invalid city'})
    region:string;
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,{message:'invalid mail'})
    @IsString()
    email:string;
}

export class DistributorProductList{
    @IsArray()
    disProducts:string[];
    totProduct:number;
}

export class DistributorProfilePicture{
    disProfilePicture:string;
}

export class DistributorLiscense{
    disLiscence:File;
    @IsBoolean()
    LisceneApproval:boolean;
}

