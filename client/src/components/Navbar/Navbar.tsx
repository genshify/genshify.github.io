import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/Genshify_logo_for_Light.png";
export default function navbar() {
    return (
      <div className="header">
        <nav className="nav container">
          <a href="#" className="nav__logo">
            <img src={logo} alt="GENSHIFY" />
          </a>
  
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
              <Link to="" className="nav__link ">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link to="about" className="nav__link ">
                  About
                </Link>
              </li>
              <li className="nav__item">
              <Link to="Banner" className="nav__link ">
                  Banner
                </Link>
              </li>
              <li className="nav__item">
              <Link to="Events" className="nav__link ">
                  Events
                </Link>
              </li>
              <li className="nav__item">
              <Link to="Tips" className="nav__link ">
                  Tips
                </Link>
              </li>
              <li className="nav__item">
              <Link to="showcase" className="nav__link ">
                  Showcase
                </Link>
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
  