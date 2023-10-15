import { Controller, Get, Param, Query, Body, Post, Delete, Put, UseInterceptors, UploadedFile, UsePipes, ValidationPipe} 
from '@nestjs/common';
/* import { FileInterceptor } from '@nestjs/common'; 
import { MulterError, diskStorage } from "multer"; */
import { IndustryService } from './industry.service';
import { IndustryInfo, IndustryInfo1 } from './industry.dto'; 

@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}


  @Post('/getindustryData')
  @UsePipes(new ValidationPipe())
  getIndustryData(@Body()myobject: IndustryInfo): IndustryInfo {
    let dist: IndustryInfo = {
      id: myobject.id,
      name: myobject.name,
      email: myobject.email,
  /*    LiecenseNum: myobject.LiecenseNum, */
      distributor_number: myobject.distributor_number,
      dob: myobject.dob

    };
    return dist
  }


  @Post('addindustry')
  @UsePipes(new ValidationPipe())
  addIndustry(@Body() industryInfo:IndustryInfo1){
    return this.industryService.addIndustry(industryInfo);
  }

  




/*
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/searchuserbyId/:id')
  searchuserById(@Param('id') ind_ID: number): string {
    return "Industry ID: "+ ind_ID;
  }
  
  @Get('/searchuserbyName/:name')
  searchuserByname(@Param('name') ind_Name: string): string {
    return "Industry Name: "+ ind_Name;
  }
  
  @Get('/searchByFullName')
  searchByFullName(@Body()myobject: IndustryInfo): object {
    return {"First Name: ": myobject.first_name, "Last Name: ": myobject.last_name};
  }

  @Get('/getindustrySellPrice')
  getIndustrySellPrice(@Body()myobject: IndustryInfo): object {
    return {"Industry Sell price: ": myobject.price};
  }

  @Get('/getindustryUnit')
  getIndustryUnit(@Body()myobject: IndustryInfo): object {
    return {"Industry Unit: ": myobject.unit};
  }

  @Get('/VerifyLiecense')
  VerifyLiecense(@Body()myobject: IndustryInfo): object {
    return {"Verified Liecense Number ": myobject.LiecenseNum};
  }

  @Get('/getindustryUnitandPrice')
  getIndustryUnitandPrice(@Body()myobject: IndustryInfo): object {
    return {"Industry Unit: ": myobject.unit, "Industry Sell price: ": myobject.price};
  }

  @Post('/reportToAdmin')
  reportToAdmin(@Body() myobject: IndustryInfo): object {
    return {"Report send By : ": myobject.name};
  }

  @Delete('/reportDelete')
  reportDelete(@Body() myobject: IndustryInfo): object {
    return {"Report ": myobject.name + " is deleted ."};
  }

  @Put('/fixedMRP')
  fixedMRP(@Body() myobject: IndustryInfo): object {
    return {"Fixed MRP form the product : ": myobject.price};
  }

  @Get('/searchIndustrybyLiecenseNum')
  searchIndustryByQuery(@Query() myquery: IndustryInfo): object {
    return {"License NUm": myquery};
  } */




}
