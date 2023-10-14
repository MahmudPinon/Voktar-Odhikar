import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity("Distributor")
export class DistributorEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
}
