import { Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import * as bcrypt from 'bcrypt';
import { JwtTokenGenerateService } from "src/helper/jwt-generate.token";
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => JwtTokenGenerateService)) private readonly jwtTokenGenerateService: JwtTokenGenerateService,
  ) { }

  async create(payload: UserDto): Promise<any> {
    //reading json file form local storage
    const users = await readFile(join(process.cwd(), 'db', 'db.json'), { encoding: "utf-8" });
    let json = JSON.parse(users);
    //hasing plain password
    payload['password'] = await bcrypt.hash(payload.password, await bcrypt.genSalt());
    //pushing email and password to json file
    json.push({ email: payload.email, password: payload.password });
    return await writeFile(join(process.cwd(), 'db', 'db.json'), JSON.stringify(json));
  }

  async login(payload: UserDto): Promise<any> {
    //reading json file data
    const usersData = await readFile(join(process.cwd(), 'db', 'db.json'), { encoding: "utf-8" });
    let users = JSON.parse(usersData);
    //filter record with json file
    const result = users.filter(data => data?.email == payload.email);
    if (result.length > 0) {
      const isMatch = await bcrypt.compare(payload.password, result[0].password);
      if (isMatch) {
        //genrating token and refresh token
        const data = await this.jwtTokenGenerateService.genratejwtToken({ role: 'user' });
        return {
          success: true,
          message: 'Login Success!',
          data: {
            ...data
          }
        }
      }
      throw new UnauthorizedException('The email and password you entered is incorrect !');
    }
    throw new UnauthorizedException('The email and password you entered is incorrect !');
  }

  async dashboard(): Promise<any> {
    const chartdata: any = [
      {
        year: 2023,
        month: 'april',
        totalCount: 30,
        pendingCount: 345,
      },
      {
        year: 2023,
        month: 'may',
        totalCount: 300,
        pendingCount: 345,
      }
    ];
    return {

      statusCode: 200,
      success: true,
      message: 'Data fetched successfully!',
      data: {
        counts: 2,
        chartdata
      }
    };
  }
}