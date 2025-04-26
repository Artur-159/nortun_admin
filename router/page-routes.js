import Login from "../pages/login/login";
import Home from "../pages/home-banner/home-banner";
import CreateHomeBanner from "../pages/home-banner/components/create/create";
import EditHomeBanner from "../pages/home-banner/components/edit/edit";
import Story from "../pages/story/story";
import CreateStory from "../pages/story/components/create/create";
import EditStory from "../pages/story/components/edit/edit";
import EditNews from "../pages/news/components/edit/edit";
import Partner from "../pages/partner/partner";
import CreatePartner from "../pages/partner/components/create/create";
import EditPartner from "../pages/partner/components/edit/edit";
import CreateNews from "../pages/news/components/create/create";
import Users from "../pages/users/users";
import News from "../pages/news/news";
import About from "../pages/about/about";
import Branch from "../pages/branch/branch";
import CreateBranch from "../pages/branch/components/create/create";
import EditBranch from "../pages/branch/components/edit/edit";

export const adminRoutes = [
  {
    name: "Օգտատերեր",
    path: "/users",
    element: <Users />,
    icon: "/icons/users.svg",
  },
  {
    name: "Home",
    path: "/home",
    icon: "/icons/company.svg",
    element: <Home />,
    children: [
      {
        path: "home/:userId",
        element: <EditHomeBanner />,
      },
      {
        path: "home/create",
        element: <CreateHomeBanner />,
      },
    ],
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
    icon: "/icons/users.svg",
  },
  {
    name: "Story",
    path: "/story",
    element: <Story />,
    icon: "/icons/company.svg",
    children: [
      {
        path: "story/:userId",
        element: <EditStory />,
      },
      {
        path: "story/create",
        element: <CreateStory />,
      },
    ],
  },
  {
    name: "News",
    path: "/news",
    element: <News />,
    icon: "/icons/story.svg",
    children: [
      {
        path: "news/:id",
        element: <EditNews />,
      },
      {
        path: "news/create",
        element: <CreateNews />,
      },
    ],
  },
  {
    name: "Partner",
    path: "/partner",
    element: <Partner />,
    icon: "/icons/company.svg",
    children: [
      {
        path: "partner/:id",
        element: <EditPartner />,
      },
      {
        path: "partner/create",
        element: <CreatePartner />,
      },
    ],
  },
  {
    name: "Branch",
    path: "/branch",
    element: <Branch />,
    icon: "/icons/company.svg",
    children: [
      {
        path: "branch/:id",
        element: <EditBranch />,
      },
      {
        path: "branch/create",
        element: <CreateBranch />,
      },
    ],
  },
];

export const subRoutes = [
  {
    name: "Օգտատերեր",
    path: "/users",
    element: <Users />,
    icon: "/icons/users.svg",
  },
];

export const guestRoutes = [
  {
    path: "/login",
    name: "Մուտք",
    element: <Login />,
    icon: "/icons/sign-in.svg",
  },
];
