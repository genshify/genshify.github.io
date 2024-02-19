import { useState } from "react";
import "./showcase.css";
import { PlayerData, Wrapper } from "../../enka";
import { generateGoodData } from "../../tools/genshin-optimizer/libs/good/goodDataMaker";
import { CacheHandler } from "../../enka/handlers/CacheHandler";
import { Link } from "react-router-dom";
import { nameSetter } from "../../tools/genshin-optimizer/libs/good/goodDataMaker";
import { useDataStore } from "../../utils/DataStore";

export default function Showcase() {
  const [isLoading, setIsLoading] = useState(false);
  const dataStore = useDataStore();



  const [showChar, setShowChar] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [playerDetails, setPlayerDetails] = useState<PlayerData>();
  const cache = new CacheHandler();

  const searchPlayer = async () => {
    try {
      setIsLoading(true);
      const uid = (document.getElementById("uidInput") as HTMLInputElement)
        .value;

      // ? gets the character details from enka api
      const { genshin } = new Wrapper();
      await genshin
        .getPlayer(uid)
        .then((player) => {
          setPlayerDetails(player); // Set playerDetails
          cache.set("cacheData", player); //set Cache data into local storage
          try {
            // ? stores the data into the database
            const playerData = generateGoodData(player);
            dataStore(playerData, 1, false, true); 
          } catch (error) {
            console.error("Error updating database:", error);
          }
        })
        .catch((err) => console.log(err));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const showCharacterDetails = (id: number) => {
    // ? shows the selected (clicked) character
    setCharIndex(id);
    setShowChar(true);
  };

  // ? gets the cached data from the local storage and sets it to the state
  if (playerDetails === undefined) {
    const cachedData = cache.get("cacheData");
    if (cachedData) {
      setPlayerDetails(cachedData);
    }
  }

  const [jsonData, setJsonData] = useState<string>("");
  return (
    <div className="char container section">
      <h2 className="section__title-center">Character Details</h2>
      {/* search section */}
      <div className="search__container">
        <div className="input__box">
          {/*test Uid: 825436941 840889067*/}
          <input id="uidInput" type="text" placeholder="Enter your id" />
          <button onClick={searchPlayer} disabled={isLoading}>
            {isLoading ? "Updating..." : "SEARCH"}
          </button>
        </div>
        <p>Search your UID to show your characters..</p>
        <div id="chars--container"></div>
      </div>

      {/* characters showcase section */}
      {playerDetails && (
        <div>
          <h1>{playerDetails.player.username}'s Characters</h1>
          <div className="charSideIconContainer">
            {playerDetails.characters.map((character, index) => (
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
            {showChar && playerDetails && (
              <div
                className={`char__details bg_${playerDetails.characters[charIndex].element}`}
              >
                <div className="charDivRow1">
                  <div className="charCardCol1 charIconName cardDarkColor">
                    <img
                      className="charIcon"
                      src={`https://enka.network/ui/${playerDetails.characters[charIndex].assets.icon}.png`}
                    />
                    <p className="charName">
                      {playerDetails.characters[charIndex].name}
                    </p>
                    <p className="charLvl">
                      {playerDetails.characters[charIndex].maxLevel}
                    </p>
                  </div>
                  <div className="charStatsInfo charCardCol2 cardDarkColor">
                    <div className="charStatsInfoCol1">
                      <p>
                        hp:
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats.maxHp
                              .value
                          )
                        )}
                      </p>
                      <p>
                        Atk :{" "}
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats.atk.value
                          )
                        )}
                      </p>
                      <p>
                        Def :{" "}
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats.def.value
                          )
                        )}
                      </p>
                      <p>
                        Em :{" "}
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats
                              .elementalMastery.value
                          )
                        )}
                      </p>
                    </div>
                    <div className="charStatsInfoCol2">
                      <p>
                        Cr :{" "}
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats.critRate
                              .value
                          ) * 100
                        )}
                        %
                      </p>
                      <p>
                        Cd :{" "}
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats.critDamage
                              .value
                          ) * 100
                        )}
                        %
                      </p>
                      <p>
                        Er :{" "}
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats
                              .energyRecharge.value
                          ) * 100
                        )}
                        %
                      </p>
                      <p>
                        {playerDetails.characters[charIndex].element}dmg% :{" "}
                        {Math.round(
                          Number(
                            playerDetails.characters[charIndex].stats
                              .pyroDamageBonus.value
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
                        src={`https://enka.network/ui/${playerDetails.characters[charIndex].equipment.weapon.assets.icon}.png`}
                        alt=""
                      />
                      {
                        playerDetails.characters[charIndex].equipment.weapon
                          .level
                      }
                    </p>
                    <p className="weaponName">
                      {
                        playerDetails.characters[charIndex].equipment.weapon
                          .name
                      }
                    </p>
                  </div>
                  <div className="charCardCol2 cardDarkColor">
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${playerDetails.characters[charIndex].assets.talents.normalAttack}.png`}
                        alt=""
                      />
                      {
                        playerDetails.characters[charIndex].skills.normalAttacks
                          .level
                      }
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${playerDetails.characters[charIndex].assets.talents.elementalSkill}.png`}
                        alt=""
                      />
                      {
                        playerDetails.characters[charIndex].skills
                          .elementalSkill.level
                      }
                    </p>
                    <p className="talentP">
                      <img
                        className="talentImg"
                        src={`https://enka.network/ui/${playerDetails.characters[charIndex].assets.talents.elementalBurst}.png`}
                        alt=""
                      />
                      {
                        playerDetails.characters[charIndex].skills
                          .elementalBurst.level
                      }
                    </p>
                  </div>
                </div>
                <div className="charDivRow3">
                  <div className="charConstl cardDarkColor">
                    {playerDetails.player.showcase[
                      charIndex
                    ].assets.constellations.map((constellation, index) => (
                      <div key={index} className="constlCircle">
                        {playerDetails.characters[charIndex].constellationsList[
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
                    ))}
                  </div>
                  <div>
                    <Link
                      className="showDetailedStatsButton"
                      to={`/characters/${nameSetter(
                        playerDetails.characters[charIndex].name
                      )}`}
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
          <button onClick={() => setJsonData(generateGoodData(playerDetails))}>
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
