import { Outlet } from "react-router-dom";
import Header from "@/header";

export default function StoreLayout() {
  return (
    <div className="mx-auto min-h-dvh w-[calc(100%-2rem)] max-w-[1700px]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
