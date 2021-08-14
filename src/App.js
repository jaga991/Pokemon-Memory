import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import Pokedex from "pokedex-promise-v2";
import uniqid from "uniqid";

import Scoreboard from "./components/Scoreboard";
import PokeCard from "./components/PokeCard";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styleApp.css'

function App() {
  const P = new Pokedex();
  let [pokemon, setPokemon] = useState(
    [
      {
        id: 1,
        name: "bulbasaur", 
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", 
        selected: false
      }
    ]);
  let [score, setScore] = useState({currentScore: 0, highScore: 0})

  const getNameAndSprite = async (pN) => {
    let data = await P.getPokemonByName(pN);
    let pokeName = data.species.name;
    let pokeSprite = data.sprites["front_default"];
    for (let i = 0; i < pokemon.length; i++) {
      if (pN == pokemon[i].id) {
        return;
      }
    }
    setPokemon(
      prevState => [...prevState, 
        {
          id: pN,
          name: pokeName, 
          sprite: pokeSprite, 
          selected: false
        }
      ]);
  };

  useEffect(() => {
    console.log("useeffect here")
    for(let i = 2; i < 8; i++) {
      getNameAndSprite(i);
    }
  }, []);

  function returnPokeCard() {
    let tempArr = [];
    for(let i = 0; i < pokemon.length; i++) {
      tempArr.push(
        <PokeCard 
          id={pokemon[i].id}
          name={pokemon[i].name}
          sprite={pokemon[i].sprite}
        />
      )
    }
    return tempArr;
  }

  function cardSelected(e) {
    let targetId = e.currentTarget.id;
    for(let i = 0; i < pokemon.length; i++) {
      if(pokemon[i].id == targetId && pokemon[i].selected == true) {
        let tempArr2 = pokemon.map((item) => {
          return {...item, selected: false}
        })
        setScore(prevState => {
          return {...prevState, currentScore: 0}
        })
        setPokemon(tempArr2);
        return;
      } 
    }

    let tempArr = pokemon.map((item) => {
      if(item.id == targetId) {
        return {...item, selected: true};
      }
      return item;
    });
    let tempScore = JSON.parse(JSON.stringify(score));
    tempScore.currentScore++
    if (tempScore.highScore < tempScore.currentScore) {
      tempScore.highScore++;
      if(tempScore.highScore == pokemon.length) {
        tempScore.currentScore = 0;
        tempArr = pokemon.map((item) => {
          return {...item, selected: false};
        });
        getNameAndSprite(tempScore.highScore + 1);
      }
    }

    setScore(tempScore);
    setPokemon(tempArr);
  }

  function returnRandomPokeCard() {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    let tempArr = pokemon.map(obj => <PokeCard id={obj.id} name={obj.name} sprite={obj.sprite} selected={obj.selected} cardSelected={cardSelected}/>);
    shuffleArray(tempArr);
    return tempArr;
  }

  return (
    <Container fluid className="primary-bg min-vh-100">
      <Row>
        <header className="text-center">PokeMemory</header>
      </Row>
      <Scoreboard 
        currentScore={score.currentScore}
        highScore={score.highScore}
      />
      <Row className="p-5 justify-content-center" xs={2} md={4} lg={6}>
        {returnRandomPokeCard()}
      </Row>
    </Container>
  );
}

export default App;
