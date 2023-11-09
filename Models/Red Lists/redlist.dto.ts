import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length, IsNumber } from 'class-validator'
const validUsers = ['Admin', 'User', 'Industry', 'Distributor'];

export class RedListDTO{



// @IsNotEmpty({ message: 'Please Provide the Valid Industry or Distributor Name'}) 
// @IsString()
name:string;


// @IsIn(validUsers, { message: 'Role Can be Only [Industry or Distributor] please check the spelling and Case' })
// @IsNotEmpty({ message: 'Please enter a role' })
// @IsString()
role: string;


// @IsNotEmpty({ message: 'Please provide the reason'})
// @IsString()
reason:string;

// @IsNotEmpty({ message: 'Pleae Provide the issuer id'})
// @IsString()
issuer:string;


}
