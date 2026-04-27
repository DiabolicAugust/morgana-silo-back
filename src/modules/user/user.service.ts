import { BadRequestException, Injectable } from '@nestjs/common';
import { db, type Db } from '../../db';
import { users } from '../../db/schema';
import { type User } from '../../db/types';
import { SignUpDto } from '../authorization/interfaces/signUp.dto';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private readonly database: Db = db) {}

  async createUser(data: SignUpDto): Promise<User> {
    const existingUser = await this.getUserByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashedPassword = await hash(data.password, 12);
    const [createdUser] = await this.database
      .insert(users)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      })
      .returning();

    return createdUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user;
  }
}
