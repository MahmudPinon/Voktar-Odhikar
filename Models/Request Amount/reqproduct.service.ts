import { Injectable, Session } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestProEntity } from "./requestpro.entity";
import { Repository } from "typeorm";
import { RequestProDTO, RequestProDisDTO } from "./requestpro.dto";
import { ProfileEntity } from "../All Profile/profile.entity";
import { NoRequestAvailable } from "./reqproduct.error";

@Injectable()
export class RequestProService{
  constructor(
    @InjectRepository(RequestProEntity) private productRepo: Repository<RequestProEntity>,
    @InjectRepository(ProfileEntity) private profileRepo: Repository<ProfileEntity>
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

  async addrequestAmountDis(requestpro:RequestProDisDTO,@Session() session):Promise<RequestProEntity|null>
  {
   // const res = await this.productRepo.save(Productdto);
   try{
      const isindustry = await this.profileRepo.findOne({where: {
          name:requestpro.industry_name,
        },
      })
      const req:RequestProDTO={
        industry_name:requestpro.industry_name,
        distributor_name:session.user.name,
        requested_quantity:requestpro.requested_quantity,
        product_name: requestpro.product_name,
        delivered_quantity: 0
        
      };

      try{
        const res = await this.productRepo.save(req)
        return res;
      }
      catch(error){
        console.log(error)
      }


    }
    catch(error){
      console.log(error)
    }
   }

   async viewProRequestIND(name: string) {

    // Fetch data from the table where industry_name matches the provided name
    const res = await this.productRepo.find({
      where: { industry_name: name },
      select: [
        'request_id',
        'industry_name',
        'product_name',
        'distributor_name',
        'requested_quantity',
        'delivered_quantity',
      ],
    });

  if(res.length === 0)
  {
    throw new NoRequestAvailable();
  }
  else
  {
    return res;
  }   
}
    

}