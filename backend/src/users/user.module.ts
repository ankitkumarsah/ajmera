import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UsersService } from "./user.service";
import { JwtTokenGenerateService } from "src/helper/jwt-generate.token";
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    forwardRef(() => JwtModule)
  ],
  controllers: [UserController],
  providers: [UsersService, JwtTokenGenerateService],
})
export class UserModule { }