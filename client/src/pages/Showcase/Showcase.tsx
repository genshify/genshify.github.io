import "./showcase.css";



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
    </div>
  );
}
