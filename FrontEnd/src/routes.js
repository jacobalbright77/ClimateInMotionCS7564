/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Heatmap from "views/Heatmap.js";
import Homepage from "views/Homepage"

const dashboardRoutes = [
  {
    path: "/homepage",
    name: "Homepage",
    icon: "nc-icon nc-planet",
    component: Homepage,
  },
  {
    path: "/heatmap",
    name: "Heatmap",
    icon: "nc-icon nc-map-big",
    component: Heatmap,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-grid-45",
    component: Dashboard,
  },
];

export default dashboardRoutes;
