import { useState } from "react";
import "./showcase.css";
import { test2 } from "./test2";
import { Wrapper } from "../../enka";
import { character } from "../../assets/interfaces/charInterface";

export default function Showcase() {
  const [showChar, setShowChar] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [playerDetails, setPlayerDetails] = useState<any>(null);

  const searchPlayer = async () => {
    const uid = (document.getElementById("uidInput") as HTMLInputElement).value;
    // ? gets the character details from enka api

    const { genshin } = new Wrapper();
    try {
      genshin
        .getPlayer(uid)
        .then((player) => setPlayerDetails(player))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  // const calculateStat = (baseStat: any, stat: any, statPerc: any) => {
  //   if (statPerc === undefined) statPerc = 0;
  //   if (stat === undefined) stat = 0;
  //   if (baseStat === undefined) baseStat = 0;
  //   return Math.round(baseStat * (1 + statPerc) + stat);
  // };

  const showCharacterDetails = (id: number) => {
    // ? scrolls to the character details section
    setCharIndex(id);
    setShowChar(true);
    console.log(test2.characters[charIndex].name);
    console.log(id);
    const element = document.getElementById("charDetails");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="char container section" id="char">
      <h2 className="section__title-center">Character Details</h2>
      <div className="char__container grid">
        <div className="input__box">
          {/*test Uid: 825436941 */}
          <input id="uidInput" type="text" placeholder="Enter your id" />
          <button onClick={searchPlayer} className="char__search">
            <p>Search</p>
          </button>
        </div>
        <p className="cardDarkColor">It will shows your character</p>
        <div id="chars--container"></div>
      </div>
      <div>
        {test2 && (
          <div>
            <h1>{test2.player.username}'s Characters</h1>
            <div className="char_cards_container">
              {test2.characters.map((character: character, index: number) => (
                <div
                  className={`char_cards bg_${character.element}`}
                  key={index}
                  onClick={() => showCharacterDetails(index)}
                >
                  <h2>{character.name}</h2>
                  <div className="char_card_stats_container">
                    <img
                      src={`https://enka.network/ui/${character.assets.sideIcon}.png`}
                      alt={character.name}
                    />
                    <div className="char_card_stats">
                      <p>{character.element}</p>
                      <p>Level : {character.maxLevel}</p>
                      <p>hp:{Math.round(character.stats.maxHp.value)}</p>
                      <p>atk:{Math.round(character.stats.atk.value)}</p>
                      <p>def:{Math.round(character.stats.def.value)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <section id="charDetails">
        {!showChar && (
          <div
            className={`char__container  bg_${test2.characters[charIndex].element}`}
          >
            <div className="char__data">
              <h2>{test2.characters[charIndex].name}</h2>
            </div>
            <div className="char__details__container">
              <div className="char__img__container">
                <div>
                  <img
                    src={`https://enka.network/ui/${test2.characters[charIndex].assets.icon}.png`}
                    alt={test2.characters[charIndex].name}
                  />
                  <div className="char__data__const">
                    {test2.characters[charIndex].constellationsList.map(
                      (constellation) => (
                        <img
                          src={`https://enka.network/ui/${constellation.assets.icon}.png`}
                          alt={test2.characters[charIndex].name}
                        />
                      )
                    )}
                  </div>
                  <p>constellation:C{test2.characters[charIndex].constellationsList.length}</p>
                </div>
                <img
                  src={`https://enka.network/ui/${test2.characters[charIndex].equipment.weapon.assets.icon}.png`}
                  alt={test2.characters[charIndex].name}
                />
              </div>
              <div className="char_details_stats">
                <p>{test2.characters[charIndex].element}</p>
                <p>{test2.characters[charIndex].equipment.weapon.name}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
