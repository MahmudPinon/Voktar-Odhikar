import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length, IsInt } from 'class-validator'


export class DisProductDTO{

@IsNotEmpty({message: 'Please enter a valid Distributor Name'}) 
@IsString()
distributor_name:string;


@IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
@IsString()
product_name:string;

@IsNotEmpty({ message: 'Please Provide the available quantity' }) 
@IsInt()
product_quantity:number;

@IsNotEmpty({ message: 'Please Provide the available quantity' }) 
@IsInt()
distributor_price:number;



}

export class DisAddProductDto{
    @IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
    @IsString()
    product_name:string;

    @IsNotEmpty({ message: 'Please Provide the available quantity' }) 
    @IsInt()
    product_quantity:number;

    @IsNotEmpty({ message: 'Please Provide the available quantity' }) 
    @IsInt()
    distributor_price:number;
}

export class updateProductQuantity{
    @IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
    @IsString()
    product_name:string;

    @IsNotEmpty({ message: 'Please Provide the available quantity' }) 
    @IsInt()
    product_quantity:number;
}

export class updateProductPrice{
    @IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
    @IsString()
    product_name:string;

    @IsNotEmpty({ message: 'Please Provide the available quantity' }) 
    @IsInt()
    distributor_price:number;
}

export class DeleteProduct{
    @IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
    @IsString()
    product_name:string;
}

//user
export class ViewProductPriceDTO {
  @IsNotEmpty({ message: 'Please enter a valid Product Name' })
  @IsString()
  product_name: string;
}

// get-products-by-distributor.dto.ts

export class GetProductsByDistributorDTO {
  @IsNotEmpty({ message: 'Please enter a valid Distributor Name' }) 
  @IsString()
  distributor_name: string;

  @IsNotEmpty({ message: 'Please enter a valid Product Name' }) 
  @IsString()
  product_name: string;

  @IsNotEmpty({ message: 'Please Provide the available quantity' }) 
  @IsInt()
  product_quantity: number;

  @IsNotEmpty({ message: 'Please Provide the available quantity' }) 
  @IsInt()
  distributor_price: number;
}
