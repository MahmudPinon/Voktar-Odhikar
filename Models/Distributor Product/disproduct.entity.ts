import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProfileEntity } from '../All Profile/profile.entity';

@Entity("Distributor_Product")
export class DisProductEntity{

  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  distributor_name: string;

  @Column()
  product_name: string;

  @Column()
  product_quantity: number

  @Column()
  distributor_price: number

  @ManyToOne(() => ProfileEntity, profile => profile.disproduct)
    profile: ProfileEntity;

}