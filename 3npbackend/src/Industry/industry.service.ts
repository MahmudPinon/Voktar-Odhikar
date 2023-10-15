import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndustryEntity } from './industry.entity';
import { Repository } from 'typeorm';
import { IndustryInfo, IndustryInfo1 } from './industry.dto';



@Injectable()
export class IndustryService {
  constructor(
    @InjectRepository(IndustryEntity) 
    private industryRepo: Repository<IndustryEntity>
  )
  {}

  async addIndustry(industryInfo:IndustryInfo1):Promise<IndustryEntity[]>
  {
   const res = await this.industryRepo.save(industryInfo);
   return this.industryRepo.find();
  }
}


