import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReportandNoticeEntity } from './reportandnotice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportandNoticeDTO, ReportandNoticeDisDTO } from './reportandnotice.dto';
import { ProfileEntity } from "../All Profile/profile.entity";
import { ProfileService } from "../All Profile/profile.service";

@Injectable()
export class ReportandNoticeService {
  constructor(
    @InjectRepository(ReportandNoticeEntity) 
    private reportandnoticeRepo: Repository<ReportandNoticeEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
    private profileService: ProfileService,

  ) {}



  

    async noticeandreport(reportandnoticeInfo: ReportandNoticeDTO, id: number): Promise<ReportandNoticeEntity> {
    const reportOrNotice = this.reportandnoticeRepo.create(reportandnoticeInfo);
    const admin = await this.profileService.getProfileById(id);
    const existsindustryanddistributor = await this.profileService.getProfileByName({ name: reportandnoticeInfo.receiver });
    if (!existsindustryanddistributor) {
      throw new Error('Distributor and Industry with the specified name does not exist.');
    }
    else
    {
      reportOrNotice.name = admin.name; 
      reportOrNotice.reporterrole = admin.role; 
      const profileArray = [admin];
      reportOrNotice.all_profile = profileArray;
    
      await this.reportandnoticeRepo.save(reportOrNotice);
    
      return reportOrNotice; 
    }

   }

   async noticeandreportDis(reportandnoticeInfo: ReportandNoticeDisDTO, id: number): Promise<ReportandNoticeEntity|{error:string}> {
    const reportOrNotice = this.reportandnoticeRepo.create(reportandnoticeInfo);
    const distributor = await this.profileService.getProfileById(id);
    const existsindustryanddistributor = await this.profileService.getProfileByName({ name: reportandnoticeInfo.receiver });

    if (!existsindustryanddistributor || existsindustryanddistributor.role !== "Admin") {
      throw new Error('Admin with the specified name does not exist.');
    }
    else
    {
      reportOrNotice.name = distributor.name; 
      reportOrNotice.reporterrole = distributor.role; 
      const profileArray = [distributor];
      reportOrNotice.all_profile = profileArray;
    
      const res = await this.reportandnoticeRepo.save(reportOrNotice);
    
      return res; 
    }

   }

  

}
