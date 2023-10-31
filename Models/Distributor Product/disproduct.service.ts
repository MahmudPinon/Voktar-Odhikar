import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DisProductEntity } from "./disproduct.entity";
import { Repository } from "typeorm";
import { DisProductDTO } from "./disproduct.dto";

@Injectable()
export class DisProductService{
  constructor(
    @InjectRepository(DisProductEntity) private productRepo: Repository<DisProductEntity>,
  ){}

  
 /* async addIndustry(profileInfo:ProductDTO):Promise<ProductEntity[]>
  {
   const res = await this.productRepo.save(profileInfo);
   return this.productRepo.find();
  } */

  async addDistributorProductInfo(productinfo)
  {
   // const res = await this.productRepo.save(Productdto);
    return this.productRepo.save(productinfo);
  }

}