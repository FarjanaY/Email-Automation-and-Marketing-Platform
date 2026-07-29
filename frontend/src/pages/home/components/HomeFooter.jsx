//External Imports
import React from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

//Internal Imports
import logo from "../../../assets/emailLogo-nobg.png";

//lucide-react doesn't ship brand logos (trademark reasons), so these
//three are small hand-written SVGs instead of icon-library imports
const currentColor = "#fff";
const FacebookIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={currentColor}
    aria-hidden="true"
  >
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
  </svg>
);

const InstagramIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={currentColor}
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill={currentColor} stroke="none" />
  </svg>
);

const XIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={currentColor}
    aria-hidden="true"
  >
    <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.6L4.5 22H1.4l8.1-9.3L1 2h7l4.9 6.1L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
  </svg>
);

const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: ["Features", "Pricing", "Integrations", "Updates"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Help Center", "API", "Community"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookies Policy"],
  },
];

const SOCIAL_LINKS = [FacebookIcon, InstagramIcon, XIcon];

const HomeFooter = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white flex flex-col w-full
   px-3 pb-3 sm:px-5  items-center justify-between"
    >
      <div
        className="bg-(--light-text)/5 w-full border border-gray-200
      grid grid-cols-1 px-3 md:px-10 rounded-lg py-4
      xl:grid-cols-[2fr_3fr] xl:items-start xl:gap-x-12 "
      >
        {/* Logo / tagline / social — always its own block,
            takes 40% width once xl: puts it side-by-side with the links */}
        <div className="flex-center flex-col pb-0 ">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex items-center gap-x-2 justify-center xl:w-full  cursor-pointer"
          >
            <span
              className="font-bold flex items-center xl:justify-start gap-x-2
           text-(--link-color) text-center xl:w-full xl:text-left xl:gap-x-1"
            >
              <img src={logo} alt="Logo" className="size-8 rounded-full" />
              Email Automation and Marketing Platform
            </span>
          </div>
          <p
            className="max-w-md lg:max-w-xs text-sm text-center pl-1 xl:max-w-full 
           xl:text-left"
          >
            Build powerful workflows, send campaigns, and track performance all
            in one simple platform.
          </p>
          <div
            className="flex items-center justify-center  pl-1
          gap-x-3 xl:items-center xl:justify-start xl:w-full mt-3 xl:mt-2"
          >
            {SOCIAL_LINKS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="flex-center h-7 w-7 fill-(--link-color)
                 rounded-full text-(--light-text)
                  orange-button cursor-pointer"
              >
                <Icon size={18} fill="" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns — mobile: 2x2 grid, md: single row of 4,
            xl: still a row of 4, now sharing the remaining 60% width */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p
                className="mb-1.5 font-semibold md:text-left 
                text-center text-sm
              text-(--card-heading-color) "
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-y-1 text-xs  text-center md:text-left">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-(--card-heading-color) hover:font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
