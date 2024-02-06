import "./home.css";
import nahida from "../../assets/images/nahida-max.webp"
export default function home() {
  return (
    <div className="home">
        <div className="home__container container grid">
          <img
            src={nahida}
            alt="image"
            className="home__img"
          />

          <div className="home__data">
            <h1 className="home__title">
              The <br />
              Land of Wisdom
            </h1>
            <p className="home__description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
              itaque, tempora fugit adipisci quo animi.
            </p>

            <a href="#" className="button button-flex">
              Take a Tour
              <i className="ri-arrow-right-line button-icon"></i>
            </a>
          </div>

        </div>
    </div>
  );
}
