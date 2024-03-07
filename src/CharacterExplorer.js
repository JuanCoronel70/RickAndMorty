import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importamos el archivo CSS

function CharacterExplorer() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showText, setShowText] = useState(false); // Nuevo estado para controlar si se muestra el texto
  const [clickedCharacter, setClickedCharacter] = useState(null); // Nuevo estado para almacenar el personaje clickeado

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleImageClick = (character) => {
    setClickedCharacter(character); // Almacenamos el personaje clickeado
    setShowText(true); // Mostramos el texto cuando se hace clic en la imagen
    setTimeout(() => {
      setShowText(false); // Ocultamos el texto después de 2 segundos
    }, 2000);
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Character Explorer (hint: click the character image!)</h1>
      <input
        type="text"
        placeholder="Search characters"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredCharacters.map(character => (
          <li key={character.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: '100px', marginRight: '20px' }}
              onClick={() => handleImageClick(character)} // Pasamos el personaje clickeado al manejador de clic
              className={clickedCharacter === character ? 'wiggle' : ''} // Agregamos la clase "wiggle" si este es el personaje clickeado
            />
            <div>
              <h2 style={clickedCharacter === character ? rainbowTextStyle : {}}>{character.name}</h2> {/* Aplicamos el estilo de arcoíris solo si este es el personaje clickeado */}
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </div>
          </li>
        ))}
      </ul>
      {showText && <h1 style={{ textAlign: 'center' }}>Wubba Lubba Dub Dub!</h1>}
    </div>
  );
}

const rainbowTextStyle = {
  animation: 'rainbowText 1.5s infinite', // Aplicamos la animación de arcoíris al texto
  textShadow: '0 0 10px #ff0000, 0 0 20px #ff7700, 0 0 30px #ffff00, 0 0 40px #00ff00, 0 0 50px #0000ff, 0 0 60px #8a2be2, 0 0 70px #ff00ff' // Definimos el efecto de sombra de texto para el arcoíris
};

export default CharacterExplorer;
