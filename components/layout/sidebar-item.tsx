"use client";

import { SidebarItemProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function SidebarItem({
  icon: Icon,
  label,
  href,
  collapsed,
  children, // Nested items
}: SidebarItemProps) {
  const pathname = usePathname();
  const isParentActive = pathname?.startsWith(href);
  const [open, setOpen] = useState(isParentActive); // open if URL is active

  useEffect(() => {
    if (isParentActive) setOpen(true);
  }, [isParentActive]);

  const toggleOpen = () => setOpen((prev) => !prev);

  const ItemContent = (
    <div
      className={`flex text-base items-center justify-between gap-2 px-4 py-4 rounded-md transition-colors duration-200 cursor-pointer ${
        isParentActive
          ? "bg-gradient-to-r from-primary to-secondary text-white"
          : "text-fourth dark:text-white hover:bg-primary hover:text-white"
      }`}
      onClick={children ? toggleOpen : undefined}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <motion.span
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -20 : 0 }}
          transition={{ duration: 0.3 }}
          className={`font-medium text-sm ${collapsed ? "hidden" : "block"}`}
        >
          {label}
        </motion.span>
      </div>
      {!collapsed && children && (
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          className="transition-transform"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      )}
    </div>
  );

  return (
    <div>
      {children ? (
        <>
          {ItemContent}
          <AnimatePresence>
            {open && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-1 flex flex-col gap-2 border border-primary dark:border-gray-700 rounded-md p-2"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link href={href}>{ItemContent}</Link>
      )}
    </div>
  );
}
