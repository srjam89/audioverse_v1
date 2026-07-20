export default function Header() {
  return (
    <header id="header" className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-2">
        <img src="/audioverse-logo.svg" alt="Audioverse Logo" width={200} />
      </div>
      <div className="col-span-4">
        <ul className="flex items-center justify-center gap-6">
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
      <div className="col-span-4">{"// search component"}</div>
      <div className="col-span-2 justify-self-end">
        {"//profile shopping cart button"}
      </div>
    </header>
  );
}
