//External Imports
import React, { useState } from "react";
import { Plus, Minus, Play } from "lucide-react";
import HomeButton from "./HomeButton";

//Internal Imports

const FAQS = [
  {
    question: "What is Email Automation & Marketing Platform used for?",
    answer:
      "Email Automation & Marketing Platform helps you design email workflows, launch campaigns, and track performance all from one simple platform — no technical skills required.",
  },
  {
    question:
      "Do I need technical skills to use Email Automation & Marketing Platform?",
    answer:
      "Not at all. Email Automation & Marketing Platform's visual builder lets you create automations by dragging and connecting steps — no code needed.",
  },
  {
    question: "Can I manage multiple campaigns at once?",
    answer:
      "Yes, you can create, schedule, and track as many campaigns as you need from a single dashboard.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, every plan starts with a free trial so you can explore Email Automation & Marketing Platform before committing to a paid plan.",
  },
  {
    question:
      "How does automation work in Email Automation & Marketing Platform?",
    answer:
      "You set a trigger (like a signup), then chain actions, delays, and conditions together — Email Automation & Marketing Platform handles the rest automatically.",
  },
  {
    question: "Does Email Automation & Marketing Platform provide analytics?",
    answer:
      "Yes, every campaign includes open rates, click rates, and engagement trends so you always know what's working.",
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-gray-100 py-4">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full cursor-pointer items-center justify-between text-left"
    >
      <span className="font-semibold text-(--card-heading-color)">
        {item.question}
      </span>
      {isOpen ? (
        <Minus size={16} className="shrink-0 text-(--link-color)" />
      ) : (
        <Plus size={16} className="shrink-0 text-(--light-text)" />
      )}
    </button>
    {isOpen && (
      <p className="mt-2 text-sm text-(--text-color)">{item.answer}</p>
    )}
  </div>
);

const FAQCard = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const leftColumn = FAQS.slice(0, 3);
  const rightColumn = FAQS.slice(3);

  return (
    <div className="bg-(--body-bg) py-6 px-6 md:py-8 lg:py-16 md:px-16">
      <div
        className="mb-10 flex flex-col items-center gap-y-4 
      text-center md:flex-row md:items-start 
      md:justify-between md:text-left"
      >
        <div>
          <p className="text-xl md:text-2xl font-bold text-black lg:text-3xl">
            Frequently Asked Questions
          </p>
          <span className="mt-1 block max-w-md text-sm text-(--text-color) py-2">
            Everything you need to know about Email Automation & Marketing
            Platform — from getting started to scaling your email automation.
          </span>
        </div>
        <div className="flex flex-col items-center gap-y-2 md:items-end">
          <span className="text-sm font-semibold text-(--card-heading-color)">
            Still Have Questions?
          </span>
          <HomeButton
            buttonText="Contact Us"
            className={`gn-button-shadow md:py-2
                 text-white  flex-row-reverse`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-10 rounded-lg bg-white p-6 dropdown-menu-box-shadow md:grid-cols-2">
        <div>
          {leftColumn.map((item) => {
            const index = FAQS.indexOf(item);
            return (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
              />
            );
          })}
        </div>
        <div>
          {rightColumn.map((item) => {
            const index = FAQS.indexOf(item);
            return (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQCard;
