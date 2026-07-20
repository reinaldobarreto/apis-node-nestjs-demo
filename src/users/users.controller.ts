import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';

const USERS = [
  { id: 1, name: 'Ana Silva', role: 'admin' },
  { id: 2, name: 'Bruno Costa', role: 'developer' },
  { id: 3, name: 'Carla Mendes', role: 'analyst' },
];

@Controller('users')
export class UsersController {
  @Get()
  list(@Headers('authorization') authorization?: string) {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Faça login antes de listar usuários.');
    }

    return {
      users: USERS,
      total: USERS.length,
    };
  }
}
