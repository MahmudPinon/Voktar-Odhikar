import { Controller, Res,Get,Param,Query,Body,Post,Put,Delete,UsePipes, UploadedFile, UseInterceptors, Patch, UnprocessableEntityException, UseFilters, UseGuards, NotFoundException, UnauthorizedException, Session, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { ProfileService } from '../../Models/All Profile/profile.service';
import { VerificationService } from '../../Models/Verification/verification.service';
import { RedListService } from '../../Models/Red Lists/redlist.service';
import { ReportandNoticeService } from '../../Models/Report and Notice/reportandnotice.service';
import { Login, UpdateAdminDTO, UpdateNameDTO, UpdatePhoneDTO, UpdatepasswordDTO } from "../../Models/All Profile/profile.dto";
import { ProfileDTO} from '../../Models/All Profile/profile.dto';
import { Request } from 'express';
import { RedListDTO} from '../../Models/Red Lists/redlist.dto';

import { ReportandNoticeDTO} from '../../Models/Report and Notice/reportandnotice.dto';
import { VerificationDTO, VerificationIndustryandDistributorDTO} from '../../Models/Verification/verification.dto';
import { ValidationPipe,ParseIntPipe } from '@nestjs/common/pipes';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
//import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileEntity } from '../../Models/All Profile/profile.entity';
import { VerificationEntity } from '../../Models/Verification/verification.entity';
import { RedListEntity} from '../../Models/Red Lists/redlist.entity';
import { ReportandNoticeEntity} from '../../Models/Report and Notice/reportandnotice.entity';
import { SessionGuard } from "./SessionAdminGaurd.gaurd";
import { request } from 'express';
import session from 'express-session';
import {LicenseNumberExistsError,AuthorizationError,ProfileMismatchError,ProfileAlreadyVerifiedError, NotanyVerificationRequests,} from '../../Models/Verification/verification.errors';
import {ProfiledoesnotExistsError, ProfileAlreadyRedlistError,VerificationNotVerifiedError,NotanyRedlistedDributor, NotanyRedlistedIndustry, NoRedListDistributoroftheNumberError,} from '../../Models/Red Lists/redlist.error';
import {NoDistributorFound, NoIndustryFound, PhonenumberExistsforUpdate,} from '../../Models/All Profile/profile.error';

  @Controller("users/admin")
  export class AdminController {
  constructor(private readonly profileservice: ProfileService,
  private readonly verificationservice: VerificationService,
  private readonly redlistservice: RedListService,
  private readonly reportandnoticeservice: ReportandNoticeService) {}







@Post('addAdmin')
async addAdmin(@Body((new ValidationPipe())) adminInfo: ProfileDTO) {
  const { license_number, phone_number, email } = adminInfo;

  if (!(await this.profileservice.isProfileUnique(license_number, phone_number, email))) {
    throw new UnprocessableEntityException('Profile with the same license number, phone, or email already exists.');
  }
  const result = await this.profileservice.addAdmin(adminInfo);
  return result;
}




@Post('/rediststheindustryanddistributor')
@UseGuards(SessionGuard)
async redlist(@Body(new ValidationPipe()) redlistInfo: RedListDTO, @Session() session): Promise<RedListEntity | { message: string } | { success: boolean }> {
  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const redlistEntity = await this.redlistservice.redlist(redlistInfo, id);
      return redlistEntity;
    }
  } catch (error) {
    // You can log the error for debugging purposes
    console.error(error);

    // Check if the error is an instance of one of your custom error classes
    if (error instanceof ProfiledoesnotExistsError||error instanceof ProfileAlreadyRedlistError || error instanceof VerificationNotVerifiedError) {
      // Handle specific custom errors and return an appropriate response
      return { success: false, message: error.message };
    } else {
      // Handle other unexpected errors and return a general error response
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}



@Post('/sendnoticeorreport')
@UseGuards(SessionGuard)
async noticeandreport(@Body(new ValidationPipe()) noticeandreportInfo: ReportandNoticeDTO, @Session() session): Promise<ReportandNoticeEntity| { message: string }|{success: boolean}> {
  try {
    if (!session) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    } else {
      const user = session.user;
      var id = user.uid;
      return await this.reportandnoticeservice.noticeandreport(noticeandreportInfo, id);
    }
  } catch (error) {
    // Handle the error here and return an appropriate response
    return { success: false, message: error.message };
  }
}




  @Post('/performverificationadmin')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file_location_name', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 30000000000 },
    storage: diskStorage({
      destination: './upload',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      },
    }),
  }))
  async addVerification(
    @Body() verificationInfo: VerificationDTO,
    @UploadedFile() myfile: Express.Multer.File,
    @Session() session
  ) {
    verificationInfo.file_location_name = myfile.filename;
  
    const user = session.user;
  
    if (user) {
      // Check if the user is an Admin
      if (user.role === 'Admin') {
        // Pass the user ID from the session to verificationInfo
        verificationInfo.id = user.uid;
  
        try {
          const result = await this.verificationservice.addVerification(verificationInfo);
          return { success: true, message: 'Profile verified Successfully' };
        } catch (error) {
          if (error instanceof ProfileAlreadyVerifiedError) {
            return { success: false, message: 'Profile is already verified' };
          } else if (error instanceof LicenseNumberExistsError) {
            return { success: false, message: 'License number already exists.' };
          } else if (error instanceof ProfileMismatchError) {
            return { success: false, message: 'User ID and license number do not match with the profile.' };
          } else {
            return { success: false, message: 'An error occurred while adding the verification.' };
          }
        }
        
      } else {
        return { success: false, message: 'Access denied. You are not authorized to perform this action.' };
      }
    } else {
      return { success: false, message: 'User is not authenticated.' };
    }
  }
  



@Post('login')
@UsePipes(new ValidationPipe())
async login(@Body() data: Login, @Session() session): Promise<ProfileEntity | { message: string }> {
  const user = await this.profileservice.getUserLoginInfoByEmail(data.email);

  if (user != null) {
    const res = await this.profileservice.login(data.password, user.password);

    if (res) {
      if (user.role === 'Admin') {
        session.user = user;
        return user;
      } else {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }
    } else {
      throw new NotFoundException({ message: 'Email or Password did not match' });
    }
  } else {
    throw new UnauthorizedException({ message: 'User is not authorized' });
  }
}

@Get('/redlisteddistributor')
@UseGuards(SessionGuard)
async Redlisteddistributor(@Session() session): Promise<RedListEntity[]| { message: string }> { 
  const user = session.user;
  if(user.role=="Admin")
  {
    try {
      const redlistEntity = await this.redlistservice.redlistdistributor();
      if(redlistEntity.length !== 0)
      {
        return redlistEntity;
      }
    }
    catch(error)
    {
      if (error instanceof NotanyRedlistedDributor){
        return { message: 'There is not any RedListed Ditributor.' };
      }
    }

  }
  else
  {
    return { message: 'You are a Unauthorized User' };

  }
} 



@Get('/redlistedindustry')
@UseGuards(SessionGuard)
async RedlistedIndustry(@Session() session): Promise<RedListEntity[]| { message: string }> { 
  const user = session.user;
  if(user.role=="Admin")
  {
    try {
      const redlistEntity = await this.redlistservice.redlistIndustry();
      if(redlistEntity.length !== 0)
      {
        return redlistEntity;
      }
    }
    catch(error)
    {
      if (error instanceof NotanyRedlistedIndustry){
        return { message: 'There is not any RedListed Industry.' };
      }
    }

  }
  else
  {
    return { message: 'You are a Unauthorized User' };

  }
}


@Get('/verificationrequests')
@UseGuards(SessionGuard)
async Verificationrequests(@Session() session): Promise<VerificationEntity[]| { message: string }> 
{
  const user = session.user;
  if(user.role=="Admin")
  {
    try {
      const verificationrequests = await this.verificationservice.seeverificationrequests();
      if(verificationrequests.length !== 0)
      {
        return verificationrequests;
      }
    }
    catch(error)
    {
      if (error instanceof NotanyVerificationRequests){
        return { message: 'There is no Requests for Verification' };
      }
    }

  }
  else
  {
    return { message: 'You are a Unauthorized User' };

  }
}





@Get('logout')
@UseGuards(SessionGuard)
async logout(@Session() session) {
  if (session.user) {
    // console.log('Session:', session);
    // console.log('User:', session.user);
        //delete session.user;
    session.destroy();
    return { message: 'Logout successful' };
    // if (!session.user) {
    //   return { message: 'Logout successful' };
    // } else {
    //   return { message: 'Failed to logout' };
    // }
  } else {
    return { message: 'No user in the session' };
  }
}

  
  @Get('viewprofile')
  @UseGuards(SessionGuard)
  async viewprofile(@Session() session): Promise<ProfileEntity>  {
    const user = session.user;
    if (user)
    {
      if (user.role === 'Admin')
      {
        const res = await this.profileservice.viewprofile(user.uid);
        return res;
      }
    }
 
  }
 
  


@Patch('approveverificationforindustryanddistributor')
@UseGuards(SessionGuard)
async approveverificationindustryanddistributor(@Body(new ValidationPipe()) verificationInfo:VerificationIndustryandDistributorDTO, @Session() session): Promise<VerificationEntity | { message: string } | { success: boolean }> {
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const verified = await this.verificationservice.verficationindustryanddistributor(verificationInfo, id);
      return verified;
    }
  } catch (error) {
    console.error(error);

    if (error instanceof PhonenumberExistsforUpdate) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  }

}


@Put('/updateadminprofile')
@UseGuards(SessionGuard)
async updateadminprofile(@Body((new ValidationPipe()))ProfileInfo:UpdateAdminDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;
  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const updateadmininfo = await this.profileservice.updateAdminInfo(ProfileInfo, id);
      return updateadmininfo;
    }
  } catch (error) {
    console.error(error);

    if (error instanceof ProfiledoesnotExistsError) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  }

}



@Get('/getallindustry')
@UseGuards(SessionGuard)
async getalldistributor(@Session() session): Promise<ProfileEntity[] | { message: string } | { success: boolean }>{
  const user = session.user;
  if (user) {
    if (user.role === 'Admin') {
      try {
        const profiles = await this.profileservice.ViewallIndustryname();
      
        return profiles;
      
      } catch (error) {
        if (error instanceof NoIndustryFound) {
          return { success: false, message: 'There is no Industry' };
        }
      }
    }
  }
}






@Get('/getalldistributor')
@UseGuards(SessionGuard)
async getallindustry(@Session() session): Promise<ProfileEntity[] | { message: string } | { success: boolean }>{
  const user = session.user;
  if (user) {
    if (user.role === 'Admin') {
      try {
        const profiles = await this.profileservice.ViewallDistributor();
      
        return profiles;
      
      } catch (error) {
        if (error instanceof NoDistributorFound) {
          return { success: false, message: 'There is no Distributor' };
        }
      }
    }
  }
}






@Delete('/redlistdistributor') 
@UseGuards(SessionGuard)
async removeDistributorfromRedList(@Body()serialnumber:number, @Session() session): Promise<{ message: string } | { success: boolean }>{ 
  const user = session.user;
  if (user) {
    if (user.role === 'Admin') {
      try {
        const result = await this.redlistservice.RemoveDistributorFromRedlist(serialnumber);

        return {message: result};

      } catch (error) {
        if (error instanceof NoRedListDistributoroftheNumberError) {
          return { success: false, message: 'The Distributor is not Present in the Redlist' };
        }
      }
    }
  }
} 



@Delete('/redlistindustry') 
@UseGuards(SessionGuard)
async removeIndustryfromRedList(@Body()serialnumber:number, @Session() session): Promise<{ message: string } | { success: boolean }>{ 
  const user = session.user;
  if (user) {
    if (user.role === 'Admin') {
      try {
        const result = await this.redlistservice.RemoveIndustryFromRedlist(serialnumber);

        return {message: result};

      } catch (error) {
        if (error instanceof NoRedListDistributoroftheNumberError) {
          return { success: false, message: 'The Industry is not Present in the Redlist' };
        }
      }
    }
  }
} 


@Get("/seeprofilebyid")
@UseGuards(SessionGuard)
async getProfileById(@Session() session): Promise<ProfileEntity>{
  const user = session.user;
  if (user) {
    if (user.role === 'Admin')
    {
      const id = user.uid;
      const result = await this.profileservice.getProfileById(id);
      return result;
    }
}
}


@Patch('updatename')
@UseGuards(SessionGuard)
async updatename(@Body((new ValidationPipe()))name:UpdateNameDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatename(name, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}




@Patch('/updateaddress')
@UseGuards(SessionGuard)
async updateaddress(@Body((new ValidationPipe()))address, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updateaddress(address, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}

@Patch('/updatephonenumber')
@UseGuards(SessionGuard)
async updatephonenumber(@Body((new ValidationPipe()))phonenumber:UpdatePhoneDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatephonenumber(phonenumber, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}



@Patch('/updatepassword')
@UseGuards(SessionGuard)
async updatepassword(@Body((new ValidationPipe()))password:UpdatepasswordDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatepassword(password, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}





}
