import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { ProfileEntity } from "../All Profile/profile.entity";

@Entity('Verification')
export class  VerificationEntity{

  @PrimaryColumn({unique:true})
  license_number: string;

  @Column()
  file_location_name:string;

  @Column()
  verified: string;
  
  @ManyToOne(() => ProfileEntity, all_profile => all_profile.verification)
  all_profile: ProfileEntity;
}
