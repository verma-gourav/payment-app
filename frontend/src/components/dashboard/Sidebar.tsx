import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../assets/icons/Card";
import History from "../../assets/icons/History";
import Logout from "../../assets/icons/Logout";
import Services from "../../assets/icons/Services";
import Setting from "../../assets/icons/Setting";
import { SidebarItem } from "./SidebarItems";
import X from "../../assets/icons/X";
import Menu from "../../assets/icons/Menu";

interface SidebarProps {
  profile: any;
  onLogout: () => void;
}

const Sidebar = ({ profile, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    navigate("/auth?mode=signin");
  };

  return (
    <>
      {/* Hamburger icon for small screens */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-sm">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
        <h1 className="font-bold text-xl text-primary">Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-white shadow-md md:shadow-none
          flex flex-col justify-between p-6 transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
          w-3/5 sm:w-2/5 md:w-1/6`}
      >
        <div>
          <div className="flex flex-col items-center mb-8 mt-4 md:mt-0">
            <div className="w-20 h-20 rounded-full bg-light mb-3"></div>
            <h2 className="font-bold text-lg text-center">
              {profile.user.firstName} {profile.user.lastName}
            </h2>
            <p className="text-sm text-gray-500">@{profile.user.username}</p>
          </div>

          <div className="flex flex-col mt-20 gap-3">
            <SidebarItem icon={<Services />} label="Services" />
            <SidebarItem icon={<Card />} label="Cards" />
            <SidebarItem icon={<History />} label="History" />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-20">
          <SidebarItem icon={<Setting />} label="Settings" />
          <SidebarItem
            icon={<Logout />}
            label="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40 md:hidden transition-all"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
