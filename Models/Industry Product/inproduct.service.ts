import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InProductEntity } from "./inproduct.entity";
import { Repository } from "typeorm";
import { InProductDTO, addProductDTO } from "./inproduct.dto";
import { ProfileService } from "../All Profile/profile.service";
import { ProfileEntity } from "../All Profile/profile.entity";
import { productNotExist } from "./inproduct.error";

@Injectable()
export class InProductService{
  constructor(
    @InjectRepository(InProductEntity) private productRepo: Repository<InProductEntity>,
    private profileService: ProfileService,
  ){}

  
 /* async addIndustry(profileInfo:ProductDTO):Promise<ProductEntity[]>
  {
   const res = await this.productRepo.save(profileInfo);
   return this.productRepo.find();
  } */

  async addIndustryProductInfo(productinfo)
  {
   // const res = await this.productRepo.save(Productdto);
    return this.productRepo.save(productinfo);
  }

  async addIndustryProIND(industryProInfo: addProductDTO, id:number, name:string )
  {
    const res = new InProductEntity();
    const industry = await this.profileService.getProfileById(id);

    res.industry_name = name;
    res.profile = industry;
    res.product_name = industryProInfo.product_name;
    res.product_quantity = industryProInfo.product_quantity;
    res.industry_price = industryProInfo.industry_price;
    
    //    await this.productRepo.create(industryProInfo);

    return this.productRepo.save(res);
  }

  async viewallindustryproductIND(name):Promise<InProductEntity[]|null>
  {
    const res = await this.productRepo.find({where: {
        industry_name: name,
      },
    });
    return res;
  }


  async deleteProductIND(id: number):Promise<string>{
    const existid = await this.productRepo.findOne({
      where: { product_id: id }
    });
    if(!existid)
    {
      throw new productNotExist();
    }
    else
    {
  //    await this.inproductRepo.remove(existid);
  //   const result = await this.inproductRepo.delete({ product_id: parseInt(id.productid) });
    const result = await this.productRepo.delete({ product_id:id });
      return `Prodyuct with id ${id} has been removed.`;
    }
  }

}