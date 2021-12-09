/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';
import app from '../app';
import Person from '../interfaces/Person';

describe('Test Person Controller Requests', () => {

  it('Should create a Person', async () => {
    const response = await request(app).post('/persons').send({
      name: 'Lucas',
      surname: 'Silva',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Should update a Person', async () => {

    let personData = {
      name: 'Gustavo',
      surname: 'Carletti',
    }

    const responsePost = await request(app).post('/persons').send(personData);

    personData.surname = 'Carletto';

    const responsePut = await request(app).put(`/persons/${responsePost.body.id}`).send(personData);

    expect(responsePut.status).toBe(200);
    expect(responsePut.body.surname).toBe('Carletto');
  });

  it('Should return a list of Persons', async () => {
    const result = await request(app).get('/persons').send();

    expect(result.status).toBe(200);
    expect(result.body.data).toBe([]);
  });


  it('Should return one Person', async () => {
    const response = await request(app).post('/persons').send({
      name: 'Rogerio',
      surname: 'Cardoso',
    });

    const result = await request(app).get(`/persons/${response.body.id}`).send();

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('id');
  });

  it('Should delete one Person', async () => {
    const response = await request(app).post('/persons').send({
      name: 'Arthur',
      surname: 'Barros',
    });

    const result = await request(app).delete(`/persons/${response.body.id}`).send();

    expect(result.status).toBe(200);
  });
});