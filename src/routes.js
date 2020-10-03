import DataManager from "./page/DataManager";
import PatientDetail from "./page/DataManager/components/PatientDetail";
import ModelManager from "./page/ModelManager";
import Analysis from "./page/Analysis";
import ProfileManager from "./page/ProfileManager";
import UserEdit from "./page/ProfileManager/components/userEdit";
import Home from "./page/Home";

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path:'/home',
    exact: true,
    component: Home
  },
  {
    path:'/patientList/:mode',
    exact: true,
    component: DataManager
  },
  {
    path: '/patientInfo/:mode/:id/:type',
    component: PatientDetail,
  },
  {
    path: '/modelManager',
    exact: true,
    component: ModelManager
  },
  {
    path: '/analysis',
    component: Analysis
  },
  {
    path: '/profile',
    component: ProfileManager
  },
  {
    path: '/userEdit/:id',
    component: UserEdit
  },
]

export default routes
