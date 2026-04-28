/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu } from "lucide-react";
import Logo from "./logo";

export default function Header({
  onMenuClick,
  user,
}: {
  onMenuClick: () => void;
  user?: any;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[1.5px] border-zinc-100 bg-white px-6 md:px-10 py-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-8">
        <Logo />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm">
          {user?.name.charAt(0).toUpperCase() ?? "U"}
        </div>

        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={onMenuClick}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
