import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length, isNotEmpty } from 'class-validator'
const validDistricts = ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'];
const validUsers = ['Admin', 'User', 'Industry', 'Distributor'];



export class ProfileDTO{

@Matches(/^[A-Za-z\s]+$/, { message: 'Name should only contain characters and spaces' })
@IsNotEmpty({message: 'Please enter a valid name'}) 
@IsString()
name:string;


@IsEmail() 
@IsNotEmpty({ message: 'Please enter a valid Email' }) 
@IsString()
email:string;


@IsNotEmpty({ message: 'Please Provide the Address' }) 
@IsString()
address:string;


// @IsNotEmpty({ message: 'Please Provide the License Folder' }) 
//license_number:string;

@Matches(/^(0[01789]|1[01789])[7893564]\d{8}$/, { message: 'Invalid phone number format' })
@IsNotEmpty({ message: 'PhoneNumber cannot be empty' })
@IsString()
phone_number:string;

@IsNotEmpty({ message: 'license Number cannot be empty' })
@IsString()
  @Matches(/^LIC-\d{5}$/, {
    message: 'License number must start with "LIC-" followed by 5 digits',
  })
license_number:string;


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