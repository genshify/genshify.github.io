import "./showcase.css";

export default function Showcase() {
  const searchChar = async () => {
    const uid = (document.getElementById("uidInput") as HTMLInputElement).value;
    console.log(uid);
  };


  return (
    <div>
      <section className="char container section" id="char">
        <h2 className="section__title-center">Character Details</h2>
        <div className="char__container grid">
          <div className="input__box">
            {/*test Uid: 825436941 */}
            <input id="uidInput" type="text" placeholder="Enter your id" />
            <button onClick={searchChar} className="char__search">
              <p>Search</p>
            </button>
          </div>
          <p className="cardDarkColor">It will shows your character</p>
          <div id="chars--container"></div>
        </div>
      </section>
    </div>
  );
}
