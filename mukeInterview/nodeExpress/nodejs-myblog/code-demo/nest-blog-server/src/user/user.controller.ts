import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // 依赖注入

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.findOne(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user; // 通过 AuthGuard 校验后，可以从 req.user 中获取到 payload
  }
}
