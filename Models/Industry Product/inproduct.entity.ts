import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProfileEntity } from '../All Profile/profile.entity';

@Entity("Industry_Product")
export class InProductEntity{

  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  industry_name: string;

  @Column()
  product_name: string;

  @Column()
  product_quantity: number

  @ManyToOne(() => ProfileEntity, profile => profile.inproduct)
    profile: ProfileEntity;

}