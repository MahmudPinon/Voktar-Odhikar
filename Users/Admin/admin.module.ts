import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProfileService } from '../../Models/All Profile/profile.service';
import { VerificationService } from '../../Models/Verification/verification.service';
import { RedListService } from '../../Models/Red Lists/redlist.service';
import { ReportandNoticeService } from '../../Models/Report and Notice/reportandnotice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../../Models/All Profile/profile.entity';
import { VerificationEntity } from '../../Models/Verification/verification.entity';
import { RedListEntity } from '../../Models/Red Lists/redlist.entity';

import { ReportandNoticeEntity } from '../../Models/Report and Notice/reportandnotice.entity';
import { InProductEntity } from '../../Models/Industry Product/inproduct.entity';
import { InProductService } from '../../Models/Industry Product/inproduct.service';
import { DelquantityEntity } from '../../Models/Delivered Quantity/delquantity.entity';
import { DelquantityService } from '../../Models/Delivered Quantity/delquantity.service';
import { DisProductEntity } from '../../Models/Distributor Product/disproduct.entity';
import { DisProductService } from '../../Models/Distributor Product/disproduct.service';
import { RequestProEntity } from '../../Models/Request Amount/requestpro.entity';
import { RequestProService } from '../../Models/Request Amount/reqproduct.service';

@Module({
  imports: 
  [TypeOrmModule.forFeature([ProfileEntity,VerificationEntity,RedListEntity,ReportandNoticeEntity,InProductEntity,DelquantityEntity
  ,DisProductEntity,RequestProEntity])],
  controllers: [AdminController],
  providers: [RedListService,ProfileService,VerificationService,RedListService,ReportandNoticeService,InProductService,DelquantityService,DisProductService,RequestProService],
})


export class AdminModule {}
