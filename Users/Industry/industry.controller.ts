import { Controller, Res,Get,Param,Query,Body,Post,Put,Delete,UsePipes, UploadedFile, UseInterceptors, Patch, UnprocessableEntityException, UseFilters, UseGuards, NotFoundException, UnauthorizedException, Session, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { ProfileService } from '../../Models/All Profile/profile.service';
import { VerificationService } from '../../Models/Verification/verification.service';
import { RedListService } from '../../Models/Red Lists/redlist.service';
import { ReportandNoticeService } from '../../Models/Report and Notice/reportandnotice.service';
import { Login, UpdateAdminDTO, UpdateIndsutryPhoneDTO, UpdateIndustryDTO, UpdateNameDTO, UpdatePhoneDTO, UpdatepasswordDTO } from "../../Models/All Profile/profile.dto";
import { ProfileDTO} from '../../Models/All Profile/profile.dto';
import { Request } from 'express';
import { ReportandNoticeDTO} from '../../Models/Report and Notice/reportandnotice.dto';
import { VerificationDTO, VerificationIndDTO, VerificationIndustryandDistributorDTO} from '../../Models/Verification/verification.dto';
import { ValidationPipe,ParseIntPipe } from '@nestjs/common/pipes';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
//import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileEntity } from '../../Models/All Profile/profile.entity';
import { VerificationEntity } from '../../Models/Verification/verification.entity';
import { RedListEntity} from '../../Models/Red Lists/redlist.entity';
import { ReportandNoticeEntity} from '../../Models/Report and Notice/reportandnotice.entity';
import { SessionGuard } from "./SessionIndustryGaurd.gaurd";
import { request } from 'express';
import session from 'express-session';
import {LicenseNumberExistsError,AuthorizationError,ProfileMismatchError,ProfileAlreadyVerifiedError, NotanyVerificationRequests,} from '../../Models/Verification/verification.errors';
import {ProfiledoesnotExistsError, ProfileAlreadyRedlistError,VerificationNotVerifiedError,NotanyRedlistedDributor, NotanyRedlistedIndustry, NoRedListDistributoroftheNumberError,} from '../../Models/Red Lists/redlist.error';
import {NoDistributorFound, NoIndustryFound, PhonenumberExistsforUpdate,} from '../../Models/All Profile/profile.error';
import { DeleteProductDTO, InProductDTO, addProductDTO } from '../../Models/Industry Product/inproduct.dto';
import { InProductService } from '../../Models/Industry Product/inproduct.service';
import { InProductEntity } from '../../Models/Industry Product/inproduct.entity';
import { RequestProEntity } from '../../Models/Request Amount/requestpro.entity';
import { RequestProService } from '../../Models/Request Amount/reqproduct.service';
import { NoProductNameError, productNotExist, productNotaAddedExist} from '../../Models/Industry Product/inproduct.error';


@Controller("users/industry")
  export class IndustryController {
  constructor(
    private readonly profileservice: ProfileService,
    private readonly verificationservice: VerificationService,
    private readonly redlistservice: RedListService,
    private readonly industryproservice: InProductService,
    private readonly viewreqbydis: RequestProService,
    private readonly reqproductservice: RequestProService,
    private readonly reportandnoticeservice: ReportandNoticeService) {}


// add industry account in All_Profile table 
@Post('addIndustry')
async addIndustryIND(@Body((new ValidationPipe())) industryInfo: ProfileDTO) {
  const { license_number, phone_number, email } = industryInfo;

  if (!(await this.profileservice.isProfileUnique(license_number, phone_number, email))) {
    throw new UnprocessableEntityException('Profile with the same license number, phone or email already exists.');
    // Exception error service
  }
  const result = await this.profileservice.addIndustryIND(industryInfo);
  return result;
}


@Post('login')
@UsePipes(new ValidationPipe())
async login(@Body() data: Login, @Session() session): Promise<ProfileEntity | { message: string }> {
  const user = await this.profileservice.getUserLoginInfoByEmail(data.email);

  if (user != null) {
    const res = await this.profileservice.login(data.password, user.password);

    if (res) {
      if (user.role === 'Industry') {
        session.user = user;
        return user;
      } else {
        throw new UnauthorizedException({ message: 'Unauthorized User' });
      }
    } else {
      throw new NotFoundException({ message: 'Wrong Email or Password' });
    }
  } else {
    throw new UnauthorizedException({ message: 'User is not authorized' });
  }
}


@Get('getalldistributor')
@UseGuards(SessionGuard)
async getalldistributorIND(@Session() session): Promise<ProfileEntity[] | { message: string } | { success: boolean }>{
  const user = session.user;
  if (user) {
    if (user.role === 'Industry') {
      try {
        const profiles = await this.profileservice.ViewallDistributorNameIND();
      
        return profiles;
      
      } catch (error) {
        if (error instanceof NoDistributorFound) {
          return { success: false, message: 'There is no Distributor' };
        }
      }
    }
  }
}

@Get('getallindustry')
@UseGuards(SessionGuard)
async getallindustryIND(@Session() session): Promise<ProfileEntity[] | { message: string } | { success: boolean }>{
  const user = session.user;
  if (user) {
    if (user.role === 'Industry') {
      try {
        const profiles = await this.profileservice.ViewallIndustryNameIND();
      
        return profiles;
      
      } catch (error) {
        if (error instanceof NoDistributorFound) {
          return { success: false, message: 'There is no Distributor' };
        }
      }
    }
  }
}


@Get('viewmyprofile')
  @UseGuards(SessionGuard)
  async viewprofileIND(@Session() session): Promise<ProfileEntity>  {
    const user = session.user;
    if (user)
    {
      if (user.role === 'Industry')
      {
        const res = await this.profileservice.viewprofileIND(user.uid);
        return res;
      }
    }
 
  }

  @Get('redlisteddistributors')
  @UseGuards(SessionGuard)
  async RedlisteddistributorIND(@Session() session): Promise<RedListEntity[]| { message: string }> { 
    const user = session.user;
    if(user.role=="Industry")
    {
      try {
        const redlistEntity = await this.redlistservice.redlistedistributorIND();
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


@Post('logout')
@UseGuards(SessionGuard)
async logout(@Session() session) {
  if (session.user) {
    session.destroy();
    return { message: 'Logout successful' };
  } else {
    return { message: 'No user in the session' };
  }
}


@Patch('updateindustryname')
@UseGuards(SessionGuard)
async updatenameIND(@Body((new ValidationPipe()))name:UpdateNameDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (user) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatenameIND(name, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}


@Patch('updateindustryaddress')
@UseGuards(SessionGuard)
async updateaddressIND(@Body((new ValidationPipe()))address, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updateaddressIND(address, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}


@Post('sendnoticeorreport')
@UseGuards(SessionGuard)
async noticeandreportIND(@Body(new ValidationPipe()) noticeandreportInfo: ReportandNoticeDTO, @Session() session): Promise<ReportandNoticeEntity| { message: string }|{success: boolean}> {
  try {
    if (!session) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    } else {
      const user = session.user;
      var id = user.uid;
      return await this.reportandnoticeservice.noticeandreportIND(noticeandreportInfo, id);
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

@Put('updateindustryprofile')
@UseGuards(SessionGuard)
async updateindustryprofileIND(@Body((new ValidationPipe()))ProfileInfo:UpdateIndustryDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;
  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const updateindustryinfo = await this.profileservice.updateIndustryInfoIND(ProfileInfo, id);
      return updateindustryinfo;
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


@Post('addIndustryProduct')
@UseGuards(SessionGuard)
async addIndustryProIND(@Body((new ValidationPipe()))industryProInfo:addProductDTO, @Session() session): Promise<InProductEntity | { message: string } | { success: boolean }>{
  const user = session.user;
    try {
      if (user) {
        throw new UnauthorizedException("User is not authorized");
      } else {
      //  industryProInfo.industry_name = user.name; // Replace 'industryName' with the actual property name in InProductDTO
   //     industryProInfo.profileUid = user.uid;
        const id = session.user.uid;
        const name = session.user.name;
 //     const id = user.uid;
        const industrypro = await this.industryproservice.addIndustryProIND(industryProInfo, id, name);
        return industrypro;
     }
   } catch (error) {
     console.error(error);

        return { success: false, message: "An unexpected error occurred." };
    }

  }


  @Get('viewallindustryproduct')
  @UseGuards(SessionGuard)
  async viewallindustryproductIND(@Session() session): Promise<InProductEntity[]| { message: string }> { 
    const user = session.user;
    if(user.role==="Industry")
    {
      try {
        const name = session.user.name;
        const allproducts = await this.industryproservice.viewallindustryproductIND(name);
        if(allproducts.length !== 0)
        {
          return allproducts;
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product available.' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  } 


  @Get('viewreqbydistributor') /// Not properly working
  @UseGuards(SessionGuard)
  async viewProRequestIND(@Session() session): Promise<RequestProEntity[] | { message: string } | { success: boolean }>{
    const user = session.user;
    if (user) {
      if (user.role === 'Industry') {
        try {
          const name = session.user.name;
          const viewreq = await this.viewreqbydis.viewProRequestIND(name);
           return viewreq;
        
        } catch (error) {
          if (error instanceof NoDistributorFound) {
            return { success: false, message: 'There is no Request' };
          }
        }
      }
    }
  }


  @Patch('updateindustryphonenumber')
  @UseGuards(SessionGuard)
  async updatephonenumberIND(@Body((new ValidationPipe()))phonenumber:UpdateIndsutryPhoneDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
    const user = session.user;
  
    try {
      if (!session) {
        throw new UnauthorizedException("User is not authorized");
      } else {
        const user = session.user;
        const id = user.uid;
        const profile = await this.profileservice.updatephonenumberIND(phonenumber, id);
        return profile;
      }
    } catch (error) {
      console.error(error);
  
      if (error) {
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  }


@Patch('updateIndustrypassword')
@UseGuards(SessionGuard)
async updatepassword(@Body((new ValidationPipe()))password:UpdatepasswordDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized1");
    }
    else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatepasswordIND(password, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}

@Get("seeprofilebyid")
@UseGuards(SessionGuard)
async getProfileById(@Session() session): Promise<ProfileEntity>{
  const user = session.user;
  if (user) {
    if (user.role === 'Industry')
    {
      const id = user.uid;
      const result = await this.profileservice.getprofilebyidIND(id);
      return result;
    }
}
}


@Get('redlistedindustry')
  @UseGuards(SessionGuard)
  async RedlistedindustryIND(@Session() session): Promise<RedListEntity[]| { message: string }> { 
    const user = session.user;
    if(user.role=="Industry")
    {
      try {
        const redlistEntity = await this.redlistservice.redlisteindustryIND();
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



  @Delete('deleteindproduct') 
  @UseGuards(SessionGuard)
  async deleteIndustryProductIND(@Body() productid, @Session() session): Promise<{ message: string } | { success: boolean }>{ 
    const user = session.user;
    if (user) {
      if (user.role === 'Industry') {
        try {
          const result = await this.industryproservice.deleteProductIND(productid.product_id);
  
          return {message: result};
  
        } catch (error) {
          if (error instanceof productNotExist) {
            return { success: false, message: 'This Product does not exist' };
          }
          else if (error.message === 'Invalid product ID') 
          {         return { success: false, message: 'Invalid product ID' };       }
          else
          {
            return error;
          }
        }
      }
    }
  } 

  @Post('/uplodlicenseInd')
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
    @Body() verificationInfo: VerificationIndDTO,
    @UploadedFile() myfile: Express.Multer.File,
    @Session() session
  ) {
    verificationInfo.file_location_name = myfile.filename;
  
    const user = session.user;
  
    if (user) {
      // Check if the user is an Admin
      if (user.role === 'Industry') {
        // Pass the user ID from the session to verificationInfo
  
        try {
          const result = await this.verificationservice.addVerificationInd(verificationInfo,session.user.id);
          return { success: true, message: 'License Uploaded Successfully' };
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





}