import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ProfileEntity } from "../All Profile/profile.entity";


@Entity('Report_and_notice_List')
export class ReportandNoticeEntity {
 

  @PrimaryGeneratedColumn()
  rreportandnoticeserialnumber:number

  @Column()
  reporterrole:string;

  @Column()
  name: string;

  @Column()
  reportornotice: string;

  @Column()
  receiver:string;

  @Column()
  type:string;

  @ManyToMany(() => ProfileEntity, all_profile => all_profile.reportandnotice)
  @JoinTable()
  all_profile: ProfileEntity[];



}
