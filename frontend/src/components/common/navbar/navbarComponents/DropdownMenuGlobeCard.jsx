import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import i18n from "i18next";

const DropdownMenuGlobeCard = () => {
  //Language Data
  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "bn",
      name: "Bangla",
    },
    {
      code: "fr",
      name: "French",
    },
    {
      code: "ar",
      name: "Arabic",
    },
  ];

  const [activeLanguage, setActiveLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage) {
      setActiveLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (languageCode) => {
    setActiveLanguage(languageCode);

    localStorage.setItem("language", languageCode);

    //i18n.changeLanguage(languageCode);
  };

  //Styling
  const getIconClass = (languageCode) =>
    `cursor-pointer flex items-center  p-3 pl-5  flex items-center 
                    gap-x-2 cursor-pointer 
                   
                     ${
                       activeLanguage === languageCode
                         ? "text-(--link-color) font-normal bg-(--link-color)/8"
                         : "hover:text-black/70 hover:bg-(--text-color)/7"
                     }`;

  return (
    <div className="text-[15px] py-1">
      <div
        className="absolute  right-0 top-15 left-0 w-auto 
        lg:w-100 lg:left-auto  bg-white rounded-md 
        dropdown-menu-box-shadow border  border-gray-200 z-50"
      >
        {languages.map((language) => (
          <div
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={getIconClass(language.code)}
          >
            <NavLink>{language.name}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenuGlobeCard;
