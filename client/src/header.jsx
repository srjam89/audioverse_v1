import Search from "./components/search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header id="header" className="grid grid-cols-12 items-center gap-2 p-2">
      <div className="col-span-2">
        <img src="/audioverse-logo.svg" alt="Audioverse Logo" width={200} />
      </div>
      <div className="col-span-4">
        <ul className="flex items-center justify-start gap-8">
          <li className="hover:border-b-2 hover: border-(--accent)">
            <a href="/">Home</a>
          </li>
          <li className="hover:border-b-2 hover: border-(--accent)">
            <a href="/about">About Us</a>
          </li>
          <li className="hover:border-b-2 hover: border-(--accent)">
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="col-span-4">
        <Search />
      </div>
      <div className="col-span-2 w-full flex items-center justify-end gap-4">
        <FontAwesomeIcon icon={faUser} className="text-xl" />
        <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
      </div>
    </header>
  );
}
