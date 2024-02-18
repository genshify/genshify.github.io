import { useState } from "react";
import "./showcase.css";
import { PlayerData, Wrapper } from "../../enka";
import { generateJSON } from "../../tools/genshin-optimizer/libs/good/goodDataMaker";
import { test2 } from "./test2";
import { Link } from "react-router-dom";
import { nameSetter } from "../../tools/genshin-optimizer/libs/good/goodDataMaker";

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
    // ? shows the selected (clicked) character
    setCharIndex(id);
    setShowChar(true);
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
      {test2 && (
        <div>
          <h1>{test2.player.username}'s Characters</h1>
          <div className="charSideIconContainer">
            {test2.characters.map((character, index) => (
              <div
                key={index}
                onClick={() => showCharacterDetails(index)}
                className={`charSideIcon bg_${character.element}`}
              >
                <img
                  src={`https://enka.network/ui/${character.assets.sideIcon}.png`}
                />
              </div>
            ))}
          </div>
          {/* selected character details section */}
          <section id="charDetails">
            {showChar && test2 && (
              <div
                className={`char__details bg_${test2.characters[charIndex].element}`}
              >
                <div className="charDivRow1">
                  <div className="charCardCol1 charIconName cardDarkColor">
                    <img
                      className="charIcon"
                      src={`https://enka.network/ui/${test2.characters[charIndex].assets.icon}.png`}
                    />
                    <p className="charName">
                      {test2.characters[charIndex].name}
                    </p>
                    <p className="charLvl">
                      {test2.characters[charIndex].maxLevel}
                    </p>
                  </div>
                  <div className="charStatsInfo charCardCol2 cardDarkColor">
                    <div className="charStatsInfoCol1">
                      <p>
                        hp:
                        {Math.round(
                          Number(test2.characters[charIndex].stats.maxHp.value)
                        )}
                      </p>
                      <p>
                        Atk :{" "}
                        {Math.round(
                          Number(test2.characters[charIndex].stats.atk.value)
                        )}
                      </p>
                      <p>
                        Def :{" "}
                        {Math.round(
                          Number(test2.characters[charIndex].stats.def.value)
                        )}
                      </p>
                      <p>
                        Em :{" "}
                        {Math.round(
                          Number(
                            test2.characters[charIndex].stats.elementalMastery
                              .value
                          )
                        )}
                      </p>
                    </div>
                    <div className="charStatsInfoCol2">
                      <p>
                        Cr :{" "}
                        {Math.round(
                          Number(
                            test2.characters[charIndex].stats.critRate.value
                          ) * 100
                        )}
                        %
                      </p>
                      <p>
                        Cd :{" "}
                        {Math.round(
                          Number(
                            test2.characters[charIndex].stats.critDamage.value
                          ) * 100
                        )}
                        %
                      </p>
                      <p>
                        Er :{" "}
                        {Math.round(
                          Number(
                            test2.characters[charIndex].stats.energyRecharge
                              .value
                          ) * 100
                        )}
                        %
                      </p>
                      <p>
                        {test2.characters[charIndex].element}dmg% :{" "}
                        {Math.round(
                          Number(
                            test2.characters[charIndex].stats.pyroDamageBonus
                              .value
                          ) * 100
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
                        src={`https://enka.network/ui/${test2.characters[charIndex].equipment.weapon.assets.icon}.png`}
                        alt=""
                      />
                      {test2.characters[charIndex].equipment.weapon.level}
                    </p>
                    <p className="weaponName">
                      {test2.characters[charIndex].equipment.weapon.name}
                    </p>
                  </div>
                  <div className="charCardCol2 cardDarkColor">
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${test2.characters[charIndex].assets.talents.normalAttack}.png`}
                        alt=""
                      />
                      {test2.characters[charIndex].skills.normalAttacks.level}
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${test2.characters[charIndex].assets.talents.elementalSkill}.png`}
                        alt=""
                      />
                      {test2.characters[charIndex].skills.elementalSkill.level}
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${test2.characters[charIndex].assets.talents.elementalBurst}.png`}
                        alt=""
                      />
                      {test2.characters[charIndex].skills.elementalBurst.level}
                    </p>
                  </div>
                </div>
                <div className="charDivRow3">
                  <div className="charConstl cardDarkColor">
                    {test2.player.showcase[charIndex].assets.constellations.map(
                      (constellation, index) => (
                        <div key={index} className="constlCircle">
                          {test2.characters[charIndex].constellationsList[
                            index
                          ] ? (
                            <img
                              className="constlImg"
                              src={`https://enka.network/ui/${constellation}.png`}
                              alt=""
                            />
                          ) : (
                            <img
                              className="constlImgDisabled"
                              src={`https://enka.network/ui/${constellation}.png`}
                              alt=""
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    <Link
                      onClick={()=>{
                        console.log(nameSetter(test2.characters[charIndex].name));
                        
                      }}
                      className="showDetailedStatsButton"
                      to={`/characters/${nameSetter(test2.characters[charIndex].name)}`}
                    >
                      show detailed stats
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* showcase section containing every characters */}

          <div className="char_cards_container">
            {test2.characters.map((character, index) => (
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
                          Number(character.stats.energyRecharge.value) * 100
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
                      {character.skills.normalAttacks.level}
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${character.assets.talents.elementalSkill}.png`}
                        alt=""
                      />
                      {character.skills.elementalSkill.level}
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${character.assets.talents.elementalBurst}.png`}
                        alt=""
                      />
                      {character.skills.elementalBurst.level}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                className="jsonField"
              ></textarea>
              <button
                id="copy"
                onClick={() => {
                  // ? copies the json data to the clipboard
                  navigator.clipboard.writeText(jsonData);
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
