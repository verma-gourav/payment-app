import type { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
};

export const SidebarItem = ({
  icon,
  label,
  className = "",
  onClick,
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex text-gray-500 items-center gap-2 cursor-pointer hover:text-primary px-3 py-2 transition-colors ${className}`}
    >
      {icon}
      <span className="text-base font-medium">{label}</span>
    </button>
  );
};
