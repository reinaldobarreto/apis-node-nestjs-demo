import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: 'Login demo e emissão de JWT' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'demo@corelabs.dev' },
        password: { type: 'string', example: 'demo123' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Token JWT emitido',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    },
  })
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
