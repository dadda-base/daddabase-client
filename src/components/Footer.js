import "../components/Footer.css";
import { ThemeContext } from './../context/theme.context';
import { useContext } from 'react';

import "./Footer.css";
import "https://kit.fontawesome.com/06578e4b93.js";

function Footer() {

  const value = useContext(ThemeContext);

  return (
    <div className={`Footer ${value}`}>
        <div>
        <span className="contact">Xavier Chang</span>
        <a href="https://www.facebook.com/david.mullally.7" target="_blank">
          <i class="fa-brands fa-facebook fa-2x socials"></i>
        </a>
        <a href="https://twitter.com/IMeamtWhatISaid" target="_blank">
          <i class="fa-brands fa-twitter fa-2x socials"></i>
        </a>
        <a href="https://www.instagram.com/1meantwhat1said/" target="_blank">
          <i class="fa-brands fa-instagram fa-2x socials"></i>
        </a>
        <a href="https://github.com/David-Mullally" target="_blank">
          <i class="fa-brands fa-github fa-2x socials"></i>
        </a>
        <a href="https://www.linkedin.com/in/david-mullally-393100256/" target="_blank">
          <i class="fa-brands fa-linkedin fa-2x socials"></i>
        </a>
        </div>

        <div>
        <span className="contact">Dave Mullally</span>
        <a href="https://www.facebook.com/david.mullally.7" target="_blank">
          <i class="fa-brands fa-facebook fa-2x socials"></i>
        </a>
        <a href="https://twitter.com/IMeamtWhatISaid" target="_blank">
          <i class="fa-brands fa-twitter fa-2x socials"></i>
        </a>
        <a href="https://www.instagram.com/1meantwhat1said/" target="_blank">
          <i class="fa-brands fa-instagram fa-2x socials"></i>
        </a>
        <a href="https://github.com/David-Mullally" target="_blank">
          <i class="fa-brands fa-github fa-2x socials"></i>
        </a>
        <a href="https://www.linkedin.com/in/david-mullally-393100256/" target="_blank">
          <i class="fa-brands fa-linkedin fa-2x socials"></i>
        </a>
        </div>
    </div>

  );
}

export default Footer;
