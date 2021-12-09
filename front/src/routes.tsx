import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import PersonList from './pages/Person/PersonList';
import PersonForm from './pages/Person/PersonForm';
import ContactForm from './pages/Contact/ContactForm';

function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<PersonList />} />
        <Route path="/person/new" element={<PersonForm />} />
        <Route path="/person/edit/:id" element={<PersonForm />} />
        <Route path="/person/contact/new/:personId" element={<ContactForm />} />
        <Route path="/person/contact/edit/:id" element={<ContactForm />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default Routes;