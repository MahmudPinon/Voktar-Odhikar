import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RedListEntity } from './redlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedListDTO } from './redlist.dto';
import { ProfileService } from "../All Profile/profile.service";
import { ProfileEntity } from "../All Profile/profile.entity";
import { ProfiledoesnotExistsError, ProfileAlreadyRedlistError, VerificationNotVerifiedError,NotanyRedlistedDributor,NotanyRedlistedIndustry, NoRedListDistributoroftheNumberError, NoRedListIndustryoftheNumberError } from './redlist.error';
import { VerificationEntity } from '../Verification/verification.entity';
import { VerificationService } from '../Verification/verification.service';

@Injectable()
export class RedListService {
  constructor(
    @InjectRepository(RedListEntity) 
    private redListRepo: Repository<RedListEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    private profileService: ProfileService,
    @InjectRepository(VerificationEntity)
    private verificationRepo: Repository<VerificationEntity>,
    private VerificationService: VerificationService,
  ) {}


  async redlist(redlistInfo, id): Promise<RedListEntity> {
    const admin = await this.profileService.getProfileById(id);
    const existsIndustryAndDistributor = await this.profileService.getProfileByName({ name: redlistInfo.name });
  
    if (!existsIndustryAndDistributor) {
      throw new ProfiledoesnotExistsError();
    }
  
    const existingRedList = await this.redListRepo.findOne({
      where: { name: redlistInfo.name },
    });
  
    if (existingRedList) {
      throw new ProfileAlreadyRedlistError();
    }
    if(existsIndustryAndDistributor)
    {
      const existinginverified = await this.redListRepo.findOne({
        where: { name: redlistInfo.name },
      });
      if(!existinginverified)
      {
        throw new VerificationNotVerifiedError();
      }
    }
  
    const redlist = new RedListEntity();
    redlist.issuer = admin.role;
    redlist.all_profile = admin;
    redlist.name = redlistInfo.name;
    redlist.reason = redlistInfo.reason;
    redlist.role = redlistInfo.role;
    redlist.all_profile = admin;

    await this.redListRepo.save(redlist);
  
    return redlist;
  }


  async redlistdistributor():Promise<RedListEntity[]>{
    const redlistdistributor = await this.redListRepo.find({
      where: { role: "Distributor"},
    });
    if(redlistdistributor.length === 0)
  {
    throw new NotanyRedlistedDributor();
  }
  else
  {
    return redlistdistributor;
  }
  }
  
  async redlistIndustry():Promise<RedListEntity[]>{
    const redlistdistributor = await this.redListRepo.find({
      where: { role: "Industry" },
      select: ["name", "all_profile","issuer"]
    });
    if(redlistdistributor.length === 0)
  {
    throw new NotanyRedlistedIndustry();
  }
  else
  {
    return redlistdistributor;
  }
  }
  
  async RemoveDistributorFromRedlist(serialnumber:number):Promise<string>{
    const existingRedList = await this.redListRepo.findOne({
      where: { redlistedserialnumber: serialnumber},
    });
    if(!existingRedList)
    {
      throw new NoRedListDistributoroftheNumberError();
    }
    else
    {
      await this.redListRepo.remove(existingRedList);
      return `Red-list distributor with serial number ${serialnumber} has been removed.`;
    }
  }


  async RemoveIndustryFromRedlist(serialnumber:number):Promise<string>{
    const existingRedList = await this.redListRepo.findOne({
      where: { redlistedserialnumber: serialnumber},
    });
    if(!existingRedList)
    {
      throw new NoRedListIndustryoftheNumberError();
    }
    else
    {
      await this.redListRepo.remove(existingRedList);
      return `Red-list industry with serial number ${serialnumber} has been removed.`;
    }
  }

  async checkDis(name):Promise<RedListEntity|null>{
    const redlistdistributor = await this.redListRepo.findOne({
      where: { name: name},
    });
    if(!redlistdistributor)
  {
    return null;
  }
  else
  {
    return redlistdistributor;
  }
  }








}



