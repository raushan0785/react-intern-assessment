// import type { JSX } from "react";
// import Home from "./pages/home";
// import Create from "./pages/create";

// type route = {
//     path: string
//     element: JSX.Element
//     index?: boolean
// }

// const routes: route[] = [
//     {
//         path: "/",
//         element: <Home />,
//         index: true
//     },
//     {
//         path: "/create",
//         element: <Create />,
//     },

// ]

// export default routes;
import type { JSX } from "react";
import Home from "./pages/home";
import Create from "./pages/create";
import Archive from "./pages/archive";   // 👈 ADD THIS

type route = {
    path: string
    element: JSX.Element
    index?: boolean
}

const routes: route[] = [
    {
        path: "/",
        element: <Home />,
        index: true
    },
    {
        path: "/create",
        element: <Create />,
    },
    {
        path: "/archive",          // 👈 ADD THIS
        element: <Archive />,
    },
]

export default routes;
