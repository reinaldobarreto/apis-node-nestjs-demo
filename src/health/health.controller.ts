import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  private readonly startedAt = Date.now();

  @Get()
  @ApiOperation({ summary: 'Health check da API' })
  @ApiOkResponse({
    description: 'Serviço saudável',
    schema: {
      example: {
        status: 'ok',
        service: 'apis-node-nestjs-demo',
        uptimeSec: 12,
        timestamp: '2026-07-20T22:00:00.000Z',
      },
    },
  })
  check() {
    return {
      status: 'ok',
      service: 'apis-node-nestjs-demo',
      uptimeSec: Math.floor((Date.now() - this.startedAt) / 1000),
      timestamp: new Date().toISOString(),
    };
  }
}
