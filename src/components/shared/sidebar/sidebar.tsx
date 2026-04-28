import clsx from "clsx";
import {
  Building,
  CalendarHeart,
  ClockFading,
  DoorClosed,
  Home,
  MapPinned,
  NotebookPen,
  Search,
  Settings2,
  TriangleAlert,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Perusahaan", icon: Building, path: "/companies" },
  { label: "Data karyawan", icon: Users, path: "/employees" },
  { label: "Izin & cuti", icon: NotebookPen, path: "/time-offs" },
  { label: "Kehadiran", icon: CalendarHeart, path: "/attendances" },
  { label: "Kunjungan", icon: MapPinned, path: "/visits" },
  { label: "Shift", icon: ClockFading, path: "/shifts" },
  {
    label: "Sanksi / pelanggaran",
    icon: TriangleAlert,
    path: "/employee-sanctions",
  },
  { label: "Pengaturan", icon: Settings2, path: "/settings" },
];

export default function Sidebar() {
  const [filteredMenu, setFilteredMenu] = useState(menuItems);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    const result = menuItems.filter((el) =>
      el.label.toLowerCase().includes(key.toLowerCase()),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredMenu(result);
  }, [key]);

  const pathname = usePathname();
  const router = useRouter();
  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/");

  return (
    <div className="py-6">
      <h1 className="text-2xl font-medium mb-3 tracking-wide px-6 md:px-10">
        Menu admin
      </h1>
      <div className="px-6 md:px-8 mb-6">
        <div className="flex items-center rounded-full border border-gray-300 px-4 py-4 focus-within:border-gray-400">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            placeholder="Search menu ..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-scroll px-6 md:px-5 transition-all ease-out">
        {filteredMenu.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              href={item.path}
              key={index}
              className={clsx(
                "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200",
                isActive(item.path)
                  ? "bg-zinc-100 font-medium"
                  : "hover:bg-zinc-50",
              )}
            >
              <Icon
                className="w-6 h-6 text-zinc-700"
                strokeWidth={isActive(item.path) ? 2 : 1.5}
              />
              <span className="text-base text-zinc-800">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="border-t my-3 mx-6 md:mx-10" />

      <div className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer  hover:bg-zinc-50 transition-all mx-6 md:mx-10">
        <DoorClosed className="w-5 h-5 text-destructive" />
        <span className="text-base text-destructive">Logout</span>
      </div>
    </div>
  );
}
