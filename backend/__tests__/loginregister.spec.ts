import supertest from 'supertest';
import app from '../src/server';
 // Assuming this is your main server file exporting the Express app instance

describe('User Routes', () => {
  it('should fetch all users', async () => {
    const response = await supertest(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1); 
  });

  it('should fetch user by ID', async () => {
    const userId = 1; 
    const response = await supertest(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user_id', userId);
  });

  it('should create a new user', async () => {
    const newUser = {
      first_name: 'Jon',
      last_name: 'Wayne',
      email: 'jonwayne@example.com',
      password: 'securepassword123',
      type: 'user',
    };

    const response = await supertest(app)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('first_name', 'Jon');
  });

  it('should login a user', async () => {
    const loginCredentials = {
      email: 'jonwayne@example.com',
      password: 'securepassword123',
    };

    const response = await supertest(app)
      .post('/users/login')
      .send(loginCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user_id');
  });

  it('should fetch user by email', async () => {
    const userEmail = 'jonwayne@example.com'; 
    const response = await supertest(app).get(`/users/email/${userEmail}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', userEmail);
  });

  it('should fetch posts of a user', async () => {
    const userId = 1; 
    const response = await supertest(app).get(`/users/${userId}/posts`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch comments of a user', async () => {
    const userId = 1; 
    const response = await supertest(app).get(`/users/${userId}/comments`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1); 
  });

  it('should fetch files uploaded by a user', async () => {
    const userId = 1; 
    const response = await supertest(app).get(`/users/${userId}/files`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should register a new user', async () => {
    const newUser = {
      first_name: 'Wayne',
      last_name: 'Jon',
      email: 'waynejon@example.com',
      password: 'password123',
      type: 'user',
    };

    const response = await supertest(app)
      .post('/users/register')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('first_name', 'Wayne');
    expect(response.body).toHaveProperty('email', 'waynejon@example.com');
  });

  it('should not create a user with existing email', async () => {
    const existingUser = {
      first_name: 'Jon',
      last_name: 'Wayne',
      email: 'jonwayne@example.com',
      password: 'password123',
      type: 'user',
    };

    await supertest(app)
      .post('/users')
      .send(existingUser);

    const response = await supertest(app)
      .post('/users')
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('User with this email already exists');
  });

  it('should return 404 for non-existing user ID', async () => {
    const nonExistingUserId = 9999; 
    const response = await supertest(app).get(`/users/${nonExistingUserId}`);
    expect(response.status).toBe(404);
  });

  it('should return 404 for non-existing user email', async () => {
    const nonExistingEmail = 'nonexisting.user@example.com'; 
    const response = await supertest(app).get(`/users/email/${nonExistingEmail}`);
    expect(response.status).toBe(404);
  });
});
