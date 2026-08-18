import {
  Component,
  Grid3x3,
  Sheet,
  LayoutPanelLeft,
  Bolt,
  Form,
  LayoutTemplate,
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
  Phone,
  User,
  LogOut,
  LogOutIcon,
  Power,
  House,
} from "lucide-react";

export const NavMenus = [
  {
    mainMenu: [
      {
        name: "Home",
        icon: House,
        path: "/",
        action: "Forms",
      },
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        action: "Forms",
      },
    ],
  },

  {
    name: "Forms & Tables",
    mainMenu: [
      {
        name: "Forms",
        icon: Form,
        subMenuHeading: ["Get started", "Programs", "Recent"],
        subMenu: [
          {
            name: "Forms",
            icon: Lock,
            path: "/forms",
            desc: "Forms",
            action: "Forms",
          },

          {
            name: "Templates",
            desc: "Form Templates",
            path: "/forms/templates",
            icon: LayoutTemplate,
          },
          {
            name: "Elements",
            desc: "Form Elements",
            path: "/forms/element",
            icon: Component,
          },
          {
            name: "Layouts",
            desc: "Form Layouts",
            path: "/forms/layouts",
            icon: LayoutPanelLeft,
          },
        ],
        gridCols: 3,
      },
      {
        name: "Tables",
        icon: Sheet,
        subMenuHeading: ["Get started", "Programs", "Recent"],
        subMenu: [
          {
            name: "Tables",
            icon: Grid3x3,
            path: "/forms/table",
            action: "Table",
            desc: "Form Tables",
          },
          {
            name: "DataTables",
            icon: FileText,
            path: "/forms/datatable",
            desc: "Forms DataTables",
            action: "Table",
          },
        ],
        gridCols: 3,
      },
    ],
  },

  {
    name: "Apps & Pages",
    mainMenu: [
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

      {
        name: "Featurs",
        icon: PanelsTopLeft,

        subMenuHeading: ["Design", "Scale"],
        subMenu: [
          {
            name: "Design",
            path: "/design",
            action: "Forms",
            desc: "Responsive design",
            icon: PanelsTopLeft,
          },
          {
            name: "Management",
            desc: "Site control",
            path: "/management",
            action: "Forms",
            icon: Bolt,
          },
          {
            name: "Navigation",
            desc: "Link pages",
            path: "/navigation",
            action: "Forms",
            icon: PanelTop,
          },
          {
            name: "CMS",
            desc: "Management content",
            path: "/cms",
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
            path: "/pmanagement",
            action: "Forms",
            icon: Bolt,
          },
          {
            name: "Navigation",
            desc: "Link pages",
            path: "/pnavigation",
            action: "Forms",
            icon: PanelTop,
          },
          {
            name: "CMS",
            desc: "Management content",
            path: "/pcms",
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
            path: "/browse-templates",
            action: "Forms",
            icon: ShoppingBag,
          },
          {
            name: "Meetups",
            desc: "Upcoming events",
            path: "/meetups",
            action: "Forms",
            icon: MapPin,
          },
          {
            name: "Updates",
            desc: "Changelog",
            path: "/updates",
            icon: BellDot,
          },
          {
            name: "Academy",
            desc: "Watch lessions",
            path: "/academy",
            icon: Play,
          },
          {
            name: "Blog",
            desc: "Posts",
            path: "/blog",
            icon: BookOpenText,
          },
          {
            name: "Figma",
            desc: "Plugin",
            path: "/figma",
            icon: Play,
          },
          {
            name: "Experts",
            desc: "Jobs",
            path: "/experts",
            icon: BriefcaseBusiness,
          },
          {
            name: "Gallery",
            desc: "Images",
            path: "/gallery",
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
            path: "/help",
            action: "Forms",
            icon: CircleHelp,
          },
          {
            name: "Community",
            desc: "Project help",
            path: "/community",
            action: "Forms",
            icon: MessageCircle,
          },
          {
            name: "Emergency",
            desc: "Urgent issues",
            path: "/emergencyd",
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
            path: "/enterprise",
            action: "Forms",
            icon: ShieldPlus,
          },
          {
            name: "Collaboration",
            desc: "Design together",
            path: "/collaboratio",
            action: "Forms",
            icon: Users,
          },
          {
            name: "Customers",
            desc: "Stories",
            path: "/customersd",
            action: "Forms",
            icon: Dessert,
          },
          {
            name: "Security",
            desc: "Your site secured",
            path: "/security",
            action: "Forms",
            icon: Lock,
          },
        ],
        gridCols: 2,
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
