import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { UsersService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService
  ) { }

  @Post('/')
  async create(@Body() payload: UserDto, @Res() res): Promise<any> {
    const user = await this.userService.create(payload);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User created successfully!'
    })
  }

  @Post('/login')
  async login(@Body() payload: UserDto, @Res() res): Promise<any> {
    const user = await this.userService.login(payload);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/dashboard')
  async dashboard(@Res() res): Promise<any> {
    const user = await this.userService.dashboard();
    return res.status(HttpStatus.OK).json(user);
  }


}