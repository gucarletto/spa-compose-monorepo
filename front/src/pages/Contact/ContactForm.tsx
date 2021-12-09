import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import { useNavigate, useParams } from 'react-router';
import Contact from '../../interfaces/Contact';
import api from '../../services/api';

function ContactForm() {

  let { id, personId } = useParams();

  const navigate = useNavigate();

  const [contact, setContact] = useState<Contact>();
  const [personIdState, setPersonIdState] = useState(personId);

  useEffect(() => {
    if(!!id) {
      api.get(`contacts/${id}`).then(response => {
        setContact(response.data);
        setPersonIdState(response.data.personId);
      });
    }
  }, [id]);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      try {
        event.preventDefault();

        const data = {
          type: contact?.type,
          value: contact?.value,
          person_id: personIdState,
        }

        if(!!contact?.id) {
          await api.put(`contacts/${contact.id}`, data)
          alert('Contato atualizado!');
        } else {
          await api.post('contacts', data)
          alert('Contato incluído!');
        }

        navigate(`/person/edit/${personIdState}`);
      } catch (err) {
        if(!!contact?.id) {
          alert('Erro ao atualizar o contato!');
        } else {
          alert('Erro ao incluir o contato!');
        }
      }
    }, [navigate, contact, personIdState]
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setContact({...contact, [name]: value});
  }

  return (
    <div className="box">
      <h1 className="title">Editar Contato</h1>
      <form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label>Tipo</Form.Label>
          <Form.Input
            name="type"
            value={contact?.type}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Valor</Form.Label>
          <Form.Input
            name="value"
            value={contact?.value}
            onChange={handleChange}
          />
        </Form.Field>
        <Button color='primary' submit>
          Salvar
        </Button>
        <Button color='danger' onClick={() => navigate(`/person/edit/${personIdState}`)}>
          Cancelar
        </Button>
      </form>
    </div>
  )

}

export default ContactForm;
