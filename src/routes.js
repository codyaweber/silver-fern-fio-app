
import Shop from "Components/Shop";
import Analytics from "Components/Analytics";


import { 
  mdiShoppingOutline,
  mdiChartBar
} from '@mdi/js';

var routes = [
  {
    path: "shop",
    url: "shop",
    name: "Shop",
    icon: mdiShoppingOutline,
    component: Shop,
    scopes : [],
  },
  {
    path: "analytics",
    url: "analytics",
    name: "Analytics",
    icon: mdiChartBar,
    component: Analytics,
    scopes : [],
  }
];

export default routes;
