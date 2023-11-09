import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InProductEntity } from "./inproduct.entity";
import { Repository } from "typeorm";
import { InProductDTO } from "./inproduct.dto";

@Injectable()
export class InProductService{
  constructor(
    @InjectRepository(InProductEntity) private productRepo: Repository<InProductEntity>,
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

}