import supertest from 'supertest';
import { server } from '../src/server';
import { PrismaClient, User } from '@prisma/client';
import { afterAll, beforeAll, describe, it, expect } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
let user: User;


beforeAll(async () => {
  const uniqueEmail = `sample${uuidv4()}@email.com`;
  user = await prisma.user.create({
    data: {
      first_name: 'Shawn',
      last_name: 'Barza',
      email: uniqueEmail,
      password: 'samplepassword',
      type: 'user',
      image: '',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
  });
});

describe('User API', () => {
  it('should get all users', async () => {
    const response = await supertest(server).get('/users');
    expect(response.status).toBe(200);
  });

  it('should get user by id', async () => {
    const response = await supertest(server).get(`/users/${user.user_id}`);
    expect(response.status).toBe(200);
  });

  it('should create a user', async () => {
    const response = await supertest(server).post('/users').send({
      first_name: 'John Patrick',
      last_name: 'Pineda',
      email: `pineda${uuidv4()}@email.com`,
      password: 'samplepassword',
      type: 'user',
      image: '',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    });
    expect(response.status).toBe(201); 
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: { contains: 'sample' } } });
  await prisma.$disconnect();
  server.close();
});
