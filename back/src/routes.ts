import express from 'express';

import PersonController from './controllers/PersonController';
import ContactController from './controllers/ContactController';

const personController = new PersonController();
const contactController = new ContactController();

const routes = express.Router();
routes.get('/', (req, res) => res.send('Server running!'));

routes.post('/persons', personController.store)
routes.put('/persons/:id', personController.update)
routes.get('/persons/:id', personController.show)
routes.get('/persons', personController.index)
routes.delete('/persons/:id', personController.delete)

routes.post('/contacts', contactController.store)
routes.put('/contacts/:id', contactController.update)
routes.get('/contacts/:id', contactController.show)
routes.get('/persons/contacts/:personId', contactController.showFromPerson)
routes.delete('/contacts/:id', contactController.delete)


export default routes;