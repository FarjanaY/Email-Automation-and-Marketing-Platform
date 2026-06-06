import {
  Bolt,
  PanelTop,
  PanelsTopLeft,
  Database,
  MapPin,
  Play,
  Images,
  MessageCircle,
  ShieldPlus,
  Lock,
  Users,
  TriangleAlert,
  CircleHelp,
  BookOpenText,
  BellDot,
  BriefcaseBusiness,
  Dessert,
  ShoppingBag,
  LayoutDashboard,
  Mail,
  Settings,
  FileText,
  BrainCircuit,
  LayoutTemplate,
  Phone,
} from "lucide-react";

export const NavMenus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Email Marketing",
    icon: Mail,
    submenu: [
      {
        name: "Campaigns",
        desc: "Center",
        path: "/campaigns",
        icon: CircleHelp,
      },
      {
        name: "Templates",
        desc: "Center",
        path: "/templates",
        icon: LayoutTemplate,
      },
      {
        name: "Automation",
        desc: "AI",
        path: "/automation",
        icon: BrainCircuit,
      },
    ],
  },
  {
    name: "Features",
    icon: PanelsTopLeft,

    subMenuHeading: ["Design", "Scale"],
    subMenu: [
      {
        name: "Design",
        path: "/dashboard",
        desc: "Responsive design",
        icon: PanelsTopLeft,
      },
      {
        name: "Management",
        desc: "Site control",
        path: "/dashboard",
        icon: Bolt,
      },
      {
        name: "Navigation",
        desc: "Link pages",
        path: "/dashboard",
        icon: PanelTop,
      },
      {
        name: "CMS",
        desc: "Management content",
        path: "/dashboard",
        icon: Database,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Resources",
    icon: Bolt,
    subMenuHeading: ["Get started", "Programs", "Recent"],
    subMenu: [
      {
        name: "Markplace",
        desc: "Browse templates",
        path: "/dashboard",
        icon: ShoppingBag,
      },
      {
        name: "Meetups",
        desc: "Upcoming events",
        path: "/dashboard",
        icon: MapPin,
      },
      {
        name: "Updates",
        desc: "Changelog",
        path: "/dashboard",
        icon: BellDot,
      },
      {
        name: "Academy",
        desc: "Watch lessions",
        path: "/dashboard",
        icon: Play,
      },
      {
        name: "Blog",
        desc: "Posts",
        path: "/dashboard",
        icon: BookOpenText,
      },
      {
        name: "Figma",
        desc: "Plugin",
        path: "/dashboard",
        icon: Play,
      },
      {
        name: "Experts",
        desc: "Jobs",
        path: "/dashboard",
        icon: BriefcaseBusiness,
      },
      {
        name: "Gallery",
        desc: "Images",
        path: "/dashboard",
        icon: Images,
      },
    ],
    gridCols: 3,
  },
  {
    name: "Support",
    icon: MessageCircle,
    subMenu: [
      {
        name: "Help",
        desc: "Center",
        path: "/dashboard",
        icon: CircleHelp,
      },
      {
        name: "Community",
        desc: "Project help",
        path: "/dashboard",
        icon: MessageCircle,
      },
      {
        name: "Emergency",
        desc: "Urgent issues",
        path: "/dashboard",
        icon: TriangleAlert,
      },
    ],
    gridCols: 1,
  },
  {
    name: "Enterprise",
    icon: TriangleAlert,
    subMenuHeading: ["Overview", "Features"],
    subMenu: [
      {
        name: "Enterprise",
        desc: "Overview",
        path: "/dashboard",
        icon: ShieldPlus,
      },
      {
        name: "Collaboration",
        desc: "Design together",
        path: "/dashboard",
        icon: Users,
      },
      {
        name: "Customers",
        desc: "Stories",
        path: "/dashboard",
        icon: Dessert,
      },
      {
        name: "Security",
        desc: "Your site secured",
        path: "/dashboard",
        icon: Lock,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Pricing",
    icon: Lock,
    path: "/dashboard",
  },
  {
    name: "Contact",
    icon: Phone,
    path: "/dashboard",
  },
];

// export const NavMenus = [
//   {
//     name: "Features",
//     subMenuHeading: ["Design", "Scale"],
//     subMenu: [
//       {
//         name: "Design",
//         desc: "Responsive Design",
//         icon: PanelsTopLeft,
//         nestedSubMenuHeading: ["Heading1", "Heading2"],
//         nestedSubMenu: [
//           {
//             name: "nested Menu1",
//             desc: "nested Menu1 Desc",
//             icon: PanelsTopLeft,
//           },
//           {
//             name: "nested Menu2",
//             desc: "nested Menu2 Desc",
//             icon: PanelsTopLeft,
//           },
//           {
//             name: "nested Menu3",
//             desc: "nested Menu3 Desc",
//             icon: PanelsTopLeft,
//           },
//           {
//             name: "nested Menu4",
//             desc: "nested Menu4 Desc",
//             icon: PanelsTopLeft,
//           },
//         ],
//         gridCols: 2,
//       },
//       {
//         name: "Management",
//         desc: "Site control",
//         icon: Bolt,
//         nestedSubMenuHeading: ["Heading1", "Heading2"],
//         nestedSubMenu: [
//           {
//             name: "nested Menu1",
//             desc: "nested Menu1 Desc",
//             icon: Bolt,
//           },
//           {
//             name: "nested Menu2",
//             desc: "nested Menu2 Desc",
//             icon: Bolt,
//           },
//         ],
//         gridCols: 1,
//       },
//     ],
//   },
// ];
