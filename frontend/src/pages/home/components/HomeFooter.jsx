//External Imports
import React from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

//Internal Imports
import logo from "../../../assets/emailLogo-nobg.png";

//lucide-react doesn't ship brand logos (trademark reasons), so these
//three are small hand-written SVGs instead of icon-library imports
const FacebookIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
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
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
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
    <div className="bg-(--body-bg) px-6 py-14 text-(--light-text) md:px-16">
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] md:gap-x-6">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <span
            className="flex items-center gap-x-2 font-bold
           text-(--other-blue)"
          >
            <img
              src={logo}
              alt="Logo"
              className="mr-1 size-8 rounded-full 
                              ring-3 ring-(--other-blue) "
            />
            Email Automation and Marketing Platform
          </span>
          <p className="mt-3 max-w-xs text-sm">
            Build powerful workflows, send campaigns, and track performance all
            in one simple platform.
          </p>
          <div className="mt-4 flex items-center gap-x-3">
            {SOCIAL_LINKS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-(--light-text) hover:bg-white/20 hover:text-white"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-3 font-semibold text-white">{col.title}</p>
            <ul className="flex flex-col gap-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFooter;
