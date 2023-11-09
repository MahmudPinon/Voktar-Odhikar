import { Injectable, Session } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DelquantityEntity } from "./delquantity.entity";
import { Repository } from "typeorm";
import { DelqunantityDTO } from "./delquantity.dto";
import { ProfileEntity } from "../All Profile/profile.entity";
import { ProfileService } from "../All Profile/profile.service";
import { DisProductEntity } from "../Distributor Product/disproduct.entity";
import { DisProductService } from "../Distributor Product/disproduct.service";

@Injectable()
export class DelquantityService{
  constructor(
    @InjectRepository(DelquantityEntity) private delquantityRepo: Repository<DelquantityEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    private profileService: ProfileService,
    @InjectRepository(DisProductEntity) private productRepo: Repository<DisProductEntity>,private productservice: DisProductService
  ){}

  
  async addDeliveredQuantityDis(product,@Session() session)
  {
  //  const res = await this.productRepo.save(delquantityInfo);
    product.distributor_name = session.user.name
    product.profile = session.user

    try{
      const findProductIninventory = await  this.productRepo.findOne({where: {
        product_name: product.product_name,
      },
      });

      if(findProductIninventory){
        if(findProductIninventory.product_quantity>=product.delivered_quantity){
          try{
            const res = await this.delquantityRepo.save(product);
            try{
              findProductIninventory.product_quantity=findProductIninventory.product_quantity-product.delivered_quantity
              const updatedis = await this.productservice.updateProduct({product_name:product.product_name,product_quantity:findProductIninventory.product_quantity},session)
              return res
            }
            catch(error){
              console.log(error)
            }

          }
          catch(error){
            console.log(error)
          }
          
        }
        else{
          return {message : "Not enough stock"}
        }
      }
    }
    catch(error){
      console.log(error)
    }

    
  }

  

}