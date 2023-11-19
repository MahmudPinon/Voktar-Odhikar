import { IsEmail, IsNotEmpty,IsString,Matches,IsIn,Length, IsNumber } from 'class-validator'
const validUsers = ['User', 'Industry', 'Distributor'];

export class ReportandNoticeDTO{



// @IsNotEmpty({ message: 'Please Provide the Valid Industry or Distributor Name'}) 
// @IsString()
name:string;


// @IsIn(validUsers, { message: 'Role Can be Only [Industry or Distributor] please check the spelling and Case' })
// @IsNotEmpty({ message: 'Please enter a role' })
// @IsString()
reporterrole: string;


@IsNotEmpty({ message: 'Please provide the reason'})
@IsString()
reportornotice:string;

@IsNotEmpty({ message: 'Pleae Provide the receiver name'})
@IsString()
receiver:string;

@IsIn(['Notice', 'Report'], { message: 'Type must be Notice or Report' })
@IsString()
type:string;


}

export class ReportandNoticeDisDTO{



    @IsNotEmpty({ message: 'Please Provide the Valid Industry or Distributor Name'}) 
    @IsString()
    name:string;
    
    
    @IsIn(validUsers, { message: 'Role Can be Only [Industry or Distributor or User] please check the spelling and Case' })
    @IsNotEmpty({ message: 'Please enter a role' })
    @IsString()
    reporterrole: string;
    
    
    @IsNotEmpty({ message: 'Please provide the reason'})
    @IsString()
    reportornotice:string;
    
    @IsNotEmpty({ message: 'Pleae Provide the receiver name'})
    @IsString()
    receiver:string;
    
    @IsIn(['Notice', 'Report'], { message: 'Type must be Notice or Report' })
    @IsString()
    type:string;
    
    
}

export class ReportandNoticePostDisDTO{
 
    
    @IsNotEmpty({ message: 'Please provide the reason'})
    @IsString()
    reportornotice:string;
    
    @IsNotEmpty({ message: 'Pleae Provide the receiver name'})
    @IsString()
    receiver:string;
    
    @IsIn(['Notice', 'Report'], { message: 'Type must be Notice or Report' })
    @IsString()
    type:string;
    
    
}

//user
export class ReportandNoticeUserDTO{



    @IsNotEmpty({ message: 'Please Provide the Valid Industry or Distributor Name'}) 
    @IsString()
    name:string;
    
    
    @IsIn(validUsers, { message: 'Role Can be Only [Industry or Distributor or User] please check the spelling and Case' })
    @IsNotEmpty({ message: 'Please enter a role' })
    @IsString()
    reporterrole: string;
    
    
    @IsNotEmpty({ message: 'Please provide the reason'})
    @IsString()
    reportornotice:string;
    
    @IsNotEmpty({ message: 'Pleae Provide the receiver name'})
    @IsString()
    receiver:string;
    
    @IsIn(['Notice', 'Report'], { message: 'Type must be Notice or Report' })
    @IsString()
    type:string;
    
    
}

export class ReportandNoticePostUserDTO{
 
    
    @IsNotEmpty({ message: 'Please provide the reason'})
    @IsString()
    reportornotice:string;
    
    @IsNotEmpty({ message: 'Pleae Provide the receiver name'})
    @IsString()
    receiver:string;
    
    @IsIn(['Notice', 'Report'], { message: 'Type must be Notice or Report' })
    @IsString()
    type:string;
    
    
}