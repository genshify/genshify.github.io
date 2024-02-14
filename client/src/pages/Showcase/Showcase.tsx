import { useState } from "react";
import "./showcase.css";
import {PlayerData, Wrapper } from "../../enka";
import { generateJSON } from "../../tools/genshin-optimizer/libs/good/goodDataMaker";
import { test2 } from "./test2";

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
    <div className="char container section">
      <h2 className="section__title-center">Character Details</h2>

      {/* search section */}
      <div className="search__container">
        <div className="input__box">
          {/*test Uid: 825436941 840889067*/}
          <input id="uidInput" type="text" placeholder="Enter your id" />
          <button onClick={searchPlayer}>
            <p>Search</p>
          </button>
        </div>
        <p>Search your UID to show your characters..</p>
        <div id="chars--container"></div>
      </div>

      {/* characters showcase section */}
      {playerDetails && (
        <div>
          <h1>{playerDetails.player.username}'s Characters</h1>
          <div className="char_cards_container">
            {playerDetails.characters.map((character, index) => (
              <div
                key={index}
                className={`charDiv bg_${character.element}`}
                onClick={() => showCharacterDetails(index)}
              >
                <div className="charDivRow1">
                  <div className="charCardCol1 charIconName cardDarkColor">
                    <img
                      className="charIcon"
                      src={`https://enka.network/ui/${character.assets.icon}.png`}
                    />
                    <p className="charName">{character.name}</p>
                    <p className="charLvl">{character.maxLevel}</p>
                  </div>
                  <div className="charStatsInfo charCardCol2 cardDarkColor">
                    <div className="charStatsInfoCol1">
                      <p>
                        hp:{Math.round(Number(character.stats.maxHp.value))}
                      </p>
                      <p>
                        Atk : {Math.round(Number(character.stats.atk.value))}
                      </p>
                      <p>
                        Def : {Math.round(Number(character.stats.def.value))}
                      </p>
                      <p>
                        Em :{" "}
                        {Math.round(
                          Number(character.stats.elementalMastery.value)
                        )}
                      </p>
                    </div>
                    <div className="charStatsInfoCol2">
                      <p>
                        Cr :{" "}
                        {Math.round(
                          Number(character.stats.critRate.value) * 100
                        )}
                        %
                      </p>
                      <p>
                        Cd :{" "}
                        {Math.round(
                          Number(character.stats.critDamage.value) * 100
                        )}
                        %
                      </p>
                      <p>
                        Er :{" "}
                        {Math.round(
                          Number(character.stats.energyRecharge.value )* 100
                        )}
                        %
                      </p>
                      <p>
                        {character.element}dmg% :{" "}
                        {Math.round(
                          Number(character.stats.pyroDamageBonus.value) * 100
                        )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
                <div className="charDivRow2">
                  <div className="charWeapon charCardCol1 cardDarkColor">
                    <p className="weaponP">
                      <img
                        className=" weaponImg"
                        src={`https://enka.network/ui/${character.equipment.weapon.assets.icon}.png`}
                        alt=""
                      />
                      {character.equipment.weapon.level}
                    </p>
                    <p className="weaponName">
                      {character.equipment.weapon.name}
                    </p>
                  </div>
                  <div className="charCardCol2 cardDarkColor">
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${character.assets.talents.normalAttack}.png`}
                        alt=""
                      />
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${character.assets.talents.elementalSkill}.png`}
                        alt=""
                      />
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${character.assets.talents.elementalBurst}.png`}
                        alt=""
                      />
                    </p>
                  </div>
                </div>
                {/* <div className="charDivRow3">
                  <div className="charConstl cardDarkColor">
                    <div className="conslCircle">
                      <img
                        className="constlImg1"
                        src={`https://enka.network/ui/${character.constellationsList[0].assets.icon}.png`}
                        alt=""
                      />
                      <img
                        className="constlImg2"
                        src={`https://enka.network/ui/${character.assets.talents.elementalBurst}.png`}
                        alt=""
                      />
                      <i className=" constl1 lockIcon fas fa-lock" />
                    </div>
                    <div className="conslCircle">
                      <img
                        className="constlImg1"
                        src="images/frames/constlFrame2.png"
                        alt=""
                      />
                      <img
                        className="constlImg2"
                        src="https://enka.network/ui/${
                    contslIconNames[1]
                  }.png"
                        alt=""
                      />
                      <i className="constl2 lockIcon fas fa-lock" />
                    </div>
                    <div className="conslCircle">
                      <img
                        className="constlImg1"
                        src="images/frames/constlFrame2.png"
                        alt=""
                      />
                      <img
                        className="constlImg2"
                        src="https://enka.network/ui/${
                    contslIconNames[2]
                  }.png"
                        alt=""
                      />
                      <i className="constl3 lockIcon fas fa-lock" />
                    </div>
                    <div className="conslCircle">
                      <img
                        className="constlImg1"
                        src="images/frames/constlFrame2.png"
                        alt=""
                      />
                      <img
                        className="constlImg2"
                        src="https://enka.network/ui/${
                    contslIconNames[3]
                  }.png"
                        alt=""
                      />
                      <i className="constl4 lockIcon fas fa-lock" />
                    </div>
                    <div className="conslCircle">
                      <img
                        className="constlImg1"
                        src="images/frames/constlFrame2.png"
                        alt=""
                      />
                      <img
                        className="constlImg2"
                        src="https://enka.network/ui/${
                    contslIconNames[4]
                  }.png"
                        alt=""
                      />
                      <i className="constl5 lockIcon fas fa-lock" />
                    </div>
                    <div className="conslCircle">
                      <img
                        className="constlImg1"
                        src="images/frames/constlFrame2.png"
                        alt=""
                      />
                      <img
                        className="constlImg2"
                        src="https://enka.network/ui/${
                    contslIconNames[5]
                  }.png"
                        alt=""
                      />
                      <i className="constl6 lockIcon fas fa-lock" />
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <div>
        {test2 && (
          <div>
            <h1>{test2.player.username}'s Characters</h1>
            <div className="char_cards_container">
              {test2.characters.map((character: Characters, index: number) => (
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
                      <p>atk:{Math.round(Number(character.stats.atk.value))}</p>
                      <p>def:{Math.round(Number(character.stats.def.value))}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}

      {/* selected character details section */}
      <section id="charDetails">
        {showChar && test2 && (
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
                      (constellation, index: number) => (
                        <img
                          key={index}
                          src={`https://enka.network/ui/${constellation.assets.icon}.png`}
                          alt={test2.characters[charIndex].name}
                        />
                      )
                    )}
                  </div>
                  <p>
                    constellation:C
                    {test2.characters[charIndex].constellationsList.length}
                  </p>
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
