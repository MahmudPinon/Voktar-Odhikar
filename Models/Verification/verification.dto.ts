import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length } from 'class-validator'
import { Unique } from 'typeorm';
const validverficationmessage = ['Yes', 'No', 'yes', 'no','YES','NO'];

export class VerificationDTO{


@Matches(/^AUTH-\d{12}$/, {
    message: 'License number must start with "AUTH-" followed by 12 digits',
  })
@IsString()
@IsNotEmpty({ message: 'Please Provide the Valid License Number' }) 
license_number:string;


@IsNotEmpty({ message: 'Please enter a valid verfication Message' })
@IsString()
@IsIn(validverficationmessage, { message: 'verfication Message Can be Only [Yes,No,yes,no,YES,NO] please check the spelling and Case' })
verified: string;


file_location_name:string;

id: number;
}


export class VerificationIndustryandDistributorDTO{


  @Matches(/^AUTH-\d{12}$/, {
      message: 'License number must start with "AUTH-" followed by 12 digits',
    })
  @IsString()
  @IsNotEmpty({ message: 'Please Provide the Valid License Number' }) 
  license_number:string;
  
  
  @IsNotEmpty({ message: 'Please enter a valid verfication Message' })
  @IsString()
  @IsIn(validverficationmessage, { message: 'verfication Message Can be Only [Yes,No,yes,no,YES,NO] please check the spelling and Case' })
  verified: string;
  
  
  id: number;
  }

  export class VerificationDisDTO{


      @Matches(/^AUTH-\d{12}$/, {
          message: 'License number must start with "AUTH-" followed by 12 digits',
        })
      @IsString()
      @IsNotEmpty({ message: 'Please Provide the Valid License Number' }) 
      license_number:string;
      
      file_location_name:string;
    }