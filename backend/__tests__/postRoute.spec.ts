import supertest from 'supertest';
import { server } from '../src/server';
import { PrismaClient, Post, User } from '@prisma/client';
import { afterAll, beforeAll, describe, it, expect } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
let post: Post;
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

  post = await prisma.post.create({
    data: {
      caption: 'Sample Caption',
      content: 'Insert text here',
      user_id: user.user_id,
      votes: 0,
    },
  });
});

describe('', () => {
  it('should get all posts', async () => {
    const response = await supertest(server).get('/posts');
    expect(response.status).toBe(200);
  });

  it('should get post by id', async () => {
    const response = await supertest(server).get(`/posts/${post.post_id}`);
    expect(response.status).toBe(200);
  });

  it('should create a post', async () => {
    const response = await supertest(server)
      .post('/posts')
      .send({
        caption: 'Another Caption',
        content: 'More content here',
        user_id: user.user_id,
        votes: 0,
      });
    expect(response.status).toBe(201);
  });
});

afterAll(async () => {
  await prisma.post.deleteMany({ where: { user_id: user.user_id } });
  await prisma.user.delete({ where: { user_id: user.user_id } });
  await prisma.$disconnect();
  server.close();
});
