import React, { useEffect, useState } from 'react';
import Select from './components/Select';

import Animals from './apifake/Animals';
import Owners from './apifake/Owners';

import './style.css';
import IOwner from './apifake/Interfaces/IOwner';
import IAnimal from './apifake/Interfaces/IAnimal';

type OwnerAnimalsCount = {
  name: string;
  count: number;
};

function App() {
  const [owners, setOwners] = useState<IOwner[]>([]);
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [ownerAnimalsCount, setOwnerAnimalsCount] = useState<OwnerAnimalsCount[]>([]);

  const ownerApi: Owners = new Owners();
  const animalApi: Animals = new Animals();

  useEffect(() => {
    const getOwners = async () => {
      const response = await ownerApi.getAll();
      setOwners(response);
      console.log('Owners', response);
    };

    getOwners();
  }, []);

  useEffect(() => {
    const getAnimals = async () => {
      const response = await animalApi.getByOwnerId(1);
      setAnimals(response);
      console.log('Animals', response);
    };

    getAnimals();
  }, []);

  const getAnimalCount = () => {
    // owners.forEach(async (owner: IOwner) => {
    //   const response = await animalApi.getByOwnerId(owner.id);
    //   setOwnerAnimalsCount([...ownerAnimalsCount, { name: owner.name, count: response?.length }]);
    // });
  };

  const changeOwner = async (ownerId: number): Promise<void> => {
    const response = await animalApi.getByOwnerId(ownerId);
    setAnimals(response);
  };

  return (
    <div className="App">
      <section id="owners-section">
        <label htmlFor="owners">Donos:</label>
        <Select id="owners" handleChange={changeOwner}>
          {owners.map((owner: IOwner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </Select>
      </section>
      <section id="animals-section">
        <label htmlFor="animals">Animais:</label>
        <Select id="animals" handleChange={() => {}}>
          {animals.map((animal: IAnimal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </Select>
      </section>
      <section id="report">
        <button onClick={getAnimalCount}>Ordenar donos com mais animais</button>
        {ownerAnimalsCount && (
          <table id="reportList">
            <thead>
              <tr>
                <th>Dono</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {ownerAnimalsCount.map((ownerAnimal) => (
                <tr key={ownerAnimal.name}>
                  <td>{ownerAnimal.name}</td>
                  <td>{ownerAnimal.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
