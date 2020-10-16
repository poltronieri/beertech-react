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

  useEffect(() => {
    const getOwners = async () => {
      const ownerApi: Owners = new Owners();
      const response = await ownerApi.getAll();
      setOwners(response);
      console.log('Owners', response);
    };

    getOwners();
  }, []);

  useEffect(() => {
    const getAnimals = async () => {
      const animalApi: Animals = new Animals();
      const response = await animalApi.getByOwnerId(1);
      console.log('Animals', response);

      setAnimals(response);
    };

    getAnimals();
  }, []);

  async function getAnimalCount() {
    owners.forEach(async (owner: IOwner) => {
      const response = await getAnimalsOfOwner(owner.id);
      if (ownerAnimalsCount.length <= 0) {
        setOwnerAnimalsCount((prevState) => [...prevState, { name: owner.name, count: response?.length }]);
      }
    });
  }

  const changeOwner = async (ownerId: number): Promise<void> => {
    setAnimals(await getAnimalsOfOwner(ownerId));
  };

  const getAnimalsOfOwner = async (ownerId: number) => {
    const animalApi: Animals = new Animals();
    const response = await animalApi.getByOwnerId(ownerId);
    return response;
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
              {ownerAnimalsCount
                .sort((owner1, owner2) => owner2.count - owner1.count)
                .map((ownerAnimal) => (
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
