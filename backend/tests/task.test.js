import request from 'supertest';
import app from '../src/app.js';

describe('Task API - unauthenticated', () => {
  it('returns 401 on GET /api/tasks without token', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
  });

  it('returns 401 on POST /api/tasks without token', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Test', inputText: 'hello', operation: 'uppercase' });
    expect(res.status).toBe(401);
  });
});
