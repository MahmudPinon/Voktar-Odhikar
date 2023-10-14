import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisModule } from './Distributor/distributor.module';

@Module({
    imports: [DisModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'sajid',
        database: 'DisInfo',//Change to your database name
        autoLoadEntities: true,
        synchronize: true,
    } ),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}