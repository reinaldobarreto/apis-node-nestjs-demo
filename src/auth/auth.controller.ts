import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { email?: string; password?: string }) {
    const email = body?.email || 'demo@corelabs.dev';
    const payload = {
      sub: 1,
      email,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    // Demo only — not a real cryptographic JWT
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const tokenBody = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const access_token = `${header}.${tokenBody}.demo-signature`;

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }
}
