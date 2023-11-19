import { Injectable, Session } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDTO, UpdateAdminDTO, UpdateDisDTO, UpdateIndsutryPhoneDTO, UpdateIndustryDTO, UpdateNameDTO, UpdatePhoneDTO, UpdateRegionDisDTO, UpdateUserDTO, UpdateUserPhoneDTO, UpdatepasswordDTO } from './profile.dto';
import * as bcrypt from 'bcrypt';
import { NoDistributorFound, NoIndustryFound, PhonenumberExistsforUpdate } from './profile.error';
import { ProfiledoesnotExistsError } from '../Verification/verification.errors';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity) 
    private profileRepo: Repository<ProfileEntity>
  ) {}

  async isProfileUnique(licenseNumber: string, phone: string, email: string): Promise<boolean> {
    const existingProfile = await this.profileRepo.findOne({
      where: [
        { license_number: licenseNumber },
        { phone_number: phone },
        { email: email },
      ],
    });
  
    return !existingProfile;
  }
  

async getProfileById(id:number):Promise<ProfileEntity>
{
  const profile = await this.profileRepo.findOne({ where: { uid : id } });
  return profile;
}

async getProfileByName(query: { name: string }): Promise<ProfileEntity> {
  const profile =  this.profileRepo.findOne({where: {
    name: query.name,
  },
})
  return profile;
}



async updateAdminInfo(ProfileInfo:UpdateAdminDTO,id:number):Promise<ProfileEntity>
{
  const password = ProfileInfo.password;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  ProfileInfo.password = hashedPassword;
  
  const seephonenumberunique = await this.profileRepo.find({
    where: {phone_number: ProfileInfo.phone_number,
            uid: Not(id),},
  });

  if (seephonenumberunique) {
    throw new PhonenumberExistsforUpdate();
  }
  

  const res=await  this.profileRepo.update(id,ProfileInfo);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })

}




async ViewallIndustryname()
{

  const profiles = await this.profileRepo.find({
    where: {
      role: 'Industry',
    },
    select: ['name', 'email', 'phone_number', 'region'],
  });
  if(profiles.length===0)
  {
    throw new NoIndustryFound();
  }
  else
  {
    return profiles;
  }

  // const names = profiles.map(profile => profile.name);
  // return names

}



async ViewallDistributor()
{

  const profiles = await this.profileRepo.find({
    where: {
      role: 'Distributor',
    },
    select: ['name', 'email', 'phone_number', 'region'],
  });
  
  if(profiles.length===0)
  {
    throw new NoDistributorFound();
  }
  else
  {
    return profiles;
  }
  // const names = profiles.map(profile => profile.name);
  // return names
 
}




  
  async addAdmin(adminInfo:ProfileDTO):Promise<ProfileEntity>
  {
    const { license_number, phone_number, email } = adminInfo;
  
    if (!(await this.isProfileUnique(license_number, phone_number, email))) {
      throw new Error('Profile with the same license number, phone, or email already exists.');
    }
    const password = adminInfo.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    adminInfo.password = hashedPassword;
    //const res = await this.profileRepo.save(adminInfo);
    //return this.profileRepo.find();
    return this.profileRepo.save(adminInfo);
  }


  getUserLoginInfoByEmail(email: string): Promise<ProfileEntity> {
    return this.profileRepo.findOneBy({ email: email })
  }

  async login(inputPassword: string, userPassword: string): Promise<boolean> {
    const match: boolean = await bcrypt.compare(inputPassword, userPassword);
    if (match) {
      return true
    }
    return false
  }
  
  async viewprofile(uid: number): Promise<ProfileEntity | null> {
    const profile = await this.profileRepo.findOne({ where: { uid } });

    return profile || null;
  }
  
  
  async getProfileByUserIdAndLicenseNumber(userId: number, licenseNumber: string): Promise<ProfileEntity | null> {
    const profile = await this.profileRepo
      .createQueryBuilder('profile')
      .where('profile.uid = :userId', { userId })
      .andWhere('profile.license_number = :licenseNumber', { licenseNumber })
      .getOne();

    return profile || null;
  }


async updatename(name:UpdateNameDTO,id:number): Promise<ProfileEntity | null>
{
  const res=await  this.profileRepo.update(id,name);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })
}


async updateaddress(address,id:number): Promise<ProfileEntity | null>
{
  const res=await  this.profileRepo.update(id,address);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })
}


async updatephonenumber(phone_number:UpdatePhoneDTO,id:number): Promise<ProfileEntity | null>
{

  const seephonenumberunique = await this.profileRepo.find({
    where: {phone_number: phone_number.phone_number,
            uid: Not(id),},
  });

  if (seephonenumberunique.length!==0) {
    throw new PhonenumberExistsforUpdate();
  }
  else
  {
    const res=await  this.profileRepo.update(id,phone_number);
    return this.profileRepo.findOne({where: {
        uid: id,
      },
    })
  }
  }


  async updatepassword(pass:UpdatepasswordDTO,id:number): Promise<ProfileEntity | null>
  {
    const password = pass.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    pass.password=hashedPassword;
    const res=await  this.profileRepo.update(id,pass);
    return this.profileRepo.findOne({where: {
        uid: id,
      },
    })
  }

  async addDistributor(disInfo:ProfileDTO):Promise<ProfileEntity>
  {
    const { license_number, phone_number, email } = disInfo;
  
    if (!(await this.isProfileUnique(license_number, phone_number, email))) {
      throw new Error('Profile with the same license number, phone, or email already exists.');
    }
    const password = disInfo.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    disInfo.password = hashedPassword;
    return this.profileRepo.save(disInfo);
  }

  async updateDisInfo(ProfileInfo:UpdateDisDTO,id:number):Promise<ProfileEntity>
{
  const password = ProfileInfo.password;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  ProfileInfo.password = hashedPassword;
  console.log(id)
  const seephonenumberunique = await this.profileRepo.findOne({
    where: {phone_number: ProfileInfo.phone_number,
            uid: Not(id),},
  });
  console.log(seephonenumberunique)
  if (seephonenumberunique) {
    throw new PhonenumberExistsforUpdate();
  }
  

  const res=await  this.profileRepo.update(id,ProfileInfo);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })

}

async getProfileByUserIdAndLicenseNumberDis(userId: number, licenseNumber: string): Promise<ProfileEntity | null> {
  const profile = await this.profileRepo.findOne({where: {
        uid: userId, license_number:licenseNumber
      },
    })

  if(profile){
    return profile
  }
  return  null;
}

async ViewallIndustrynameDis(@Session() session)
{

  const profiles = await this.profileRepo.find({
    where: {
      role: 'Industry',region: session.user.region
    },
    select: ['name', 'email', 'phone_number', 'region'],
  });
  if(profiles.length===0)
  {
    throw new NoIndustryFound();
  }
  else
  {
    return profiles;
  }

  // const names = profiles.map(profile => profile.name);
  // return names

}

async UpdateRegionDis(region:UpdateRegionDisDTO,id:number): Promise<ProfileEntity | null>
{


  
    const res=await  this.profileRepo.update(id,region);
    return this.profileRepo.findOne({where: {
        uid: id,
      },
    })
}

async addIndustryIND(industryInfo:ProfileDTO):Promise<ProfileEntity>
  {
    const { license_number, phone_number, email } = industryInfo;
  
    if (!(await this.isProfileUnique(license_number, phone_number, email))) {
      throw new Error('Profile with the same license number, phone, or email already exists.');
    }
    const password = industryInfo.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    industryInfo.password = hashedPassword;
    //const res = await this.profileRepo.save(adminInfo);
    //return this.profileRepo.find();
    return this.profileRepo.save(industryInfo);
  }

  async ViewallDistributorNameIND()
  {
  
    const profiles = await this.profileRepo.find({
      where: {
        role: 'Distributor',
      },
      select: ['name', 'email', 'phone_number', 'region'],
    });
    
    if(profiles.length===0)
    {
      throw new NoDistributorFound();
    }
    else
    {
      return profiles;
    }
  }


  async ViewallIndustryNameIND()
  {
  
    const profiles = await this.profileRepo.find({
      where: {
        role: 'Industry',
      },
      select: ['name', 'email', 'phone_number', 'region'],
    });
    
    if(profiles.length===0)
    {
      throw new NoDistributorFound();
    }
    else
    {
      return profiles;
    }
    // const names = profiles.map(profile => profile.name);
    // return names
   
  }

  async viewprofileIND(uid: number): Promise<ProfileEntity | null> {
    const profile = await this.profileRepo.findOne({ where: { uid } });

    return profile || null;
  }

  async updatenameIND(name:UpdateNameDTO,id:number): Promise<ProfileEntity | null>
{
  const res=await  this.profileRepo.update(id,name);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })
}

async updateaddressIND(address,id:number): Promise<ProfileEntity | null>
{
  const res=await  this.profileRepo.update(id,address);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })
}


async updateIndustryInfoIND(ProfileInfo:UpdateIndustryDTO,id:number):Promise<ProfileEntity>
{ 
  const seephonenumberunique = await this.profileRepo.find({
    where: {phone_number: ProfileInfo.phone_number,
            uid: Not(id),},
  });

  if (seephonenumberunique.length !== 0) {
    throw new PhonenumberExistsforUpdate();
  }
  

  const res=await  this.profileRepo.update(id,ProfileInfo);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })

}

async updatephonenumberIND(phone_number:UpdateIndsutryPhoneDTO,id:number): Promise<ProfileEntity | null>
{

  const seeunique = await this.profileRepo.find({
    where: {phone_number: phone_number.phone_number,
            uid: Not(id),},
  });

  if (seeunique.length!==0) {
    throw new PhonenumberExistsforUpdate();
  }
  else
  {
    const res=await  this.profileRepo.update(id,phone_number);
    return this.profileRepo.findOne({where: {
        uid: id,
      },
    })
  }
}

async updatepasswordIND(pass:UpdatepasswordDTO,id:number): Promise<ProfileEntity | null>
  {
    const password = pass.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    pass.password=hashedPassword;
    const res=await  this.profileRepo.update(id,pass);
    return this.profileRepo.findOne({where: {
        uid: id,
      },
    })
  }


  async getprofilebyidIND(uid:number):Promise<ProfileEntity>
{
  const profile = await this.profileRepo.findOne({ where: { uid } });
  return profile;
}


async getProfileByUserIdAndLicenseNumberIND(userId: number, licenseNumber: string): Promise<ProfileEntity | null> {
  const profile = await this.profileRepo.findOne({where: {
        uid: userId, license_number:licenseNumber
      },
    })

  if(profile){
    return profile
  }
  return  null;
}







//user

async addUserU(userInfo:ProfileDTO):Promise<ProfileEntity>
{
  const { license_number, phone_number, email } = userInfo;

  if (!(await this.isProfileUnique(license_number, phone_number, email))) {
    throw new Error('Profile with the same license number, phone, or email already exists.');
  }
  const password = userInfo.password;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  userInfo.password = hashedPassword;
  //const res = await this.profileRepo.save(adminInfo);
  //return this.profileRepo.find();
  return this.profileRepo.save(userInfo);
}
async viewprofileU(uid: number): Promise<ProfileEntity | null> {
  const profile = await this.profileRepo.findOne({ where: { uid } });

  return profile || null;
}


async updatephonenumberU(phone_number:UpdateUserPhoneDTO,id:number): Promise<ProfileEntity | null>
{

  const seeunique = await this.profileRepo.find({
    where: {phone_number: phone_number.phone_number,
            uid: Not(id),},
  });

  if (seeunique.length!==0) {
    throw new PhonenumberExistsforUpdate();
  }
  else
  {
    const res=await  this.profileRepo.update(id,phone_number);
    return this.profileRepo.findOne({where: {
        uid: id,
      },
    })
  }
}

async updatenameU(name:UpdateNameDTO,id:number): Promise<ProfileEntity | null>
{
  const res=await  this.profileRepo.update(id,name);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })
}

async updateaddressU(address,id:number): Promise<ProfileEntity | null>
{
  const res=await  this.profileRepo.update(id,address);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })
}

async updateUserInfoU(ProfileInfo:UpdateUserDTO,id:number):Promise<ProfileEntity>
{ 
  const seephonenumberunique = await this.profileRepo.find({
    where: {phone_number: ProfileInfo.phone_number,
            uid: Not(id),},
  });

  if (seephonenumberunique.length !== 0) {
    throw new PhonenumberExistsforUpdate();
  }
  

  const res=await  this.profileRepo.update(id,ProfileInfo);
  return this.profileRepo.findOne({where: {
      uid: id,
    },
  })

}

async updatepasswordU(pass:UpdatepasswordDTO,id:number): Promise<ProfileEntity | null>
  {
    const password = pass.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    pass.password=hashedPassword;
    const res=await  this.profileRepo.update(id,pass);
    return this.profileRepo.findOne({where: {
        uid: id,
      },
    })
  }

  async deleteUserProfile(id: number): Promise<string> {
    const existProfile = await this.profileRepo.findOne({
      where: { uid: id }
    });
    if (!existProfile) {
      throw new ProfiledoesnotExistsError();
    } else {
      const result = await this.profileRepo.delete({ uid: id });
      return `User profile with ID ${id} has been removed.`;
    }
  }

  async getAreaAdminsByRegion(userRegion: string): Promise<ProfileEntity[] | null> {
    try {
      const admins = await this.profileRepo.find({
        where: { role: 'Admin', region: userRegion },
      });

      return admins;
    } catch (error) {
      throw new Error(`Error retrieving Area Admins for region ${userRegion}: ${error.message}`);
    }
  }
  async getAreaDistributorsByRegion(userRegion: string): Promise<ProfileEntity[] | null> {
    try {
      const distributors = await this.profileRepo.find({
        where: { role: 'Distributor', region: userRegion },
      });

      return distributors;
    } catch (error) {
      throw new Error(`Error retrieving Area Distributors for region ${userRegion}: ${error.message}`);
    }
  }

  async getDistributorNameByRegion(region: string): Promise<string | null> {
    try {
      const distributor = await this.profileRepo.findOne({
        where: { role: 'Distributor', region },
      });

      return distributor ? distributor.name : null;
    } catch (error) {
      throw new Error(`Error retrieving distributor for region ${region}: ${error.message}`);
    }
  }



















}
