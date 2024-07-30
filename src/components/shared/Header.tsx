import MenuBurger from "./MenuBurger";
import Toolbar from "./Toolbar";

export default function Header() {
  return (
    <header className="container w-full flex items-center h-14 fixed top-2 left-1/2 -translate-x-1/2 z-10">
      <MenuBurger className="basis-2/6" />
      <Toolbar className="basis-4/6" />
    </header>
  );
}
