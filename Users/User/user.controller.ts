import { Controller, Res,Get,Param,Query,Body,Post,Put,Delete,UsePipes, UploadedFile, UseInterceptors, Patch, UnprocessableEntityException, UseFilters, UseGuards, NotFoundException, UnauthorizedException, Session, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { ProfileService } from '../../Models/All Profile/profile.service';
import { VerificationService } from '../../Models/Verification/verification.service';
import { RedListService } from '../../Models/Red Lists/redlist.service';
import { ReportandNoticeService } from '../../Models/Report and Notice/reportandnotice.service';
import { Login, UpdateAdminDTO, UpdateIndsutryPhoneDTO, UpdateIndustryDTO, UpdateNameDTO, UpdatePhoneDTO, UpdateUserDTO, UpdateUserPhoneDTO, UpdatepasswordDTO } from "../../Models/All Profile/profile.dto";
import { ProfileDTO} from '../../Models/All Profile/profile.dto';
import { Request } from 'express';
import { ReportandNoticeDTO, ReportandNoticeDisDTO, ReportandNoticePostDisDTO, ReportandNoticePostUserDTO, ReportandNoticeUserDTO} from '../../Models/Report and Notice/reportandnotice.dto';
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
import { RedListDTO } from 'src/Models/Red Lists/redlist.dto';
import { DisProductDTO, ViewProductPriceDTO } from 'src/Models/Distributor Product/disproduct.dto';
import { DisProductEntity } from 'src/Models/Distributor Product/disproduct.entity';


@Controller("users/user")
  export class UserController {
  myModuleService: any;
  DisProductService: any;
  constructor(
    private readonly profileservice: ProfileService,
    private readonly verificationservice: VerificationService,
    private readonly redlistservice: RedListService,
    private readonly industryproservice: InProductService,
    private readonly viewreqbydis: RequestProService,
    private readonly reqproductservice: RequestProService,
    private readonly reportandnoticeservice: ReportandNoticeService) {}


// add industry account in All_Profile table
@Post('addUser')
async addUser(@Body((new ValidationPipe())) userInfo: ProfileDTO) {
  const { license_number, phone_number, email } = userInfo;

  if (!(await this.profileservice.isProfileUnique(license_number, phone_number, email))) {
    throw new UnprocessableEntityException('Profile with the same license number, phone or email already exists.');
  }
  const result = await this.profileservice.addUserU(userInfo);
  return result;
}


@Post('login')
@UsePipes(new ValidationPipe())
async login(@Body() data: Login, @Session() session): Promise<ProfileEntity | { message: string }> {
  const user = await this.profileservice.getUserLoginInfoByEmail(data.email);

  if (user != null) {
    const res = await this.profileservice.login(data.password, user.password);

    if (res) {
      if (user.role === 'User') {
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

@Get('viewprofile')
  @UseGuards(SessionGuard)
  async viewprofileU(@Session() session): Promise<ProfileEntity>  {
    const user = session.user;
    if (user)
    {
      if (user.role === 'User')
      {
        const res = await this.profileservice.viewprofileU(user.uid);
        return res;
      }
    }
 
  }

  @Patch('updateuserphonenumber')
  @UseGuards(SessionGuard)
  async updatephonenumberU(@Body((new ValidationPipe()))phonenumber:UpdateUserPhoneDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
    const user = session.user;
  
    try {
      if (!session) {
        throw new UnauthorizedException("User is not authorized");
      } else {
        const user = session.user;
        const id = user.uid;
        const profile = await this.profileservice.updatephonenumberU(phonenumber, id);
        return profile;
      }
    } catch (error) {
      console.error(error);
  
      if (error) {
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  }

  @Patch('updateuserpassword')
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
        const profile = await this.profileservice.updatepasswordU(password, id);
        return profile;
      }
    } catch (error) {
      console.error(error);
  
      if (error) {
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  }

@Delete('deleteuserprofile')
@UseGuards(SessionGuard)
async deleteUserProfile(@Session() session): Promise<{ message: string } | { success: boolean }> {
  const user = session.user;
  if (user) {
    if (user.role === 'User') {
      try {
        const result = await this.profileservice.deleteUserProfile(user.uid);

        return { message: result };

      } catch (error) {
        if (error instanceof ProfiledoesnotExistsError) {
          return { success: false, message: 'User profile does not exist' };
        } else {
          return error;
        }
      }
    }
  }
}

  @Patch('updateusername')
  @UseGuards(SessionGuard)
  async updatenameU(@Body((new ValidationPipe()))name:UpdateNameDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
    const user = session.user;
    try {
      if (!user) {
        throw new UnauthorizedException("User is not authorized");
      } else {
        const user = session.user;
        const id = user.uid;
        console.log(id);
        console.log(user);
        const profile = await this.profileservice.updatenameU(name, id);
        return profile;
      }
    } catch (error) {
      console.error(error);

      if (error) {
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  }


  @Patch('updateuseraddress')
  @UseGuards(SessionGuard)
  async updateaddressU(@Body((new ValidationPipe()))address, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
    const user = session.user;
    try {
      if (!session) {
        throw new UnauthorizedException("User is not authorized");
      } else {
        const user = session.user;
        const id = user.uid;
        const profile = await this.profileservice.updateaddressU(address, id);
        return profile;
      }
    } catch (error) {
      console.error(error);
      if (error) {
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  }

  @Put('updateuserprofile')
  @UseGuards(SessionGuard)
  async updateuserprofileU(@Body((new ValidationPipe()))ProfileInfo:UpdateUserDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
    const user = session.user;
    try {
      if (!session) {
        throw new UnauthorizedException("User is not authorized");
      } else {
        const user = session.user;
        const id = user.uid;
        const updateuserinfo = await this.profileservice.updateUserInfoU(ProfileInfo, id);
        return updateuserinfo;
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


  @Post('reportadmin')
  @UseGuards(SessionGuard)
  async reportAdmin(@Body((new ValidationPipe()))notice:ReportandNoticePostUserDTO, @Session() session): Promise<ReportandNoticeEntity | { message: string } | { success: boolean } | {error:string}>{
    const user = session.user;
    try {
      if (user.role!=="User") {
        throw new UnauthorizedException("User is not authorized");
      } else {
        const sendnotice:ReportandNoticeUserDTO={
          name:user.name,
          reporterrole:user.role,
          receiver:notice.receiver,
          reportornotice:notice.reportornotice,
          type:notice.type
        }
        const profile = await this.reportandnoticeservice.noticeandreportUser(sendnotice,session.user.uid)
        return profile;
      }
    } catch (error) {
      console.error(error);
      if (error) {
        return { success: false, message: "An unexpected error occurred." };
      }
    }
  }
  @Get('viewproductprice')
  async viewProductPrice(@Body() productId): Promise<number | { message: string }> {
    try {
      console.log(productId);
      const price = await this.DisProductService.getProductPriceById(productId);
      console.log(price);
      return price;
    } catch (error) {
      return { message: error.message };
    }
  }
  

  @Get('viewdistributorproducts/:distributorName')
  async viewDistributorProducts(@Session() session, @Param('distributorName') distributorName: string): Promise<DisProductEntity[] | { message: string }> {
    try {
      const products = await this.DisProductService.getDistributorProducts(distributorName);
      return products;
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get('viewmyareaadmin')
  async viewMyAreaAdmin(@Session() session): Promise<ProfileEntity[] | { message: string }> {
    try {
      const admins = await this.profileservice.getAreaAdminsByRegion(session.user.region);
      return admins;
    } catch (error) {
      return { message: error.message };
    }
  }
  @Get('viewmyareadistributor')
  async viewMyAreaDistributor(@Session() session): Promise<ProfileEntity[] | { message: string }> {
    try {
      const distributors = await this.profileservice.getAreaDistributorsByRegion(session.user.region);
      return distributors;
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get('viewareawiseproducts')
  async viewAreaWiseProducts(@Session() session): Promise<DisProductDTO[] | { message: string }> {
    try {
      const region = session.user.region;
      const distributorName = await this.profileservice.getDistributorNameByRegion(region);

      if (!distributorName) {
        throw new Error(`No distributor found for region ${region}`);
      }

      const products = await this.DisProductService.getProductsByDistributor(distributorName);
      return products;
    } catch (error) {
      return { message: error.message };
    }
  }


  @Get('checkredlistedindustry')
  @UseGuards(SessionGuard)
  async RedlistedindustryU(@Session() session): Promise<RedListEntity[]| { message: string }> { 
    const user = session.user;
    if(user.role=="User")
    {
      try {
        const redlistEntity = await this.redlistservice.redlisteindustryU();
        if(redlistEntity.length !== 0)
        {
          return redlistEntity;
        }
        else{
          return { message: 'There is not any RedListed Industry.'};
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
  @Get('checkredlisteddistributor')
  @UseGuards(SessionGuard)
  async RedlisteddistributorU(@Session() session): Promise<RedListEntity[]| { message: string }> { 
    const user = session.user;
    if(user.role=="User")
    {
      try {
        const redlistEntity = await this.redlistservice.redlistedistributorU();
        if(redlistEntity.length !== 0)
        {
          return redlistEntity;
        }
        else{
          return { message: 'There is not any RedListed Industry.'};
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






































  }
