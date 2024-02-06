import nahida from "../../assets/images/nahida-max.webp"
export default function About() {
  return (
    <div className="about__container grid">
      <div className="about__data">
        <h2 className="section__title-center">
          Find Out A Little More <br />
          About Us
        </h2>
        <p className="about__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
          neque quam enim accusantium autem ipsam incidunt dolores delectus iure
          adipisci?
        </p>
      </div>

      <img
        src={nahida}
        alt="about image"
        className="about__img"
      />
    </div>
  );
}
