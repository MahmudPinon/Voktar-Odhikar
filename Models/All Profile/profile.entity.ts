import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { InProductEntity } from '../Industry Product/inproduct.entity';
import { DelquantityEntity } from '../Delivered Quantity/delquantity.entity';
import { DisProductEntity } from '../Distributor Product/disproduct.entity';
import { RequestProEntity } from '../Request Amount/requestpro.entity';

@Entity("All_Profile")
export class ProfileEntity{

  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  license_number: string;

  @Column()
  phone_number: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  region: string;

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