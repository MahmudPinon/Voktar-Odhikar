import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length } from 'class-validator'
const validDistricts = ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'];
const validUsers = ['Admin', 'User', 'Industry', 'Distributor'];

export class ProfileDTO{
@Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
@IsNotEmpty({message: 'Please enter a valid name'}) 
@IsString()
name:string;



@IsNotEmpty({ message: 'Please enter a valid role' }) 
@IsEmail() 
@IsString()
email:string;


@IsNotEmpty({ message: 'Please Provide the Address' }) 
@IsString()
address:string;

@Matches(/^AUTH-\d{12}$/, {
    message: 'License number must start with "AUTH-" followed by 12 digits',
  })
@IsString()
@IsNotEmpty({ message: 'Please Provide the Valid License Number' }) 
license_number:string;

@Matches(/^(0[01789]|1[01789])[7893564]\d{8}$/, { message: 'Invalid phone number format' })
@IsNotEmpty({ message: 'PhoneNumber cannot be empty' })
@IsString()
@IsNotEmpty() 
phone_number:string;


@IsNotEmpty({ message: 'Please enter a valid role' })
@IsString()
@IsIn(validUsers, { message: 'Role Can be Only [Admin,User,Industry, Distributor] please check the spelling and Case' })
role: string;


@IsNotEmpty({ message: 'Please enter a valid password' })
@IsString()
@Length(8, undefined, { message: 'Password must be at least 8 characters long' })
@Matches(/^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])/, { message: 'Password must include at least 2 special characters and 2 numbers' })
password:string;



@IsNotEmpty({ message: 'Please enter a valid region' })
@IsString()
@IsIn(validDistricts, { message: 'Region must be one of the 8 districts in Bangladesh' })
region: string;

}


export class Login{
  @IsNotEmpty({ message: 'Please enter a valid email' }) 
  @IsEmail() 
  @IsString()
  email:string;

@IsNotEmpty({ message: 'Please enter a valid password' })
@IsString()
@Length(8, undefined, { message: 'Password must be at least 8 characters long' })
@Matches(/^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])/, { message: 'Password must include at least 2 special characters and 2 numbers' })
password:string;
}



export class UpdateAdminDTO{

@Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
@IsNotEmpty({message: 'Please enter a valid name'}) 
@IsString()
name:string;


@IsNotEmpty({ message: 'Please Provide the Address' }) 
@IsString()
address:string;
  
@Matches(/^(0[01789]|1[01789])[7893564]\d{8}$/, { message: 'Invalid phone number format' })
@IsNotEmpty({ message: 'PhoneNumber cannot be empty' })
@IsString()
@IsNotEmpty() 
phone_number:string;


@IsNotEmpty({ message: 'Please enter a valid password' })
@IsString()
@Length(8, undefined, { message: 'Password must be at least 8 characters long' })
@Matches(/^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])/, { message: 'Password must include at least 2 special characters and 2 numbers' })
password:string;

}

export class UpdateNameDTO{

  @Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
  @IsNotEmpty({message: 'Please enter a valid name'}) 
  @IsString()
  name:string;

}

export class UpdateaddressDTO{

  @IsNotEmpty({ message: 'Please Provide the Address' }) 
  @IsString()
  address:string;

}

export class UpdatePhoneDTO{

  @Matches(/^(0[01789]|1[01789])[7893564]\d{8}$/, { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'PhoneNumber cannot be empty' })
  @IsString()
  @IsNotEmpty() 
  phone_number:string;

}

export class UpdatepasswordDTO{

  @IsNotEmpty({ message: 'Please enter a valid password' })
  @IsString()
  @Length(8, undefined, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])/, { message: 'Password must include at least 2 special characters and 2 numbers' })
  password:string;

}