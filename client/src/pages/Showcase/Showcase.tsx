import "./showcase.css";
import { testDetails } from "./test";
import { test2 } from "./test2";


export default function Showcase() {

  // ? gets the character details from enka api
  const searchPlayer = async () => {
    const uid = (document.getElementById("uidInput") as HTMLInputElement).value;
    console.log(uid);
    const res = await fetch(`/api/genshin/player/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
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
            {test2.characters.map((character, index) => (
              <div className="char_cards" key={index}>
                <h2>{character.name}</h2>
                <img src={`https://enka.network/ui/${character.assets.icon}.png`} alt={character.name} />
                <p>{character.element}</p>
                <p>Level : {character.maxLevel}</p>
                <h4>stats:</h4>
                <p>hp:{Math.round(character.stats.maxHp.value)}</p>
                <p>atk:{Math.round(character.stats.atk.value)}</p>
                <p>def:{Math.round(character.stats.def.value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
