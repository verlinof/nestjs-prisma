import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { UsersModule } from './users/users.module';
import { RoleController } from './role/role.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HeroModule, UsersModule, AuthModule],
  controllers: [AppController, RoleController],
  providers: [AppService],
})
export class AppModule {}
