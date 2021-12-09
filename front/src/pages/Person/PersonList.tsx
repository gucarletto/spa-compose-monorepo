import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Table } from 'react-bulma-components';
import Person from '../../interfaces/Person';
import editIcon from '../../assets/images/icons/edit.svg';
import trashIcon from '../../assets/images/icons/trash.svg';
import plusIcon from '../../assets/images/icons/plus.svg';

import api from '../../services/api';
import { useNavigate } from 'react-router';
import './style.css'

function PersonList() {

  const [persons, setPersons] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    updatePersonList();
  }, []);

  function updatePersonList() {
    api.get('persons').then(response => {
      setPersons(response.data);
    });
  }

  function handleEditClick(person: Person) {
    navigate(`/person/edit/${person.id}`);
  }

  function handleClickAdd() {
    navigate('/person/new');
  }

  const handleDeleteClick = useCallback(
    async (person: Person) => {
      try {
        if(window.confirm("Confirma a exclusão da pessoa?")) {
          await api.delete(`persons/${person.id}`);

          alert('Pessoa Excluída!');

          updatePersonList();
        }
      } catch (err) {
        alert('Erro ao excluir pessoa!');
      }
  }, []);

  return (
    <Box>
      <Box>
        <h1 className="title">Pessoas</h1>
      </Box>
      <Box>
        <Button onClick={() => handleClickAdd()}>
          Adicionar
          <img src={plusIcon} alt="Adicionar" className="add-icon" />
        </Button>
        <Table>
          <thead>
            <tr>
              <th>
                Nome
              </th>
              <th>
                Sobrenome
              </th>
              <th>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person: Person) => {
              return (
                <tr key={person.id}>
                  <td>
                    {person.name}
                  </td>
                  <td>
                    {person.surname}
                  </td>
                  <td>
                    <Button onClick={() => handleEditClick(person)}>
                      <img src={editIcon} alt="Editar" />
                    </Button>
                    <Button onClick={() => handleDeleteClick(person)}>
                      <img src={trashIcon} alt="Excluir" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default PersonList;