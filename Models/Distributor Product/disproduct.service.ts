import { Injectable, Session } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DisProductEntity } from "./disproduct.entity";
import { Repository } from "typeorm";
import { DisProductDTO } from "./disproduct.dto";
import session from "express-session";
import { productAlreadyExist, productNotaAddedExist, productUpdateFailed } from "./disproduct.error";

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

  async addDistributorProductInfo(productinfo,@Session() session):Promise<DisProductEntity|{message: ""}>
  {
    productinfo.profile = session.user
    console.log(productinfo)
    const isproduct = await this.productRepo.find({where: {
        product_name: productinfo.product_name,
      },
    });
    console.log(isproduct)
    if(isproduct.length!==0){
      throw new productAlreadyExist();
    }
    const res = await this.productRepo.save(productinfo);
    console.log("res: ",res)
    return res;
  }

  async showDistributorProducts(name):Promise<DisProductEntity[]|null>
  {
    const res = await this.productRepo.find({where: {
        distributor_name: name,
      },
    });
    return res;
  }

  async updateProductQuantity(product,@Session() session):Promise<DisProductEntity|null>
  {
    let pro =  await this.productRepo.findOne({where: {
        product_name: product.product_name,
      },
      });
    if(!pro){
      throw new productNotaAddedExist()
    }
    const res = await this.productRepo.update(pro.product_id,product);
    if(res){
      const updatedproduct = await this.productRepo.findOne({where: {
          product_name: product.name,
        },
      });
      return updatedproduct;
    }
    else{
      throw new productUpdateFailed()
    }
    
  }



}