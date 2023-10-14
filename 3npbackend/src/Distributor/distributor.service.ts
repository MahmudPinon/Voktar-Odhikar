import { Injectable } from '@nestjs/common';
import { DistributorEntity } from './distributor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DisInfo } from './distributor.dto';

@Injectable()
export class distributorService {
  constructor(
    @InjectRepository(DistributorEntity) 
    private disRepo: Repository<DistributorEntity>
  )
  {}

  async addDis(disinfo:DisInfo):Promise<DistributorEntity[]>
  {
   const res = await this.disRepo.save(disinfo);
   return this.disRepo.find();
  }
}
