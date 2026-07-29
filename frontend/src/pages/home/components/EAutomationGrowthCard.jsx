//External Imports
import React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import HomeButton from "./HomeButton";

//Internal Imports

const FEATURES = [
  "Design visual automation workflows",
  "Launch targeted email campaigns",
  "Segment and manage your audience",
  "Optimize performance with real-time insights",
];

const PLANS = [
  {
    name: "Starter",
    description:
      "Perfect for individuals and small teams getting started with email automation.",
    price: "$19",
    highlighted: false,
    features: [
      "Up to 5,000 contacts",
      "Basic automation workflows",
      "Email campaign builder",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description:
      "Ideal for growing businesses that need more automation and insights.",
    price: "$49",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Advanced automation builder",
      "Audience segmentation",
      "A/B testing",
      "AI-powered insights",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    description: "Built for teams that need advanced control and scalability.",
    price: "$99",
    highlighted: false,
    features: [
      "Everything in Growth",
      "Unlimited contacts",
      "Advanced analytics dashboard",
      "Custom integrations",
      "Team collaboration",
      "Dedicated support",
    ],
  },
];

const EAutomationGrowthCard = () => {
  return (
    <div
      className="flex flex-col items-center  gap-y-10 
    gap-x-5 bg-(--body-bg) px-6 py-16 md:px-16 2xl:flex-row-reverse "
    >
      <div
        className="2xl:w-auto font-normal w-full
       md:px-6 2xl:min-w-lg "
      >
        <p
          className="mb-4 text-xl font-bold leading-tight
         text-black md:text-2xl lg:text-3xl text-center  2xl:text-left"
        >
          Use Email Automation For Growth.
        </p>
        <span
          className="mb-6 block text-sm text-(--text-color) 
        2xl:max-w-lg text-center  xl:text-left "
        >
          Design visual workflows, launch campaigns, and optimize performance
          all from one simple platform. Email Automation & Marketing Platform
          helps you automate, save time, and grow your communication
          effortlessly.
        </span>

        <p className="mb-3 font-bold text-(--card-heading-color)">
          What you can do with Email Automation & Marketing Platform?
        </p>
        <ul className="mb-6 flex flex-col gap-y-2 h-auto">
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-x-2 text-sm text-(--text-color)"
            >
              <Check
                size={16}
                strokeWidth={3}
                className="shrink-0 text-(--link-color)"
              />
              {feature}
            </li>
          ))}
        </ul>
        <div>
          <HomeButton
            buttonText="Explore Pricing"
            icon={<ArrowUpRight size={16} strokeWidth={2.5} fill="white" />}
            className={`orange-button md:py-2.5`}
          />
        </div>
      </div>

      <div className="flex justify-center w-full 2xl:w-auto  h-full">
        <div
          className="w-full  h-full overflow-hidden rounded-xl 
        bg-white dropdown-menu-box-shadow"
        >
          {/* Fake window chrome */}
          <div
            className="flex items-center gap-x-1.5 border-b 
          border-gray-100 px-4 py-3"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
          </div>

          <div className="p-5 text-center flex flex-col h-full">
            <p className="font-bold text-(--card-heading-color)">
              Simple And Transparent Pricing
            </p>
            <span className="text-xs text-(--light-text) pb-10">
              Choose a plan that fits your team, upgrade anytime.
            </span>

            <div
              className="grid grid-cols-1 gap-4 text-left 
            sm:grid-cols-3"
            >
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border 
                    hover:dropdown-menu-box-shadow p-1 ${
                      plan.highlighted
                        ? "border-(--link-color) bg-(--link-color)/30 "
                        : "border-gray-200 bg-(--light-text)/20"
                    }`}
                >
                  {plan.highlighted && (
                    <span
                      className="absolute -top-3 right-4 rounded-full 
                    bg-(--link-color) px-3 py-1 text-[10px] font-semibold text-white"
                    >
                      Most Popular
                    </span>
                  )}

                  <p className="font-bold text-(--card-heading-color) p-2">
                    {plan.name}
                  </p>

                  <div className={`rounded-md p-2 h-full bg-white `}>
                    <p className="mt-1 text-xs text-(--text-color) py-4">
                      {plan.description}
                    </p>

                    <div
                      className={` w-full rounded-xl flex-center flex-col p-2.5 ${
                        plan.highlighted
                          ? "border-(--link-color) bg-(--link-color)/30 "
                          : "bg-(--light-text)/20"
                      }`}
                    >
                      <p className="mt-2 text-2xl font-bold text-(--card-heading-color)">
                        {plan.price}
                        <span className="text-xs font-normal text-(--light-text)">
                          {" "}
                          /month
                        </span>
                      </p>
                      <button
                        type="button"
                        className={`mt-3 flex items-center justify-center gap-x-1 
                      rounded-4xl py-2 text-xs w-full font-semibold ${
                        plan.highlighted
                          ? "bg-(--link-color) text-white"
                          : "border border-gray-200 bg-white text-(--card-heading-color)"
                      }`}
                      >
                        Get Started
                        <ArrowUpRight size={12} />
                      </button>
                    </div>

                    <ul className="mt-4 flex flex-col gap-y-2">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-x-1 text-xs text-(--text-color)"
                        >
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="mt-0.5 shrink-0 text-(--link-color)"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EAutomationGrowthCard;
