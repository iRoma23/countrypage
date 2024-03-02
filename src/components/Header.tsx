import logoSVG from "../assets/Logo.svg";

function Header() {
  return (
    <header className="relative mt-0 h-60 w-screen bg-black pt-8">
      <img
        className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
        src={logoSVG}
        alt="World Ranks logo image"
      />
      <div className="h-52 bg-[url('./assets/hero-image-wr.jpg')] bg-top"></div>
    </header>
  );
}

export default Header;
