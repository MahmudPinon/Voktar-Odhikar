import { Module } from '@nestjs/common';
import { IndustryController } from './industry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from '../../Models/All Profile/profile.service';
import { ProfileEntity } from '../../Models/All Profile/profile.entity';
import { InProductEntity } from '../../Models/Industry Product/inproduct.entity';
import { InProductService } from '../../Models/Industry Product/inproduct.service';
import { DelquantityEntity } from '../../Models/Delivered Quantity/delquantity.entity';
import { DelquantityService } from '../../Models/Delivered Quantity/delquantity.service';
import { DisProductEntity } from '../../Models/Distributor Product/disproduct.entity';
import { DisProductService } from '../../Models/Distributor Product/disproduct.service';
import { RequestProEntity } from '../../Models/Request Amount/requestpro.entity';
import { RequestProService } from '../../Models/Request Amount/reqproduct.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ProfileEntity, InProductEntity, DelquantityEntity, DisProductEntity, RequestProEntity]),],
  controllers: [IndustryController],
  providers: [ProfileService, InProductService, DelquantityService, DisProductService, RequestProService
  ],
})
export class IndustryModule {}
