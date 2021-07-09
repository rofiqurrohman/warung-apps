import ListWarung from '../views/pages/warung-list';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': ListWarung,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
