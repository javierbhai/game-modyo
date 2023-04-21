import React, { useState, useEffect } from 'react';
import MagicCard from './components/MagicCard';
import UserNameForm from './components/UserNameForm';
import Card from './components/Card';
import WeAreDone from './components/WeAreDone';

import './styles/main.css';

const App = () => {

  // User Name Form ::::::
  const [helloMyNameIs, setHelloMyNameIs] = useState();

  // Fliping Cards ::::::
  const areFalse = Array(16).fill(false);
  const [isFlipped, setIsFlipped] = useState(areFalse);
  const duplicateImages = (data) => {
    return data.reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    }, []);
  };
  const [shuffledCard, setShuffledCard] = useState([]);
  const [clickCount, setClickCount] = useState(1);
  const [prevSelectedCard, setPrevSelectedCard] = useState(-1);
  const [prevCardId, setPrevCardId] = useState(-1);

  // Form Handlers ::::::
  const handleHelloForm = name => setHelloMyNameIs(name);

  // Fetching Data ::::::
  useEffect(() => {
    fetch("https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=8")
      .then((response) => response.json())
      .then((data) => {
        const animalsData = data.entries.map((entry, index) => {
          return {
            id: entry.meta.uuid,
            imageUrl: entry.fields.image.url,
            name: entry.meta.name,
            index
          };
        });
        const duplicatedImages = duplicateImages(animalsData);
        const shuffledElements = duplicatedImages.sort(() => Math.random() - 0.5);
        setShuffledCard(shuffledElements);
      });
  }, []);

  // Flipping Cards Logic  ::::::
  const isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      setTimeout(() => setShuffledCard(hideCard), 1000);
    } else {
      const flipBack = isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        setIsFlipped(flipBack);
      }, 1000);
    }
  };

  const handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = isFlipped.slice();
    setPrevSelectedCard(shuffledCard[cardId])
    setPrevCardId(cardId)
    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      setIsFlipped(newFlipps);
      setClickCount(prevState => prevState + 1)

      if (clickCount === 2) {
        setClickCount(1)

        const previousCardId = prevCardId;
        const newCard = shuffledCard[cardId];
        const previousCard = prevSelectedCard;
        isCardMatch(previousCard, newCard, previousCardId, cardId);
      }
    }
  };

  const areWeDone = () => {
    return isFlipped.every((element, index, array) => element !== false);
  };

  return (
    <div className='magicCard'>
      {areWeDone()
        ? <WeAreDone />
        : (!helloMyNameIs
          ?
          <MagicCard>
            <UserNameForm onSubmit={handleHelloForm} />
          </MagicCard>
          :
          <section className="grid-container">
            {
              shuffledCard.map((cardNumber, index) =>
                <Card
                  key={index}
                  id={index}
                  cardNumber={cardNumber.index}
                  card={cardNumber}
                  isFlipped={isFlipped[index]}
                  handleClick={handleClick}
                />
              )
            }
          </section>
        )
      }
    </div>
  );
};

export default App;