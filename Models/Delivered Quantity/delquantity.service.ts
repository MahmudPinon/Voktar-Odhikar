import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DelquantityEntity } from "./delquantity.entity";
import { Repository } from "typeorm";
import { DelqunantityDTO } from "./delquantity.dto";

@Injectable()
export class DelquantityService{
  constructor(
    @InjectRepository(DelquantityEntity) private delquantityRepo: Repository<DelquantityEntity>,
  ){}

  
  async addDeliveredQuantity(delquantityInfo)
  {
  //  const res = await this.productRepo.save(delquantityInfo);
    return this.delquantityRepo.save(delquantityInfo);
  }

  

}