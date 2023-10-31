import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileEntity } from "./profile.entity";
import { Repository } from "typeorm";
import { ProfileDTO } from "./profile.dto";
import { InProductEntity } from "../Industry Product/inproduct.entity";

@Injectable()
export class ProfileService{
  constructor(
    @InjectRepository(ProfileEntity) private profileRepo: Repository<ProfileEntity>,
    @InjectRepository(InProductEntity) private productRepo: Repository<InProductEntity>,
  ){}


  async addIndustry(profileInfo:ProfileDTO):Promise<ProfileEntity[]>
  {
   const res = await this.profileRepo.save(profileInfo);
   return this.profileRepo.find();
  }

  
  
  
  
  /*
  
  async createProductInfo(uid: number, product: ProductEntity): Promise<ProductEntity> {

    
   const profile = await  this.productRepo.find(
    {
     where:
         {uid:uid}
  
    }
   );
 
      return this.productRepo.save(profile);
     
   }
    
   
   const profile = await this.profileRepo.findOneBy(uid);
    product.profile = profile;
    return this.productRepo.save(product); 
    } */

}