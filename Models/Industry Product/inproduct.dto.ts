import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length, IsInt } from 'class-validator'


export class InProductDTO{

@Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
@IsNotEmpty({message: 'Please enter a valid Industry Name'}) 
@IsString()
industry_name:string;


@IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
@IsString()
product_name:string;

@IsNotEmpty({ message: 'Please Provide the available quantity' }) 
@IsInt()
product_quantity:number;



}