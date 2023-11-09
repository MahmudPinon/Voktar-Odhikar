import { Body, Controller, Get, Param, Query, Post, Put,Delete, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, ParseIntPipe, Res, Session, NotFoundException, UnauthorizedException, UnprocessableEntityException, UseGuards, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";
import { Login, ProfileDTO } from 'src/Models/All Profile/profile.dto';
import { ProfileEntity } from 'src/Models/All Profile/profile.entity';
import { ProfileService } from 'src/Models/All Profile/profile.service';
import { VerificationDTO } from 'src/Models/Verification/verification.dto';
import { NotanyRedlistedIndustry } from 'src/Models/Red Lists/redlist.error';
import { VerificationService } from 'src/Models/Verification/verification.service';
import { ProfiledoesnotExistsError } from 'src/Models/Verification/verification.errors';
import { SessionGuardDis } from './SessionDisGaurd.gaurd';
import session from 'express-session';
import { RedListDTO } from 'src/Models/Red Lists/redlist.dto';
import { RedListService } from 'src/Models/Red Lists/redlist.service';
import { Router } from 'express';
import { DisAddProductDto, DisProductDTO, updateProductQuantity } from 'src/Models/Distributor Product/disproduct.dto';
import { DisProductEntity } from 'src/Models/Distributor Product/disproduct.entity';
import { DisProductService } from 'src/Models/Distributor Product/disproduct.service';
import { productAlreadyExist, productNotaAddedExist } from 'src/Models/Distributor Product/disproduct.error';


@Controller("users/distributor")
export class DistributorController {
  constructor(private readonly profileservice: ProfileService,
    private readonly verificationservice: VerificationService,
    private readonly redlistservice: RedListService,
    private readonly distributorservice: DisProductService,
    ) {}

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

  // @Put('/updateshopname')
  // updateName(@Body() mybody:DistributorInfo): DistributorInfo {
  //   let dist:DistributorInfo = {
  //     disId:"d1011",
  //     disName:mybody.disName,
  //     username:"khan",
  //     password:"1234",
  //     region:"khilkhet",
  //     email:"a@mail.com"
  //   };
  //   return dist;
  // }

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
  // @Post('discreateaccount')
  // @UsePipes(new ValidationPipe())
  // createDistributorAccount(@Body() mybody:DistributorInfo): DistributorInfo{
  //   let dist:DistributorInfo = {
  //     disId:"D-20200-1",
  //     disName:mybody.disName,
  //     username:mybody.username,
  //     password:mybody.password,
  //     region:mybody.region,
  //     email:mybody.email
  //   };
  //   return dist;
  // }

  // @Get('totalProduct/:tot')
  // getTotal(@Param('tot', ParseIntPipe) totalPro: number) {
  //     return totalPro;
  // }

  // @Post('uploadLiscence')
  // @UseInterceptors(FileInterceptor('file',
  // { fileFilter: (req, file, cb) => {
  //   if(file.originalname.match(/^.*\.(pdf)$/))
  //     cb(null, true);
  //   else {
  //   cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
  //   }
  // },
  // limits: { fileSize: 3000000 },
  //   storage:diskStorage({
  //   destination: './uploads',
  //   filename: function (req, file, cb) {
  //     cb(null,Date.now()+file.originalname)
  //   },
  // })
  // }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  // @Get('/showLiscence/:name')
  // getImages(@Param('name') name, @Res() res) {
  //   res.sendFile(name,{ root: './uploads' })  
  // }

  // @Post('productList')
  // @UsePipes(new ValidationPipe())
  // updateProductList(@Body() product:DistributorProductList): DistributorProductList{
  //   let count:number = 0;
  //   for(const a in product.disProducts){
  //     count += 1;
  //   }
  //   let prod:DistributorProductList = {
  //     disProducts:product.disProducts,
  //     totProduct:count
  //   }
  //   return prod;
  // }
  
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: Login, @Session() session): Promise<ProfileEntity | { message: string }> {
    const user = await this.profileservice.getUserLoginInfoByEmail(data.email);

    if (user != null) {
      const res = await this.profileservice.login(data.password, user.password);

      if (res) {
        if (user.role === 'Distributor') {
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

  @Post('addDistributor')
  @UsePipes(new ValidationPipe())
  async addDis(@Body() disInfo: ProfileDTO) {
    const { license_number, phone_number, email } = disInfo;

    if (!(await this.profileservice.isProfileUnique(license_number, phone_number, email))) {
      throw new UnprocessableEntityException('Profile with the same license number, phone, or email already exists.');
    }
    const result = await this.profileservice.addDistributor(disInfo);
    return result;
  }

  @Get('checkDisVerification')
  @UseGuards(SessionGuardDis)
  async checkDisVerification(@Session() session): Promise<VerificationDTO| { message: string }> { 
    const user = session.user;

    if(user.role==="Distributor")
    {
      
      try {
        
        const verified = await this.verificationservice.checkVerificationDis(user.name)
        
        if(verified){
          
          return { message: 'Your license is verified'};
        }
        else{
          return { message: 'Your license is not verified'};
        }
      }
      catch(error)
      {
        if (error instanceof ProfiledoesnotExistsError){
          return { message: 'No verification License given' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get('checkDisRedList')
  @UseGuards(SessionGuardDis)
  async checkDisRedlist(@Session() session): Promise<RedListDTO| { message: string }> { 
    const user = session.user;

    if(user.role==="Distributor")
    {
      
      try {
        
        const redlisted = await this.redlistservice.checkDis(user.name)
        
        if(redlisted){
          
          return { message: 'You are red listed'};
        }
        else{
          return { message: 'You are not red listed'};
        }
      }
      catch(error)
      {
        if (error instanceof ProfiledoesnotExistsError){
          return { message: 'Invalid Request' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Post("addProduct")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async addProduct(@Body() product: DisAddProductDto, @Session() session): Promise<DisProductEntity | { message: string }>{
    const user = session.user;
    
    const pro: DisProductDTO = {
          distributor_name : session.user.name,
          product_name : product.product_name,
          product_quantity : product.product_quantity,
          distributor_price : product.distributor_price
    };
    if(user.role==="Distributor")
    {
      try {
        
        const productver = await this.distributorservice.addDistributorProductInfo(pro,session)
        console.log(productver)
        if(productver){
          
          return { message: 'Product Added to inventory'};
        }
        else{
          return { message: 'Product not Added to inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
        if(error instanceof productAlreadyExist){
          return { message: 'This product already exist' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get("viewinventory")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewinventory(@Session() session): Promise<DisProductEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const products = await this.distributorservice.showDistributorProducts(session.user.name)
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Patch("updateproductquantity")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async updateProductQuantity(@Body() product: DisAddProductDto, @Session() session): Promise<DisProductEntity | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const productver = await this.distributorservice.updateProductQuantity(product,session)
        console.log(productver)
        if(productver){
          
          return { message: 'Product updated in inventory'};
        }
        else{
          return { message: 'Product not updated in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product found in inventory with such name' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  

 




}
    


