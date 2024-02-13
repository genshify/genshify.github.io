import { useState } from "react";
import "./showcase.css";
import { Characters, PlayerData, Wrapper } from "../../enka";
import { generateJSON } from "../../tools/genshin-optimizer/libs/good/goodDataMaker";

export default function Showcase() {
  const [showChar, setShowChar] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [playerDetails, setPlayerDetails] = useState<PlayerData>();

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

  const showCharacterDetails = (id: number) => {
    // ? scrolls to the character details section
    setCharIndex(id);
    setShowChar(true);
    const element = document.getElementById("charDetails");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const [jsonData, setJsonData] = useState<string>("");
  return (
    <div className="char container section" id="char">
      <h2 className="section__title-center">Character Details</h2>
      <div className="char__container grid">
        <div className="input__box">
          {/*test Uid: 825436941 840889067*/}
          <input id="uidInput" type="text" placeholder="Enter your id" />
          <button onClick={searchPlayer} className="char__search">
            <p>Search</p>
          </button>
        </div>
        <p className="cardDarkColor">It will shows your character</p>
        <div id="chars--container"></div>
      </div>
      <div>
        {playerDetails && (
          <div>
            <h1>{playerDetails.player.username}'s Characters</h1>
            <div className="char_cards_container">
              {playerDetails.characters.map(
                (character: Characters, index: number) => (
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
                        <p>
                          hp:{Math.round(Number(character.stats.maxHp.value))}
                        </p>
                        <p>
                          atk:{Math.round(Number(character.stats.atk.value))}
                        </p>
                        <p>
                          def:{Math.round(Number(character.stats.def.value))}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <section id="charDetails">
        {showChar && playerDetails && (
          <div
            className={`char__container  bg_${playerDetails.characters[charIndex].element}`}
          >
            <div className="char__data">
              <h2>{playerDetails.characters[charIndex].name}</h2>
            </div>
            <div className="char__details__container">
              <div className="char__img__container">
                <div>
                  <img
                    src={`https://enka.network/ui/${playerDetails.characters[charIndex].assets.icon}.png`}
                    alt={playerDetails.characters[charIndex].name}
                  />
                  <div className="char__data__const">
                    {playerDetails.characters[charIndex].constellationsList.map(
                      (constellation, index: number) => (
                        <img
                          key={index}
                          src={`https://enka.network/ui/${constellation.assets.icon}.png`}
                          alt={playerDetails.characters[charIndex].name}
                        />
                      )
                    )}
                  </div>
                  <p>
                    constellation:C
                    {
                      playerDetails.characters[charIndex].constellationsList
                        .length
                    }
                  </p>
                </div>
                <img
                  src={`https://enka.network/ui/${playerDetails.characters[charIndex].equipment.weapon.assets.icon}.png`}
                  alt={playerDetails.characters[charIndex].name}
                />
              </div>
              <div className="char_details_stats">
                <p>{playerDetails.characters[charIndex].element}</p>
                <p>
                  {playerDetails.characters[charIndex].equipment.weapon.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      {playerDetails && (
        <div>
          <button onClick={() => setJsonData(generateJSON(playerDetails))}>
            Click to generate json format
          </button>

          {jsonData && (
            <div>
              <textarea
                disabled
                rows={20}
                value={jsonData}
                className="jsonfield"
              ></textarea>
              <button
                id="copy"
                onClick={() => {
                  // ? copies the json data to the clipboard
                  navigator.clipboard.writeText(jsonData);
                  // ? shows a message that the data has been copied by changine the button text to "copied to clipboard"
                  const copyBtn = document.getElementById("copy");
                  if (copyBtn) copyBtn.textContent = "Copied to Clipboard";
                }}
              >
                Copy Data
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
