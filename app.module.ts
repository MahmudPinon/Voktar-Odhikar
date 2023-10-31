import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Users/Admin/admin.module';
@Module({
imports: [AdminModule, TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: '20438672',
database: 'Vhoktar Odhikar',//Change to your database name
autoLoadEntities: true,
synchronize: true,
} ),
],
controllers: [],
providers: [],
})
export class AppModule {}