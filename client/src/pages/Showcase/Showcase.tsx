import { useState } from "react";
import "./showcase.css";
import char from  "../../assets/jsons/characters.json" 
import loc from "../../assets/jsons/loc.json" 
import { test2 } from "./test2";

export default function Showcase() {

  const [playerDetails, setPlayerDetails] = useState<any>(null);
  const searchPlayer = async () => {
    const uid = (document.getElementById("uidInput") as HTMLInputElement).value;
    console.log(uid);

    // ? gets the character details from enka api
    try {
      const res = await fetch(`https://enka.network/api/uid/${uid}`,)
    const data = await res.json();
    setPlayerDetails(data);
    } catch (error) {
      console.log(error);
      
    }
    
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
        {playerDetails && (
          <div>
            <h1>{playerDetails.playerInfo.nickname}'s Characters</h1>
            <div className="char_cards_container">
              {test2.avatarInfoList.map((character, index) => (
                <div className="char_cards" key={index}>
                  <h2>{loc.en[char[character.avatarId].NameTextMapHash]}</h2>
                  {/* <img
                    // src={`https://enka.network/ui/${character.assets.icon}.png`}
                    alt={character.avatarId.toString()}
                  /> */}
                  <p>{character.avatarId}</p>
                  <p>Level : {character.level}</p>
                  <h4>stats:</h4>
                  <p>hp:{Math.round(character.fightPropMap[2]*character.fightPropMap[1])}</p>
                  {/* <p>atk:{Math.round(character.stats.atk.value)}</p>
                  <p>def:{Math.round(character.stats.def.value)}</p> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
