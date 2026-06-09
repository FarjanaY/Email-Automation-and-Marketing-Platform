import React from "react";

//Internal Imports
import logo from "../../../assets/emailLogo.webp";
import { NavMenus } from "../../../utils/data/navMenudata";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div>
      {/* <div className="">
        <DesktopMenu navMenus={NavMenus} />
      </div> */}
      <div className="lg:hidden">
        <MobileMenu navMainMenus={NavMenus} />
      </div>
    </div>
  );
};

export default Navbar;
