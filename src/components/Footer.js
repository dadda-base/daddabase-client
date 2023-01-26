import "../components/Footer.css";
import { ThemeContext } from './../context/theme.context';
import { useContext } from 'react';

function Footer() {

  const value = useContext(ThemeContext);

  return (
    <div className={`Footer ${value}`}>
      <h1 className="developed-by">Developed by Xavier Chang and Dave Mullally</h1>
    </div>
  );
}

export default Footer;
