import { useState } from "react";
import "./showcase.css";
import char from "../../assets/jsons/characters.json";
import loc from "../../assets/jsons/loc.json";
import { test2 } from "./test2";
import { calculateAllStats } from "../../utils/calculations";

export default function Showcase() {
  const [charIndex, setCharIndex] = useState<number>(0);
  const charData: any = char;
  const locData: any = loc;
  const [playerDetails, setPlayerDetails] = useState<any>(null);

  const searchPlayer = async () => {
    const uid = (document.getElementById("uidInput") as HTMLInputElement).value;
    console.log(uid);

    // ? gets the character details from enka api
    try {
      const res = await fetch(`https://enka.network/api/uid/${uid}`);
      const data = await res.json();
      setPlayerDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  const calculateStat = (baseStat: any, stat: any, statPerc: any) => {
    if (statPerc === undefined) statPerc = 0;
    if (stat === undefined) stat = 0;
    if (baseStat === undefined) baseStat = 0;
    return Math.round(baseStat * (1 + statPerc) + stat);
  };

  const showCharacterDetails = (id: number) => {
    // ? scrolls to the character details section
    setCharIndex(id);
    const element: any = document.getElementById("charDetails");
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
        <p
          className="cardDarkColor"
          onClick={() => console.log(calculateAllStats(5))}
        >
          It will shows your character
        </p>
        <div id="chars--container"></div>
      </div>
      <div>
        {test2 && (
          <div>
            <h1>{test2.playerInfo.nickname}'s Characters</h1>
            <div className="char_cards_container">
              {test2.avatarInfoList.map((character, index) => (
                <div
                  className="char_cards"
                  key={index}
                  onClick={() => showCharacterDetails(index)}
                >
                  <h2>
                    {locData.en[charData[character.avatarId].NameTextMapHash]}
                  </h2>
                  <img
                    src={`https://enka.network/ui/${
                      charData[character.avatarId].SideIconName
                    }.png`}
                    alt={character.avatarId.toString()}
                  />
                  <p>Level : {character.propMap[4001].val}</p>
                  <h4>stats:</h4>
                  <p>
                    hp:
                    {calculateStat(
                      character.fightPropMap[2],
                      character.fightPropMap[1],
                      character.fightPropMap[3]
                    )}
                  </p>
                  <p>
                    atk:
                    {calculateStat(
                      character.fightPropMap[5],
                      character.fightPropMap[4],
                      character.fightPropMap[6]
                    )}
                  </p>
                  <p>
                    def:
                    {calculateStat(
                      character.fightPropMap[8],
                      character.fightPropMap[7],
                      character.fightPropMap[6]
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <section id="charDetails">
        {charIndex && (
          <div className="char__container grid">
            <div className="char__data">
              <h2 className="section__title">Character Details</h2>
              <div className="char__info">
                <div>
                  <h3>Character Name</h3>
                  <p>
                    {
                      locData.en[
                        charData[test2.avatarInfoList[charIndex].avatarId]
                          .NameTextMapHash
                      ]
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="char__img">
              {/* <img
                src={`https://enka.network/ui/${charData[charIndex].SideIconName}.png`}
                alt={charData[charIndex].NameTextMapHash}
              /> */}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
