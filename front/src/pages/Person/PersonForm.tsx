import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Box, Button, Form, Table } from 'react-bulma-components';
import { useNavigate, useParams } from 'react-router';
import Person from '../../interfaces/Person';
import api from '../../services/api';
import editIcon from '../../assets/images/icons/edit.svg';
import trashIcon from '../../assets/images/icons/trash.svg';
import plusIcon from '../../assets/images/icons/plus.svg';
import Contact from '../../interfaces/Contact';

function PersonForm() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [person, setPerson] = useState<Person>();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if(!!id) {
      api.get(`persons/${id}`).then(response => {
        setPerson(response.data);
      });
    }
    updateContactsList()
  }, [id]);

  async function updateContactsList() {
    await api.get(`persons/contacts/${id}`).then(response => {
      setContacts(response.data);
      console.log(contacts)
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setPerson({...person, [name]: value});
  }

  function handleClickAddContact() {
    if(!!person) {
      navigate(`/person/contact/new/${person.id}`);
    }  else {
      alert('Salve a pessoa antes de adicionar um contato');
    }
  }

  function handleEditContactClick(contact: Contact) {
    navigate(`/person/contact/edit/${contact.id}`);
  }

  const handleDeleteContactClick = useCallback(
    async (contact: Contact) => {
      try {
        if(window.confirm("Confirma a exclusão do contato?")) {
          await api.delete(`contacts/${contact.id}`);

          alert('Contato excluído!');

          await updateContactsList();
        }
      } catch (err) {
        alert('Erro ao excluir contato!');
      }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      try {
        event.preventDefault();

        const data = {
          name: person?.name,
          surname: person?.surname,
        }

        if(!!person?.id) {
          await api.put(`persons/${person.id}`, data)
          alert('Pessoa atualizada!');
        } else {
          await api.post('persons', data)
          alert('Pessoa incluída!');
        }

        navigate('/');
      } catch (err) {
        if(!!person?.id) {
          alert('Erro ao atualizar a pessoa!');
        } else {
          alert('Erro ao incluir a pessoa!');
        }
      }
    }, [navigate, person]
  );

  return (
    <div className="box">
      <h1 className="title">Editar Pessoa</h1>
      <form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Label>Nome</Form.Label>
          <Form.Input
            name="name"
            value={person?.name}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Sobrenome</Form.Label>
          <Form.Input
            name="surname"
            value={person?.surname}
            onChange={handleChange}
          />
        </Form.Field>
        <Button color='primary' submit>
          Salvar
        </Button>
        <Button color='danger' onClick={() => navigate('/')}>
          Cancelar
        </Button>
      </form>
      <Box>
        <h2 className="title">Contatos</h2>
      </Box>
      <Box>
        <Button onClick={() => handleClickAddContact()}>
          Adicionar
          <img src={plusIcon} alt="Adicionar" className="add-icon" />
        </Button>
        <Table>
          <thead>
            <tr>
              <th>
                Tipo
              </th>
              <th>
                Valor
              </th>
              <th>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: Contact) => {
              return (
                <tr key={contact.id}>
                  <td>
                    {contact.type}
                  </td>
                  <td>
                    {contact.value}
                  </td>
                  <td>
                    <Button onClick={() => handleEditContactClick(contact)}>
                      <img src={editIcon} alt="Editar" />
                    </Button>
                    <Button onClick={() => handleDeleteContactClick(contact)}>
                      <img src={trashIcon} alt="Excluir" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Box>
    </div>
  )

}

export default PersonForm;
