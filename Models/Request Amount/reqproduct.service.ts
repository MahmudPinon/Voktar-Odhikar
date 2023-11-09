import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestProEntity } from "./requestpro.entity";
import { Repository } from "typeorm";
import { RequestProDTO } from "./requestpro.dto";
import { ProfileEntity } from "../All Profile/profile.entity";

@Injectable()
export class RequestProService{
  constructor(
    @InjectRepository(RequestProEntity) private productRepo: Repository<RequestProEntity>,
    @InjectRepository(ProfileEntity) private reqRepo: Repository<ProfileEntity>
  ){}

  
 /* async addIndustry(profileInfo:ProductDTO):Promise<ProductEntity[]>
  {
   const res = await this.productRepo.save(profileInfo);
   return this.productRepo.find();
  } */

  async addrequestAmount(productinfo)
  {
   // const res = await this.productRepo.save(Productdto);
    return this.productRepo.save(productinfo);
  }

}