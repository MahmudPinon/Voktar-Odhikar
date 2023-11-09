import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { VerificationEntity } from "../Verification/verification.entity";
import { RedListEntity } from "../Red Lists/redlist.entity";
import { ReportandNoticeEntity } from "../Report and Notice/reportandnotice.entity";
import { DelquantityEntity } from "../Delivered Quantity/delquantity.entity";
import { InProductEntity } from "../Industry Product/inproduct.entity";
import { DisProductEntity } from "../Distributor Product/disproduct.entity";
import { RequestProEntity } from "../Request Amount/requestpro.entity";


@Entity('All_Profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name:string;

  @Column({unique:true})
  email: string;

  @Column()
  address: string;

  @Column({unique:true})
  license_number: string;

  @Column({unique:true})
  phone_number: string;

  @Column()
  role:string;

  @Column()
  password: string;

  @Column()
  region: string;
 
  
  @OneToMany(() => VerificationEntity, verification => verification.all_profile, { cascade: true })
  verification: VerificationEntity[];

  @OneToMany(() => RedListEntity, redlist => redlist.all_profile, { cascade: true })
  redlist: RedListEntity[];

  
  @ManyToMany(() => ReportandNoticeEntity, reportandnotice => reportandnotice.all_profile)
  reportandnotice: ReportandNoticeEntity[];



  @OneToMany(() => InProductEntity, inproduct => inproduct.profile,  { cascade: true })
  inproduct: InProductEntity[];

  @OneToMany(() => DelquantityEntity, delquantity => delquantity.profile,  { cascade: true })
  delquantity: InProductEntity[];

  @OneToMany(() => DisProductEntity, disproduct => disproduct.profile,  { cascade: true })
  disproduct: InProductEntity[];

  @ManyToMany(() => RequestProEntity, requestpro => requestpro.profile)
  @JoinTable()
  requestpro: RequestProEntity[];


  
}
