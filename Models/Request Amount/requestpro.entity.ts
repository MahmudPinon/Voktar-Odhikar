import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { ProfileEntity } from '../All Profile/profile.entity';

@Entity("Request_Amount")
export class RequestProEntity{

  @PrimaryGeneratedColumn()
  request_id: number;

  @Column()
  industry_name: string;

  @Column()
  product_name: string;

  @Column()
  distributor_name: string;

  @Column()
  requested_quantity: number

  @Column()
  delivered_quantity: number

  @ManyToMany(() => ProfileEntity, profile => profile.requestpro)
    profile: ProfileEntity[];

}