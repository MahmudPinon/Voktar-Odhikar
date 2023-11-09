import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProfileEntity } from '../All Profile/profile.entity';

@Entity("Delivered_Quantity")
export class DelquantityEntity{

  @PrimaryGeneratedColumn()
  del_id: number;

  @Column()
  distributor_name: string;

  @Column()
  product_name: string;

  @Column()
  delivered_quantity: number

  @ManyToOne(() => ProfileEntity, profile => profile.delquantity)
    profile: ProfileEntity;

}