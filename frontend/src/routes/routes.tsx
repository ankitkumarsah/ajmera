import { AiFillAppstore, AiFillContainer, AiFillProfile } from "react-icons/ai";
import { lazy } from "react";
const iconColor = '#14B8A6';
const size = 19;
const DashboardPage = lazy(() => import('../pages/DashboardPage'));


const routesDisplay: any = [
  {
    path: "/dashboard",
    displayText: "Dashboard",
    component: DashboardPage,
    icon: <AiFillAppstore style={{ color: iconColor }} fontSize={size} />,
    role: ['user']
  },
  {
    path: null,
    displayText: "Test",
    icon: <AiFillContainer fontSize={size} style={{ color: iconColor }} />,
    role: ['user'],
    child: [
      {
        path: "/test",
        displayText: "sub test",
        component: DashboardPage,
        icon: <AiFillProfile fontSize={size} style={{ color: iconColor }} />,
      },
    ]
  },

];

const routes: any = [];
for (const route of routesDisplay) {
  routes.push(route)
  if (route.child) {
    for (const child of route.child) {
      routes.push(child);
    }
  }
}


export { routes }

export default routesDisplay;

