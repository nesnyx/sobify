import { Module } from '@nestjs/common';
import { AgentModule } from './modules/agent/agent.module';
import { UsersModule } from './modules/users/users.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { MenuModule } from './modules/menu/menu.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, 
  }), ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }), AgentModule,AuthModule,UsersModule,OrdersModule,MenuModule,NotificationModule,MerchantModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
