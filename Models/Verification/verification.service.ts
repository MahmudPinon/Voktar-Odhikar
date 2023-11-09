import { ConflictException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { VerificationEntity } from './verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationDTO, VerificationDisDTO, VerificationIndustryandDistributorDTO } from './verification.dto';
import { ProfileService } from '../All Profile/profile.service';
import { LicenseNumberExistsError, AuthorizationError, ProfileMismatchError,ProfileAlreadyVerifiedError,NotanyVerificationRequests,ProfiledoesnotExistsError, } from './verification.errors';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(VerificationEntity) 
    private verificationRepo: Repository<VerificationEntity>,
    private readonly profileService: ProfileService
  ) {}




  // async addVerification(verificationInfo: VerificationDTO): Promise<VerificationEntity> {
  //   // Check for duplicate entry
  //   const existingVerification = await this.verificationRepo.findOne({
  //     where: { license_number: verificationInfo.license_number },
  //   });

  //   if (existingVerification) {
  //     throw new Error('License number already exists.');
  //   }

  //   const res = await this.verificationRepo.save(verificationInfo);
  //   return res;
  // }

  async getProfileByName(query: { name: string }): Promise<VerificationEntity> {
    const profile = await this.verificationRepo.findOne({
      where: query as FindOneOptions<VerificationEntity>['where'],
    });
  
    if (profile && profile.verified === 'Yes') {
      // The profile with the specified name exists and is verified.
      return profile;
    } else {
      // The profile with the specified name does not exist or is not verified.
      return null;
    }
  }
  
  
  async addVerification(verificationInfo: VerificationDTO): Promise<VerificationEntity> {
    try {
      // Check for duplicate entry
      const existingVerificationYes = await this.verificationRepo.findOne({
        where: { license_number: verificationInfo.license_number,verified: 'Yes' },
      });
      if (existingVerificationYes) {
        throw new ProfileAlreadyVerifiedError();
      }
  
      const existingVerification = await this.verificationRepo.findOne({
        where: { license_number: verificationInfo.license_number },
      });
  

      if (existingVerification) {
        throw new LicenseNumberExistsError();
      }
  
      const profile = await this.profileService.getProfileByUserIdAndLicenseNumber(
        verificationInfo.id,
        verificationInfo.license_number
      );
  
      if (!profile) {
        throw new ProfileMismatchError();
      }
  
      const newVerification = new VerificationEntity();
      newVerification.license_number = verificationInfo.license_number;
      newVerification.file_location_name = verificationInfo.file_location_name;
      newVerification.verified = verificationInfo.verified;
      newVerification.all_profile = profile;
  
      const res = await this.verificationRepo.save(newVerification);
      return res;
    } catch (error) {
      console.error('Error adding verification:', error);
  
      throw error;
    }
  }
  
  async seeverificationrequests(): Promise<VerificationEntity[]>
  {
    try {
      const existingVerificationnull = await this.verificationRepo.find({
        where: {verified: null },
      });
      if (existingVerificationnull.length===0) {
        throw new NotanyVerificationRequests();
      }
      else
      {
        return existingVerificationnull;
      }
    }
    catch (error) {
      console.error('Error returning verification requests:', error);
  
      throw error;
    }
  }
  



  async verficationindustryanddistributor(verificationInfo: VerificationIndustryandDistributorDTO,id:number): Promise<VerificationEntity>
  {
    try {
      const seeindustryanddistributor1 = await this.verificationRepo.find({
        where: {license_number: verificationInfo.license_number,
               verified: 'Yes'  },
      });
      if (seeindustryanddistributor1) {
        throw new ProfileAlreadyVerifiedError();
      }

      const seeindustryanddistributor2 = await this.verificationRepo.find({
        where: {license_number: verificationInfo.license_number,
               verified: null   },
      });
      if (!seeindustryanddistributor2) {
        throw new ProfiledoesnotExistsError();
      }
       
      const profile = await this.profileService.getProfileById(id);


      if (!seeindustryanddistributor1 && seeindustryanddistributor2)
      {
        const newVerificationindustryanddistributor = new VerificationEntity();
        newVerificationindustryanddistributor.all_profile=profile;
        newVerificationindustryanddistributor.verified=verificationInfo.verified;
        newVerificationindustryanddistributor.license_number=verificationInfo.license_number;

        const res=await  this.verificationRepo.update(verificationInfo.license_number,newVerificationindustryanddistributor);
        return this.verificationRepo.findOne({where: {
            license_number: verificationInfo.license_number,
          },
        })
      }

  }
    catch (error) {
      console.error('Error returning verification requests:', error);

      throw error;
    }
  }

  async checkVerificationDis(query: { name: string }): Promise<VerificationEntity> {
    const dis = await this.profileService.getProfileByName(query)
   
    const profile = await this.verificationRepo.findOne({
      where: { license_number: dis.license_number,verified: 'Yes' },
    });
    
    if (profile && profile.verified === 'Yes') {
      // The profile with the specified name exists and is verified.
      return profile;
    } else {
      
      // The profile with the specified name does not exist or is not verified.
      return null;
    }
  }

  async addVerificationDis(verificationInfo: VerificationDisDTO,id:number): Promise<VerificationEntity> {
    try {
      // Check for duplicate entry
      const existingVerificationYes = await this.verificationRepo.findOne({
        where: { license_number: verificationInfo.license_number,verified: 'Yes' },
      });
      if (existingVerificationYes) {
        throw new ProfileAlreadyVerifiedError();
      }
  
      const existingVerification = await this.verificationRepo.findOne({
        where: { license_number: verificationInfo.license_number },
      });
  

      if (existingVerification) {
        throw new LicenseNumberExistsError();
      }
  
      const profile = await this.profileService.getProfileByUserIdAndLicenseNumberDis(
        id,
        verificationInfo.license_number
      );
        console.log("Pro: ",profile);
      if (!profile) {
        throw new ProfileMismatchError();
      }
  
      const newVerification = new VerificationEntity();
      newVerification.license_number = verificationInfo.license_number;
      newVerification.file_location_name = verificationInfo.file_location_name;
      newVerification.verified = "No";
      newVerification.all_profile = profile;
  
      const res = await this.verificationRepo.save(newVerification);
      return res;
    } catch (error) {
      console.error('Error adding verification:', error);
  
      throw error;
    }
  }

  
}