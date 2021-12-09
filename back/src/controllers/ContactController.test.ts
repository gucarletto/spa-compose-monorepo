import request from 'supertest';
import app from '../app';

describe('Test Contact Controller Requests', () => {

  it('Should create a Contact', async () => {
    const responsePerson = await request(app).post('/persons').send({
      name: 'Lucas',
      surname: 'Silva',
    });

    const responseContact = await request(app).post('/contacts').send({
      person_id: responsePerson.body.id,
      type: 'Whatsapp',
      value: '47988561881',
    });

    expect(responseContact.status).toBe(200);
    expect(responseContact.body).toHaveProperty('id');
  });

  it('Should update a Contact', async () => {

    let personData = {
      name: 'Gustavo',
      surname: 'Carletto',
    }

    const responsePerson = await request(app).post('/persons').send(personData);

    let contactData = {
      person_id: responsePerson.body.id,
      type: 'Whatsapp',
      value: '47988561882',
    }

    let responseContact = await request(app).post('/contacts').send(contactData);

    contactData.value = '47988561881';

    responseContact = await request(app).put(`/contacts/${responseContact.body.id}`).send(contactData);

    expect(responseContact.status).toBe(200);
    expect(responseContact.body.value).toBe('47988561881');
  });

  it('Should return one Contact', async () => {
    const responsePerson = await request(app).post('/persons').send({
      name: 'Lucas',
      surname: 'Silva',
    });

    const responseContact = await request(app).post('/contacts').send({
      person_id: responsePerson.body.id,
      type: 'Whatsapp',
      value: '47988561881',
    });

    const result = await request(app).get(`/contacts/${responseContact.body.id}`).send();

    expect(responseContact.status).toBe(200);
    expect(responseContact.body).toHaveProperty('id');
  });

  it('Should return contact from a Person', async () => {
    const responsePerson = await request(app).post('/persons').send({
      name: 'Lucas',
      surname: 'Silva',
    });

    await request(app).post('/contacts').send({
      person_id: responsePerson.body.id,
      type: 'Whatsapp',
      value: '47988561881',
    });

    const result = await request(app).get(`/persons/contacts/${responsePerson.body.id}`).send();

    expect(result.status).toBe(200);
    expect(result.body).toBe([]);
  });

  it('Should delete one Contact', async () => {
    const responsePerson = await request(app).post('/persons').send({
      name: 'Lucas',
      surname: 'Silva',
    });

    const responseContact = await request(app).post('/contacts').send({
      person_id: responsePerson.body.id,
      type: 'Whatsapp',
      value: '47988561881',
    });

    const result = await request(app).delete(`/contacts/${responseContact.body.id}`).send();

    expect(result.status).toBe(200);
  });

});