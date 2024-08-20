import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { UsersModule } from './users/users.module';
import { RoleController } from './role/role.controller';

@Module({
  imports: [HeroModule, UsersModule],
  controllers: [AppController, RoleController],
  providers: [AppService],
})
export class AppModule {}
