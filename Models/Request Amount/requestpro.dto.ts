import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length, IsInt } from 'class-validator'


export class RequestProDTO{

@Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
@IsNotEmpty({message: 'Please enter a valid Industry Name'}) 
@IsString()
industry_name:string;

@Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
@IsNotEmpty({message: 'Please enter a valid Industry Name'}) 
@IsString()
distributor_name:string;


@IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
@IsString()
product_name:string;

@IsNotEmpty({ message: 'Please Provide the available quantity' }) 
@IsInt()
requested_quantity:number;

delivered_quantity:number;


}

export class RequestProDisDTO{

    @Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
    @IsNotEmpty({message: 'Please enter a valid Industry Name'}) 
    @IsString()
    industry_name:string;
    
    @IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
    @IsString()
    product_name:string;
    
    @IsNotEmpty({ message: 'Please Provide the available quantity' }) 
    @IsInt()
    requested_quantity:number;
    
    
}

