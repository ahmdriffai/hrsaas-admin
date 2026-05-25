"use client";
import Badge from "@/components/ui/badge/badge";
import { useSearchTimeOffAppr } from "@/features/time-off-approval/hooks/use-search-timeoffappr";
import { useCurrentUser } from "@/features/user/hooks/use-current-user";
import { useLogout } from "@/features/user/hooks/use-logout";
import clsx from "clsx";
import {
  Building,
  CheckCircle,
  DoorClosed,
  Home,
  LucideIcon,
  MapPinned,
  NotebookPen,
  Search,
  Settings2,
  TriangleAlert,
  UserLock,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type Menu = {
  label: string;
  icon: LucideIcon;
  path: string;
  totalData?: number;
  permission?: string;
};

export default function Sidebar() {
  const { data: timeOffApproval } = useSearchTimeOffAppr({
    page: 1,
    size: 100,
    status: "PENDING",
  });

  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const currentUser = useCurrentUser();
  const userPermissions = useMemo(
    () => new Set(currentUser?.permissions?.map((p) => p.name) ?? []),
    [currentUser],
  );

  const pathname = usePathname();
  const [key, setKey] = useState("");

  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(url + "/");

  const menuItems: Menu[] = useMemo(
    () => [
      { label: "Dashboard", icon: Home, path: "/dashboard" },
      {
        label: "Perusahaan",
        icon: Building,
        path: "/companies",
        permission: "COMPANIES",
      },
      {
        label: "Data karyawan",
        icon: Users,
        path: "/employees",
        permission: "EMPLOYEES",
      },
      {
        label: "Izin & cuti",
        icon: NotebookPen,
        path: "/time-offs",
        permission: "TIME_OFF_REQUESTS",
      },
      {
        label: "Persetujuan Izin & cuti",
        icon: CheckCircle,
        path: "/time-off-approvals",
        totalData: timeOffApproval?.data?.length ?? 0,
        permission: "TIME_OFF_APPROVALS",
      },
      // { label: "Kehadiran", icon: CalendarHeart, path: "/attendances" },
      {
        label: "Kunjungan",
        icon: MapPinned,
        path: "/visits",
        permission: "VISITS",
      },
      {
        label: "Sanksi / pelanggaran",
        icon: TriangleAlert,
        path: "/employee-sanctions",
        permission: "EMPLOYEE_SANCTIONS",
      },
      {
        label: "User Menajemen",
        icon: UserLock,
        path: "/users",
        permission: "USERS",
      },
      {
        label: "Pengaturan",
        icon: Settings2,
        path: "/settings",
        permission: "SETTINGS",
      },
    ],
    [timeOffApproval],
  );

  const filteredMenu = useMemo(() => {
    return menuItems.filter((el) => {
      if (!el.label.toLowerCase().includes(key.toLowerCase())) return false;
      if (!el.permission) return true;
      return userPermissions.has(el.permission);
    });
  }, [key, menuItems, userPermissions]);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-medium mb-3 tracking-wide px-6 md:px-10">
        Menu admin
      </h1>

      {/* Search */}
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

      {/* Menu */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto px-6 md:px-5">
        {filteredMenu.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              href={item.path}
              key={index}
              className={clsx(
                "flex items-center justify-between p-4 rounded-2xl transition-all duration-200",
                active ? "bg-zinc-100 font-medium" : "hover:bg-zinc-50",
              )}
            >
              <div className="flex items-center gap-4">
                <Icon
                  className="w-6 h-6 text-zinc-700"
                  strokeWidth={active ? 2 : 1.5}
                />
                <span className="text-base text-zinc-800">{item.label}</span>
              </div>

              {/* ✅ Badge fix */}
              {item.totalData !== undefined && item.totalData > 0 && (
                <Badge variant="danger" className="bg-destructive! text-white!">
                  {item.totalData}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t my-3 mx-6 md:mx-10" />

      {/* Logout */}
      <button
        onClick={() => logout()}
        disabled={isLoggingOut}
        className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-zinc-50 transition-all mx-6 md:mx-10 w-[calc(100%-3rem)] disabled:opacity-50"
      >
        <DoorClosed className="w-5 h-5 text-red-500" />
        <span className="text-base text-red-500">
          {isLoggingOut ? "Keluar..." : "Logout"}
        </span>
      </button>
    </div>
  );
}
