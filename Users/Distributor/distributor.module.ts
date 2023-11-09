import { Module } from '@nestjs/common';
import { DistributorController } from './distributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/Models/All Profile/profile.entity';
import { DelquantityEntity } from 'src/Models/Delivered Quantity/delquantity.entity';
import { DisProductEntity } from 'src/Models/Distributor Product/disproduct.entity';
import { InProductEntity } from 'src/Models/Industry Product/inproduct.entity';
import { RedListEntity } from 'src/Models/Red Lists/redlist.entity';
import { ReportandNoticeEntity } from 'src/Models/Report and Notice/reportandnotice.entity';
import { RequestProEntity } from 'src/Models/Request Amount/requestpro.entity';
import { VerificationEntity } from 'src/Models/Verification/verification.entity';
import { ProfileService } from 'src/Models/All Profile/profile.service';
import { DelquantityService } from 'src/Models/Delivered Quantity/delquantity.service';
import { DisProductService } from 'src/Models/Distributor Product/disproduct.service';
import { InProductService } from 'src/Models/Industry Product/inproduct.service';
import { RedListService } from 'src/Models/Red Lists/redlist.service';
import { ReportandNoticeService } from 'src/Models/Report and Notice/reportandnotice.service';
import { RequestProService } from 'src/Models/Request Amount/reqproduct.service';
import { VerificationService } from 'src/Models/Verification/verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity,VerificationEntity,RedListEntity,ReportandNoticeEntity,InProductEntity,DelquantityEntity
    ,DisProductEntity,RequestProEntity])],
  controllers: [DistributorController,],
  providers: [RedListService,ProfileService,VerificationService,RedListService,ReportandNoticeService,InProductService,DelquantityService,DisProductService,RequestProService],
})
export class DistributorModule {}
