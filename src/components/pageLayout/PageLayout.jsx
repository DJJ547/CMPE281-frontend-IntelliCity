import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function PageLayout({ children }) {
  return (
    <div className="w-full bg-slate-100">
      <div className="relative w-full top-0">
        <Topbar />
      </div>
      <div className="flex w-full h-auto">
        <Sidebar />
        <main className="m-[1rem]">{children}</main>
      </div>
    </div>
  );
}
