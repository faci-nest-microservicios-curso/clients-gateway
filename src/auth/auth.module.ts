import { Module } from '@nestjs/common';

import { TransportsModule } from '../transports/transports.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [TransportsModule],
  exports: [AuthService, AuthGuard],
})
export class AuthModule { }
