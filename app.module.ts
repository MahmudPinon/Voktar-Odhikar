import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Users/Admin/admin.module';
import { DistributorModule } from './Users/Distributor/distributor.module';


@Module({
imports: [AdminModule, DistributorModule, TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'sajid',
database: 'Vhoktar Odhikar',//Change to your database name
autoLoadEntities: true,
synchronize: true,
} ),
],
controllers: [],
providers: [],
})
export class AppModule {}