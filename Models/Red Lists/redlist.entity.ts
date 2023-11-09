import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { ProfileEntity } from "../All Profile/profile.entity";


@Entity('Red_List')
export class RedListEntity {
 

  @PrimaryGeneratedColumn()
  redlistedserialnumber:number

  @Column()
  name:string;

  @Column()
  issuer: string;

  @Column()
  reason: string;

  @Column()
  role:string;

  @ManyToOne(() => ProfileEntity, all_profile => all_profile.redlist)
  all_profile: ProfileEntity;


}
