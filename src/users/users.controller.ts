import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

type User = { id: number; name: string; role: string; email: string };

const seedUsers: User[] = [
  { id: 1, name: 'Ana Silva', role: 'admin', email: 'ana@corelabs.dev' },
  { id: 2, name: 'Bruno Costa', role: 'developer', email: 'bruno@corelabs.dev' },
  { id: 3, name: 'Carla Mendes', role: 'analyst', email: 'carla@corelabs.dev' },
];

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  private users: User[] = [...seedUsers];
  private nextId = 4;

  private assertAuth(authorization?: string) {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Faça login antes de acessar /users.');
    }
  }

  private findOrFail(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'GET — listar usuários' })
  @ApiUnauthorizedResponse({ description: 'Token ausente' })
  list(@Headers('authorization') authorization?: string) {
    this.assertAuth(authorization);
    return { users: this.users, total: this.users.length };
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET — buscar usuário por id' })
  @ApiParam({ name: 'id', example: 1 })
  getOne(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization?: string,
  ) {
    this.assertAuth(authorization);
    return this.findOrFail(id);
  }

  @Post()
  @ApiOperation({ summary: 'POST — criar usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string', example: 'Diego Rocha' },
        email: { type: 'string', example: 'diego@corelabs.dev' },
        role: { type: 'string', example: 'developer' },
      },
    },
  })
  create(
    @Body() body: { name?: string; email?: string; role?: string },
    @Headers('authorization') authorization?: string,
  ) {
    this.assertAuth(authorization);
    const user: User = {
      id: this.nextId++,
      name: body.name || 'Novo Usuário',
      email: body.email || `user${this.nextId}@corelabs.dev`,
      role: body.role || 'developer',
    };
    this.users.push(user);
    return { created: true, user };
  }

  @Put(':id')
  @ApiOperation({ summary: 'PUT — substituir usuário' })
  @ApiParam({ name: 'id', example: 2 })
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; email?: string; role?: string },
    @Headers('authorization') authorization?: string,
  ) {
    this.assertAuth(authorization);
    const index = this.users.findIndex((u) => u.id === id);
    if (index < 0) throw new NotFoundException(`Usuário ${id} não encontrado`);
    const user: User = {
      id,
      name: body.name || 'Usuário',
      email: body.email || `user${id}@corelabs.dev`,
      role: body.role || 'developer',
    };
    this.users[index] = user;
    return { updated: true, method: 'PUT', user };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'PATCH — atualizar parcialmente' })
  @ApiParam({ name: 'id', example: 2 })
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<User>,
    @Headers('authorization') authorization?: string,
  ) {
    this.assertAuth(authorization);
    const user = this.findOrFail(id);
    if (body.name !== undefined) user.name = body.name;
    if (body.email !== undefined) user.email = body.email;
    if (body.role !== undefined) user.role = body.role;
    return { updated: true, method: 'PATCH', user };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETE — remover usuário' })
  @ApiParam({ name: 'id', example: 3 })
  @ApiOkResponse({ description: 'Usuário removido' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization?: string,
  ) {
    this.assertAuth(authorization);
    const index = this.users.findIndex((u) => u.id === id);
    if (index < 0) throw new NotFoundException(`Usuário ${id} não encontrado`);
    const [removed] = this.users.splice(index, 1);
    return { deleted: true, user: removed };
  }
}
