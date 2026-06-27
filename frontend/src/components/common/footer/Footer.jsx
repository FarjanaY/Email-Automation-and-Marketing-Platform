import React from "react";

const Footer = () => {
  return (
    // <div
    //   className="fixed bottom-0 left-0 right-0 text-(--text-color)
    //  text-sm"
    // >
    <footer
      className=" pl-[1%] bg-(--body-bg) backdrop-blur-3xl 
    text-(--text-color)  text-sm lg:text-[15px] "
    >
      <div class="p-2 px-3 lg:px-4">
        © <span>June </span>2026, made with ❤️ by{" "}
        <a href="" target="_blank" className="font-bold ">
          Farjana Yeasmin
        </a>
      </div>
    </footer>
  );
};

export default Footer;
