import { Link } from "react-router-dom";
import logoSVG from "../assets/Logo.svg";

function Header() {
  return (
    <header className="relative h-60 bg-[#000] pt-11 lg:h-[18.75rem]">
      <Link to={"/"}>
        <img
          className="absolute left-1/2 top-1/2 translate-x-[-50%]"
          src={logoSVG}
          alt="World Ranks logo image"
        />
      </Link>
      <div className="h-[12.25rem] bg-[url('./assets/hero-image-wr.jpg')] bg-top bg-no-repeat lg:h-64 lg:bg-center"></div>
    </header>
  );
}

export default Header;
