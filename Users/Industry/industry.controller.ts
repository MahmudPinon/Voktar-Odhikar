import { Controller, Get, Patch, Param, Body, Post, Delete, Put, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, Res} 
from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer"; 
import { ProfileService } from "../../Models/All Profile/profile.service";
import { InProductService } from "../../Models/Industry Product/inproduct.service";
import { ProfileDTO } from '../../Models/All Profile/profile.dto';
import { InProductDTO } from '../../Models/Industry Product/inproduct.dto';
import { DelquantityService } from '../../Models/Delivered Quantity/delquantity.service';
import { DisProductService } from '../../Models/Distributor Product/disproduct.service';
import { RequestProService } from '../../Models/Request Amount/reqproduct.service';

@Controller('users/industry')
export class IndustryController {
  constructor(
    private readonly profileService: ProfileService, 
    private readonly productService: InProductService,
    private readonly delquantityService: DelquantityService,
    private readonly distributorService: DisProductService,
    private readonly requestProService: RequestProService
    )
  {}



  @Post('addIndustry')
  @UsePipes(new ValidationPipe())
    addIndustry(@Body() profiledto: ProfileDTO): any {
      return this.profileService.addIndustry(profiledto);
    }


  @Post('/addIndustryProductInfo')
    addIndustryProductInfo(@Body() productInfo)
    {
      return this.productService.addIndustryProductInfo(productInfo);
    }

    @Post('/addDeliveredQuantity')
    addDeliveredQuantity(@Body() delquantityInfo)
    {
      return this.delquantityService.addDeliveredQuantity(delquantityInfo);
    }

    @Post('/addDistributorProductInfo')
    addDistributorProductInfo(@Body() productInfo)
    {
      return this.distributorService.addDistributorProductInfo(productInfo);
    }

    @Post('/addrequestAmount')
    addrequestAmount(@Body() productInfo)
    {
      return this.requestProService.addrequestAmount(productInfo);
    }
    

/*
  @Post('/getindustryData')
  @UsePipes(new ValidationPipe())
  getIndustryData(@Body()myobject: IndustryInfo): IndustryInfo {
    let dist: IndustryInfo = {
      id: myobject.id,
      name: myobject.name,
      email: myobject.email,
      distributor_number: myobject.distributor_number,
      dob: myobject.dob

    };
    return dist
  }


  @Post('upload')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file',
  { fileFilter: (req, file, cb) => {
  if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
   cb(null, true);
  else {
   cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
   }
  },
  limits: { fileSize: 30000 },
  storage:diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
  }
  ))


addIndustry(@Body() industryInfo:IndustryInfo2, @UploadedFile()  myfile: Express.Multer.File) {
  industryInfo.filename = myfile.filename;
return this.industryService.addIndustry(industryInfo);
}

@Get('allInfo')
  getIndex() {
    return this.industryService.getAll();
    
  }

 @Put('/update/:id')
  updateIndustry(@Param('id') id:number, @Body() industryInfo:IndustryInfo2)
  {
    return this.industryService.updateIndustry(id,industryInfo);
  }

  @Patch('/updateSingleInfo/:id')
  patchIndustry(@Param('id') id:number, @Body() industryInfo:IndustryInfo2)
  {
    return this.industryService.patchIndustry(id,industryInfo);
  }

@Get('/searchuserby/:id')
searchUserBy(@Param('id') userID:number): Promise<IndustryEntity> {
return this.industryService.getUserByID(userID);
}



@Get('/getimage/:name')
 getImages(@Param('name') name:string, @Res() res) {
 res.sendFile(name,{ root: './upload' })
 }

 @Delete('/deleteInfo/:id')
 deleteInfo(@Param('id') id:number)
  {
    return this.industryService.deleteInfo(id);
  }
  




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
