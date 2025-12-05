"use client";
import { PackageIcon, ListOrderedIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function sellerDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border p-2 grow  ">
      <div className="border p-2 flex gap-2 grow">
        <div className="left flex flex-col border w-max gap-2 p-2">
          <Link href={"/seller/dashboard"} className="flex border p-2 gap-2">
            <span>
              <LayoutDashboard />
            </span>
          </Link>
          <Link
            href={"/seller/manageProduct"}
            className="flex border p-2 gap-2"
          >
            <span>
              <PackageIcon />
            </span>
          </Link>
          <Link href={"/seller/manageOrders"} className="flex border p-2 gap-2">
            <span>
              <ListOrderedIcon />
            </span>
          </Link>
        </div>
        <div className="grow overflow-scroll max-h-[calc(100vh-136px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
