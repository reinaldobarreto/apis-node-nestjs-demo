import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';

@Module({
  controllers: [HealthController, AuthController, UsersController],
})
export class AppModule {}
