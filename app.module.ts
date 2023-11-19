import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Users/Admin/admin.module';
import { DistributorModule } from './Users/Distributor/distributor.module';
import { IndustryModule } from './Users/Industry/industry.module';
import { UserModule } from './Users/User/user.module';


@Module({
imports: [AdminModule, DistributorModule,UserModule, IndustryModule, TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: '123',
database: 'Vhoktar Odhikar',//Change to your database name
autoLoadEntities: true,
synchronize: true,
} ),
],
controllers: [],
providers: [],
})
export class AppModule {}