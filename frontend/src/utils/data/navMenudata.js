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
  User,
  LogOut,
  LogOutIcon,
  Power,
} from "lucide-react";

export const NavMenus = [
  {
    mainMenu: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        action: "Forms",
      },
      {
        name: "Layouts",
        icon: LayoutDashboard,
        path: "/layout",
        action: "Forms",
      },
      {
        name: "Email Marketing",
        icon: Mail,
        subMenu: [
          {
            name: "Campaigns",
            desc: "Center",
            path: "/campaigns",
            action: "Forms",
            icon: CircleHelp,
          },
          {
            name: "Templates",
            desc: "Center",
            path: "/templates",
            action: "Forms",
            icon: LayoutTemplate,
          },
          {
            name: "Automation",
            desc: "AI",
            path: "/automation",
            action: "Forms",
            icon: BrainCircuit,
          },
        ],
      },
    ],
  },

  {
    name: "Apps & Pages",
    mainMenu: [
      {
        name: "Email Platform",
        icon: Mail,
        subMenu: [
          {
            name: "Campaigns",
            desc: "Center",
            path: "/campaigns",
            action: "Forms",
            icon: CircleHelp,
          },
          {
            name: "Templates",
            desc: "Center",
            path: "/templates",
            action: "Forms",
            icon: LayoutTemplate,
          },
          {
            name: "Automation",
            desc: "AI",
            path: "/automation",
            action: "Forms",
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
            action: "Forms",
            desc: "Responsive design",
            icon: PanelsTopLeft,
          },
          {
            name: "Management",
            desc: "Site control",
            path: "/dashboard",
            action: "Forms",
            icon: Bolt,
          },
          {
            name: "Navigation",
            desc: "Link pages",
            path: "/dashboard",
            action: "Forms",
            icon: PanelTop,
          },
          {
            name: "CMS",
            desc: "Management content",
            path: "/dashboard",
            action: "Forms",
            icon: Database,
          },
        ],
        gridCols: 2,
      },
      {
        name: "Users",
        icon: User,

        subMenuHeading: ["Design", "Scale"],
        subMenu: [
          {
            name: "Profile",
            path: "/profile",
            action: "profile",
            desc: "User Profile Page design",
            icon: User,
          },
          {
            name: "Management",
            desc: "Site control",
            path: "/dashboard",
            action: "Forms",
            icon: Bolt,
          },
          {
            name: "Navigation",
            desc: "Link pages",
            path: "/dashboard",
            action: "Forms",
            icon: PanelTop,
          },
          {
            name: "CMS",
            desc: "Management content",
            path: "/dashboard",
            action: "Forms",
            icon: Database,
          },
        ],
        gridCols: 2,
      },
    ],
  },
  {
    name: "Components",
    mainMenu: [
      {
        name: "Resources",
        icon: Bolt,
        subMenuHeading: ["Get started", "Programs", "Recent"],
        subMenu: [
          {
            name: "Markplace",
            desc: "Browse templates",
            path: "/dashboard",
            action: "Forms",
            icon: ShoppingBag,
          },
          {
            name: "Meetups",
            desc: "Upcoming events",
            path: "/dashboard",
            action: "Forms",
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
            action: "Forms",
            icon: CircleHelp,
          },
          {
            name: "Community",
            desc: "Project help",
            path: "/dashboard",
            action: "Forms",
            icon: MessageCircle,
          },
          {
            name: "Emergency",
            desc: "Urgent issues",
            path: "/dashboard",
            action: "Forms",
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
            action: "Forms",
            icon: ShieldPlus,
          },
          {
            name: "Collaboration",
            desc: "Design together",
            path: "/dashboard",
            action: "Forms",
            icon: Users,
          },
          {
            name: "Customers",
            desc: "Stories",
            path: "/dashboard",
            action: "Forms",
            icon: Dessert,
          },
          {
            name: "Security",
            desc: "Your site secured",
            path: "/dashboard",
            action: "Forms",
            icon: Lock,
          },
        ],
        gridCols: 2,
      },
    ],
  },

  {
    name: "Forms & Tables",
    mainMenu: [
      {
        name: "Forms",
        icon: Lock,
        path: "/dashboard",
        action: "Forms",
      },
      {
        name: "Table",
        icon: Phone,
        path: "/dashboard",
        action: "Table",
      },
    ],
  },
  {
    name: "Accounts",
    mainMenu: [
      {
        name: "Logout",
        icon: Power,
        path: "/login",
        action: "logout",
      },
      {
        name: "Contact",
        icon: Phone,
        path: "/profile",
        action: "Contact",
      },
    ],
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
