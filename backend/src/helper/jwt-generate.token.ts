import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenGenerateService {
  constructor(private jwtTokenService: JwtService) { }

  async genratejwtToken(payload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtTokenService.signAsync(
        { user: { role: payload.role, id: payload.id, companyBranch: payload.companyBranch } },
        { secret: 'gvhdhgdfhd', expiresIn: '5h' }
      ),
      this.jwtTokenService.signAsync(
        { sub: payload.id },
        { secret: 'refresh', expiresIn: '15d' }
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}

