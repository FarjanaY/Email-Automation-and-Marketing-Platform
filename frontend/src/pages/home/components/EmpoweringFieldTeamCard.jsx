//External Imports
import React from "react";
import {
  Mail,
  User,
  Zap,
  MailOpen,
  Clock,
  RefreshCw,
  MoreVertical,
  TrendingUp,
  Percent,
  PenLine,
  Users,
  Plus,
} from "lucide-react";

//Internal Imports
import AutomationsProgressCard from "./AutomationsProgressCard";
import PlusGridBackground from "./PlusGridBackground";

const StatCard = ({ icon, label, value, delta }) => (
  <div
    className="flex h-auto flex-1 flex-col justify-center w-full items-center
  rounded-md bg-white p-2  xl:px-7 xl:py-4 dropdown-menu-box-shadow"
  >
    <div
      className="mb-3 flex items-center justify-between 
    text-xs text-(--text-color) h-auto  w-full"
    >
      <span className="flex items-center gap-x-1 md:gap-x-1.5 font-semibold">
        {icon} {label}
      </span>
      <MoreVertical size={14} />
    </div>
    <div className="flex items-center justify-between w-full ">
      <span
        className="text-lg md:text-2xl font-bold 
      text-(--card-heading-color)"
      >
        {value}
      </span>
      <span className="flex items-center gap-x-0.5 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-600">
        <TrendingUp size={11} /> {delta}
      </span>
    </div>
  </div>
);

const CAMPAIGNS = [
  {
    name: "Spring Sale Launch",
    status: "Active",
    sent: "2,450",
    opens: "1,089",
  },
  {
    name: "Weekly Newslett...",
    status: "Scheduled",
    sent: "2,450",
    opens: "1,089",
  },
  {
    name: "Abandoned Cart...",
    status: "Active",
    sent: "2,450",
    opens: "1,089",
  },
  {
    name: "Product Update...",
    status: "Completed",
    sent: "2,450",
    opens: "1,089",
  },
];

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-700",
  Scheduled: "bg-(--link-color)/10 text-(--link-color)",
  Completed: "bg-gray-100 text-gray-500",
};

const NodeBadge = ({ icon, label, color }) => (
  <span
    className="inline-flex items-center gap-x-1 px-1 py-0.3 rounded-xs
    text-white text-[11px] font-semibold mb-1.5"
    style={{ backgroundColor: color }}
  >
    {icon} {label}
  </span>
);

const NodeCard = ({ icon, text }) => (
  <div
    className="bg-(--card-body-bg) rounded-md border border-gray-200 px-2 py-1
    flex items-center gap-x-2 text-xs font-semibold text-black"
  >
    {icon} {text}
  </div>
);

const EmpoweringFieldTeamCard = () => {
  const ACCENT = "#5a5dfe";
  const DELAY_COLOR = "#db5825";
  const iconProps = { size: 11, strokeWidth: 2.5 };
  const nodeIconProps = { size: 14, strokeWidth: 2.5 };

  return (
    <div className="overflow-x-hidden py-5">
      <div
        className="flex flex-col text-center py-5 gap-y-2 bg-white px-8 md:py-12
         lg:items-center lg:justify-between lg:px-20"
      >
        <p
          className=" text-2xl font-bold 
        leading-tight text-black md:text-3xl"
        >
          Empowering Field Teams, Not Just Desks
        </p>
        <span className="text-sm text-(--text-color) pb-4 md:pb-0">
          Empower your field teams with intuitive tools. Design dynamic
          workflows, automate tasks, and drive efficiency from anywhere.
        </span>
      </div>

      <div className="px-6 lg:px-8 xl:px-16 border-y border-gray-200">
        <div className="border-x border-gray-200 mx-4">
          {/* Heading/title */}
          <PlusGridBackground colWidths={[2, 2, 2]} rows={5} />
          <div>
            {/* Finally Automation */}
            <div
              className="relative flex flex-col items-center 
              gap-x-10 gap-y-4 md:gap-y-10 border-gray-200 bg-(--body-bg)
              px-2 py-4 md:py-8 md:flex-row md:px-6"
            >
              <div className="md:w-1/2 text-center ">
                <p
                  className="mb-4 text-xl font-bold 
                leading-tight text-black md:text-2xl"
                >
                  Finally, email automation that actually makes sense.
                </p>
                <span
                  className="mb-4 block text-sm 
                text-(--text-color)"
                >
                  Build workflows visually, not technically. Create campaigns,
                  triggers, and logic in a way your team can actually
                  understand.
                </span>
                <span className="block text-sm text-(--text-color)">
                  Triggers, emails, delays, and conditons everything works
                  together seamlessly, without complexity.
                </span>
              </div>

              <div className="flex justify-center md:w-1/2">
                {/* Mobile/tablet — simple vertical stack, no absolute
                    positioning or connectors needed at this width */}
                <div className="flex w-full flex-col gap-y-3 md:hidden">
                  <div className="w-full rounded-md bg-white p-3 dropdown-menu-box-shadow">
                    <NodeBadge
                      icon={<Mail {...iconProps} />}
                      label="Trigger"
                      color={ACCENT}
                    />
                    <NodeCard
                      icon={<User {...nodeIconProps} />}
                      text="User Signs Up"
                    />
                  </div>
                  <div className="w-full rounded-md bg-white p-3 dropdown-menu-box-shadow">
                    <NodeBadge
                      icon={<Zap {...iconProps} />}
                      label="Action"
                      color={ACCENT}
                    />
                    <NodeCard
                      icon={<MailOpen {...nodeIconProps} />}
                      text="Send Welcome Email"
                    />
                  </div>
                  <div className="flex gap-x-3">
                    <div className="flex-1 rounded-md bg-white p-3 dropdown-menu-box-shadow">
                      <NodeBadge
                        icon={<Clock {...iconProps} />}
                        label="Delay"
                        color={DELAY_COLOR}
                      />
                      <NodeCard
                        icon={<Clock {...nodeIconProps} />}
                        text="Wait 2 days"
                      />
                    </div>
                    <div className="flex-1 rounded-md bg-white p-3 dropdown-menu-box-shadow">
                      <NodeBadge
                        icon={<RefreshCw {...iconProps} />}
                        label="Action"
                        color={ACCENT}
                      />
                      <NodeCard
                        icon={<RefreshCw {...nodeIconProps} />}
                        text="Send Follow-up"
                      />
                    </div>
                  </div>
                </div>

                {/* md: and up — the full branching diagram */}
                <div className="relative hidden h-75 w-full md:block">
                  {/* Connector lines — each moves straight toward its target
                  with a single corner, no backtracking past the node it
                  starts from */}
                  <svg
                    width="460"
                    height="300"
                    viewBox="0 0 460 300"
                    className="absolute inset-0 z-10"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <marker
                        id="arrow-automation"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="2.5"
                          fill="white"
                          stroke="#9ca3af"
                          strokeWidth="1.5"
                        />
                      </marker>
                    </defs>
                    {/* Node 1 -> Node 2 */}
                    <path
                      d="M 176 50 H 198 Q 208 50 208 60 V 104 Q 208 114 218 114 H 220"
                      fill="none"
                      stroke="#d1d5db"
                      strokeWidth="2"
                      markerStart="url(#arrow-automation)"
                      markerEnd="url(#arrow-automation)"
                    />
                    {/* Node 2 -> Node 3 */}
                    <path
                      d="M 250 148 V 160 Q 250 170 240 170 H 90 Q 80 170 80 180 V 190"
                      fill="none"
                      stroke="#d1d5db"
                      strokeWidth="2"
                      markerStart="url(#arrow-automation)"
                      markerEnd="url(#arrow-automation)"
                    />
                    {/* Node 2 -> Node 4 */}
                    <path
                      d="M 320 148 V 165 Q 320 175 310 175 H 300 Q 290 175 290 185 V 190"
                      fill="none"
                      stroke="#d1d5db"
                      strokeWidth="2"
                      markerStart="url(#arrow-automation)"
                      markerEnd="url(#arrow-automation)"
                    />
                  </svg>

                  {/* Node 1 - Trigger */}
                  <div
                    className="absolute left-0 top-0 w-[38%] bg-white
              dropdown-menu-box-shadow p-3 rounded-md"
                  >
                    <NodeBadge
                      icon={<Mail {...iconProps} />}
                      label="Trigger"
                      color={ACCENT}
                    />
                    <NodeCard
                      icon={<User {...nodeIconProps} />}
                      text="User Signs Up"
                    />
                  </div>

                  {/* Node 2 - Action */}
                  <div
                    className="absolute left-[48%] top-20 w-[45%] bg-white
              dropdown-menu-box-shadow p-3 rounded-md"
                  >
                    <NodeBadge
                      icon={<Zap {...iconProps} />}
                      label="Action"
                      color={ACCENT}
                    />
                    <NodeCard
                      icon={<MailOpen {...nodeIconProps} />}
                      text="Send Welcome Email"
                    />
                  </div>

                  {/* Node 3 - Delay */}
                  <div
                    className="absolute left-0 top-47.5 w-[35%] bg-white
              dropdown-menu-box-shadow p-3 rounded-md"
                  >
                    <NodeBadge
                      icon={<Clock {...iconProps} />}
                      label="Delay"
                      color={DELAY_COLOR}
                    />
                    <NodeCard
                      icon={<Clock {...nodeIconProps} />}
                      text="Wait 2 days"
                    />
                  </div>

                  {/* Node 4 - Action */}
                  <div
                    className="absolute left-[46%] top-47.5 w-[38%] bg-white
              dropdown-menu-box-shadow p-3 rounded-md"
                  >
                    <NodeBadge
                      icon={<RefreshCw {...iconProps} />}
                      label="Action"
                      color={ACCENT}
                    />
                    <NodeCard
                      icon={<RefreshCw {...nodeIconProps} />}
                      text="Send Follow-up"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tools you will love */}
            <div
              className="relative flex flex-col items-center 
              gap-x-10 gap-y-4 md:gap-y-10 border-t border-gray-200 bg-(--body-bg)
              px-2 py-4 md:py-8 md:flex-row md:px-6"
            >
              <div className="md:w-1/2 text-center">
                <p
                  className="mb-4 text-center text-xl font-bold 
                leading-tight text-black md:text-2xl"
                >
                  Tools you will love to use everyday
                </p>
                <span className="mb-4 block text-sm text-(--text-color)">
                  Clean, fast, and intuitive. Interfaces built to make your
                  workflow easier from these start. No training needed.
                </span>
                <span className="block text-sm text-(--text-color)">
                  Triggers, emails, delays, and conditions everything works
                  together seamlessly, without complexity
                </span>
              </div>

              <div
                className="flex flex-col gap-y-2 md:gap-y-4
               w-full md:w-1/2 h-auto"
              >
                <div className="flex gap-x-2 md:gap-x-4  h-auto w-full">
                  <StatCard
                    icon={<Mail size={14} />}
                    label="Total Campaigns"
                    value="24"
                    delta="+12%"
                  />
                  <StatCard
                    icon={<Users size={14} />}
                    label="Active Contacts"
                    value="8,429"
                    delta="+23%"
                  />
                </div>

                <div className="rounded-md bg-white p-4 dropdown-menu-box-shadow w-full">
                  <p className="mb-3 font-semibold text-(--card-heading-color)">
                    Recent Campaigns
                  </p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-(--light-text) font-bold">
                        <th className="pb-2 font-normal">Campaign</th>
                        <th className="pb-2 font-normal">Status</th>
                        <th className="pb-2 font-normal">Sent</th>
                        <th className="pb-2 font-normal">Opens</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAMPAIGNS.map((c) => (
                        <tr
                          key={c.name}
                          className="border-t border-(--text-color)/10 text-xs xl:text-sm"
                        >
                          <td className="py-2 text-(--card-heading-color)">
                            {c.name}
                          </td>
                          <td className="py-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[c.status]}`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-2 text-(--text-color)">{c.sent}</td>
                          <td className="py-2 text-(--text-color)">
                            {c.opens}
                          </td>
                          <td className="py-2 text-right">
                            <MoreVertical
                              size={14}
                              className="inline text-(--light-text)"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Turn data into smarter decision */}
            <div
              className="relative flex flex-col items-center
              gap-x-10 gap-y-4 md:gap-y-10 border-t border-gray-200 bg-(--body-bg)
              px-2 py-4 md:py-8 md:flex-row md:px-6"
            >
              <div className="md:w-1/2 text-center">
                <p
                  className="mb-4 text-xl font-bold 
                leading-tight text-black md:text-2xl"
                >
                  Turn data into smarter decisions
                </p>
                <span className="mb-4 block text-sm text-(--text-color)">
                  Understand what's working and what's not with clear,
                  actionable insights. Improve open rates, optimize timing, and
                  refine your messaging effortlessly.
                </span>
                <span className="block text-sm text-(--text-color)">
                  Built-in intelligence helps you grow faster without guesswork.
                </span>
              </div>

              <div
                className="grid grid-cols-1 gap-y-4 w-full
                justify-center md:grid-rows-1 md:gap-x-2 h-auto 
                md:grid-cols-[0.9fr_0.6fr] md:w-1/2 md:gap-y-2 "
              >
                {/* Top Automations - reused component
                    Mobile: normal stacking order (1st card, full width)
                    sm:+ : spans both rows in column 1 */}
                <div
                  className="w-full dropdown-menu-box-shadow
                  hover:shadow-none rounded-lg h-auto 
                  md:col-start-1 md:row-span-2"
                >
                  <AutomationsProgressCard />
                </div>

                {/* Avg. Open Rate
                    Mobile: 2nd card, full width
                    sm:+ : column 2, row 1 */}
                <div className="h-auto md:col-start-2 md:row-start-2 ">
                  <StatCard
                    icon={<Percent size={14} />}
                    label="Avg. Open Rate"
                    value="42.8%"
                    delta="+5.2%"
                    className="py-4"
                  />
                </div>

                {/* AI Insights
                    Mobile: 3rd card, full width
                    sm:+ : column 2, row 2 */}
                <div
                  className="h-auto rounded-md bg-white p-2
                  md:py-4 md:px-4 dropdown-menu-box-shadow
                  md:col-start-2 md:row-start-1 "
                >
                  <p
                    className="mb-1 font-semibold text-(--card-heading-color) 
                  text-center md:text-left"
                  >
                    AI Insights
                  </p>
                  <div className="mb-3 flex flex-col gap-y-3">
                    <div className="flex items-start gap-x-2 text-sm">
                      <Clock
                        size={14}
                        className="mt-0.5 shrink-0 text-(--link-color)"
                      />
                      <div
                        className="flex md:flex-col justify-between w-full 
                      md:justify-start"
                      >
                        <p className="font-medium text-(--card-heading-color)">
                          Best Send Time
                        </p>
                        <span className="text-xs text-(--light-text)">
                          Tuesday at 10 AM shows...
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-2 text-sm">
                      <PenLine
                        size={14}
                        className="mt-0.5 shrink-0 text-(--link-color)"
                      />
                      <div className="flex md:flex-col justify-between w-full md:justify-start">
                        <p className="font-medium text-(--card-heading-color)">
                          Subject Line Tip
                        </p>
                        <span className="text-xs text-(--light-text)">
                          Adding personalization to...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpoweringFieldTeamCard;
