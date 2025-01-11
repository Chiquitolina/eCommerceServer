import { t } from '../config/tRCP';
import { productRouter } from '../routers/productsRoute';
import { viewsTrackerRoute } from '../routers/viewsTrackerRoute';

export const appRouter = t.router({
  product: productRouter,  
  view: viewsTrackerRoute
});

export type AppRouter = typeof appRouter;