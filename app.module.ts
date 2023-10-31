import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryModule } from './Users/Industry/industry.module';

@Module({
    imports: [IndustryModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1535kazi',
        database: 'Vhoktar Odhikar',//Change to your database name
        autoLoadEntities: true,
        synchronize: true,
    } ),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}