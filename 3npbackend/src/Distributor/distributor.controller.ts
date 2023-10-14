import { Body, Controller, Get, Param, Query, Post, Put,Delete, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, ParseIntPipe, Res } from '@nestjs/common';
import { distributorService } from './distributor.service';
import { DisInfo, DistributorInfo, DistributorProductList } from './distributor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";

@Controller("distributor")
export class distributorController {
  constructor(private readonly distributorService: distributorService) {}

  // @Get('/searchbyid/:disid')
  // searchUserBy(@Param('disid') userId:string): DistributorInfo {
  //   let dist:DistributorInfo = {
  //     disId:userId,
  //     disShopName:"Joyco",
  //     username:"Joy",
  //     password:"1234",
  //     address:"kuratoli"
  //   };
  //   return dist;
  // }

  // @Get('/searchbystore/:store')
  // searchByStore(@Param('store') shopName:string): DistributorInfo {
  //   let dist:DistributorInfo = {
  //     disId:"D1011",
  //     disShopName:shopName,
  //     username:"Joy",
  //     password:"1234",
  //     address:"kuratoli"
  //   };
  //   return dist;
  // }


  // @Get('/searchdisissuer')
  // searchDisIssuer(@Query() Issuer:DistributorIssuer): DistributorIssuer {
  //   let disIs:DistributorIssuer = {
  //     disFirstName:Issuer.disFirstName,
  //     disLastName:Issuer.disLastName,
  //     disIssuerNid:"19912123123"
  //   }
  //   return disIs;
  // }


  // @Post('/createdis')
  // createDistributor(@Body() mybody:DistributorInfo): DistributorInfo {
  //   let dist:DistributorInfo = {
  //     disId:"d1011",
  //     disShopName:mybody.disShopName,
  //     username:mybody.username,
  //     password:mybody.password,
  //     address:mybody.address
  //   };
  //   return dist;
  // }

  @Put('/updateshopname')
  updateName(@Body() mybody:DistributorInfo): DistributorInfo {
    let dist:DistributorInfo = {
      disId:"d1011",
      disName:mybody.disName,
      username:"khan",
      password:"1234",
      region:"khilkhet",
      email:"a@mail.com"
    };
    return dist;
  }

  // @Delete('/deleteproduct')
  // deleteMrp(@Body() mybody:DistributorProduct): DistributorProduct {
  //   let disProduct:DistributorProduct={
  //     disSellMrp:0,
  //     disSellUnit:0,
  //     disUnitName:"kg",
  //     disProductName:mybody.disProductName
  //   }
  //   return disProduct;
  // }

  // @Post('/currproducttotal')
  // currProductTotal(@Body() mybody:DistributorProductTotal): DistributorProductTotal {
  //   let prodtot:DistributorProductTotal = {
  //     disProductTotalUnit:2,
  //     disProductTotalPrice:211,
  //     disProductName:mybody.disProductName
  //   };
  //   return prodtot;
  // }
  @Post('discreateaccount')
  @UsePipes(new ValidationPipe())
  createDistributorAccount(@Body() mybody:DistributorInfo): DistributorInfo{
    let dist:DistributorInfo = {
      disId:"D-20200-1",
      disName:mybody.disName,
      username:mybody.username,
      password:mybody.password,
      region:mybody.region,
      email:mybody.email
    };
    return dist;
  }

  @Get('totalProduct/:tot')
  getTotal(@Param('tot', ParseIntPipe) totalPro: number) {
      return totalPro;
  }

  @Post('uploadLiscence')
  @UseInterceptors(FileInterceptor('file',
  { fileFilter: (req, file, cb) => {
    if(file.originalname.match(/^.*\.(pdf)$/))
      cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
    }
  },
  limits: { fileSize: 3000000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    },
  })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/showLiscence/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name,{ root: './uploads' })  
  }

  @Post('productList')
  @UsePipes(new ValidationPipe())
  updateProductList(@Body() product:DistributorProductList): DistributorProductList{
    let count:number = 0;
    for(const a in product.disProducts){
      count += 1;
    }
    let prod:DistributorProductList = {
      disProducts:product.disProducts,
      totProduct:count
    }
    return prod;
  }

  @Post('adddis')
  @UsePipes(new ValidationPipe())
  addDis(@Body() disinfo:DisInfo){
    return this.distributorService.addDis(disinfo);
  }



}
    


