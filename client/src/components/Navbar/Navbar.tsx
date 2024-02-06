import "./Navbar.css";
export default function navbar() {
    return (
      <div>
        <nav className="nav container">
          <a href="#" className="nav__logo">
            <img src="./assets/images/logo/Genshify_logo_for_Light.png" alt="" />
          </a>
  
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link active-link">
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link ">
                  About
                </a>
              </li>
              <li className="nav__item">
                <a href="#banner" className="nav__link">
                  Banner
                </a>
              </li>
              <li className="nav__item">
                <a href="#events" className="nav__link">
                  Events
                </a>
              </li>
              <li className="nav__item">
                <a href="#tips" className="nav__link">
                  Tips
                </a>
              </li>
              <div className="nav__close" id="nav-close">
                <i className="ri-close-line"></i>
              </div>
            </ul>
          </div>
          <div className="nav__buttons">
            <i className="ri-sun-fill"></i>
            <div className="nav__toggle" id="nav-toggle">
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  