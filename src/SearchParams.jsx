import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';
import ThemeContext from './ThemeContext';

export default function SearchParams() {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);

  async function requestPets() {
    pet.animals({ location, breed, type: animal }).then(({ animals }) => {
      setPets(animals || []);
    });
  }

  useEffect(
    function () {
      setBreeds([]);
      setBreed('');

      pet.breeds(animal).then(function ({ breeds: breedsApi }) {
        const breedStrings = breedsApi.map(({ name }) => name);
        setBreeds(breedStrings);
      }, console.error);
    },
    [animal, setBreed, setBreeds]
  );

  return (
    <div className="search-params">
      <form
        onSubmit={function (e) {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={function (e) {
              setLocation(e.target.value);
            }}
          ></input>
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onBlur={(e) => setTheme(e.target.value)}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}
