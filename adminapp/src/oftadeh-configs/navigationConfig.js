// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";

const navigationConfig = [
  {
    id: "Main",
    title: "MAIN",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "apps",
        url: "/",
        exact: true,
      },
      {
        id: "consultants",
        title: "Consultants",
        type: "collapse",
        icon: "SupervisorAccountIcon",
        exact: true,
        children: [
          {
            id: "consultant list",
            title: "List",
            type: "item",
            url: "/consultants",
            exact: true,
          },
          {
            id: "job",
            title: "Job",
            type: "item",
            url: "/consultants/job",
            exact: true,
          },
          {
            id: "payment",
            title: "Payments",
            type: "item",
            url: "/consultants/payment",
            exact: true,
          },
          {
            id: "comment",
            title: "Comment/Rating",
            type: "item",
            url: "/consultants/rating",
            exact: true,
          }
        ]
      },
      {
        id: "consumers",
        title: "Consumers",
        type: "collapse",
        icon: "Consumers",
        exact: true,
        children: [
          {
            id: "consumer list",
            title: "List",
            type: "item",
            url: "/Consumers",
            exact: true,
          },
          {
            id: "job",
            title: "Job",
            type: "item",
            url: "/consultants/job",
            exact: true,
          },
          {
            id: "payment",
            title: "Payments",
            type: "item",
            url: "/consultants/payment",
            exact: true,
          },
          {
            id: "comment",
            title: "Comment/Rating",
            type: "item",
            url: "/consultants/rating",
            exact: true,
          }
        ]
      },
      {
        id: "cases",
        title: "Active Cases",
        type: "item",
        icon: "schedule",
        url: "/cases",
        exact: true,
      },
      {
        id: "specification",
        title: "Specifications",
        type: "item",
        icon: "how_to_vote",
        url: "/spec",
        exact: true,
      },
      {
        id: "orders",
        title: "Active Orders",
        type: "item",
        icon: "view_module",
        url: "/orders",
        exact: true,
      },
      {
        id: "complaints",
        title: "Complaints",
        type: "item",
        icon: "feedback",
        url: "/complaints",
        exact: true,
      },
      {
        id: "approval",
        title: "Approval",
        type: "item",
        icon: "approval",
        url: "/approval",
        exact: true,
      },
      // {
      //   id: "posts",
      //   title: "Posts",
      //   type: "collapse",
      //   icon: "file_copy",
      //   badge: {
      //     title: "2",
      //     bg: "#525E8A",
      //     fg: "#FFFFFF",
      //   },
      //   children: [
      //     {
      //       id: "all posts",
      //       title: "All Posts",
      //       type: "item",
      //       url: "/pages/posts",
      //       exact: true,
      //     },
      //     {
      //       id: "add post",
      //       title: "Add Post",
      //       type: "item",
      //       url: "/pages/posts/add-post",
      //       exact: true,
      //     },
      //   ],
      // },
      // {
      //   id: "calendar",
      //   title: "Calendar",
      //   type: "item",
      //   icon: "event",
      //   url: "/pages/calendar",
      //   exact: true,
      // },
    ],
  },
  // {
  //   id: "Pages",
  //   title: "Pages",
  //   type: "group",
  //   children: [
  //     {
  //       id: "Authentication",
  //       title: "Authentication",
  //       type: "collapse",
  //       icon: "lock",
  //       children: [
  //         {
  //           id: "Login",
  //           title: "Login",
  //           type: "item",
  //           url: "/pages/auth/login",
  //           exact: true,
  //         },
  //         {
  //           id: "Register",
  //           title: "Register",
  //           type: "item",
  //           url: "/pages/auth/register",
  //           exact: true,
  //         },
  //         {
  //           id: "Forgot Password",
  //           title: "Forgot Password",
  //           type: "item",
  //           url: "/pages/auth/forgot-password",
  //           exact: true,
  //         },
  //       ],
  //     },
  //     {
  //       id: "About",
  //       title: "About",
  //       type: "item",
  //       icon: "description",
  //       url: "/pages/about",
  //       exact: true,
  //     },
  //     {
  //       id: "Errors",
  //       title: "Errors",
  //       type: "collapse",
  //       icon: "warning",
  //       badge: {
  //         title: "new",
  //         bg: "#513E8A",
  //         fg: "#FFFFFF",
  //       },
  //       children: [
  //         {
  //           id: "404",
  //           title: "404",
  //           type: "item",
  //           url: "/pages/errors/error-404",
  //           exact: true,
  //         },
  //         {
  //           id: "500",
  //           title: "500",
  //           type: "item",
  //           url: "/pages/errors/error-500",
  //           exact: true,
  //         },
  //       ],
  //     },
  //   ],
  // }
  // {
  //   id: "divider-1",
  //   type: "divider",
  // },
  // {
  //   id: "Documentation",
  //   title: "DOCUMENTATION",
  //   type: "group",
  //   children: [
  //     {
  //       id: "Oftadeh - React Admin",
  //       title: "Oftadeh - React Admin",
  //       type: "link",
  //       icon: "link",
  //       url: "https://github.com/mohammadoftadeh/oftadeh-react-admin",
  //       exact: true,
  //     }
  //   ]
  // }
];

export default navigationConfig;
