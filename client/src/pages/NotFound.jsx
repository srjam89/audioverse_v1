import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="p-2 py-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-(--accent) hover:underline">
        Return home
      </Link>
    </section>
  );
}
