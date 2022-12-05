import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import { useAnalyticsPageView } from './use-analytics';

import {
  createRouteConfig,
  createReactRouter,
  RouterProvider,
  Outlet,
  Link,
} from '@tanstack/react-router';
import { Homepage } from './pages/homepage';
import { PrivacyPolicy } from './pages/privacy-policy';
import { Footer } from './components/footer/footer';
import { Cookies } from './components/cookies/cookies';

const rootRoute = createRouteConfig();
const homePageRoute = rootRoute.createRoute({
  path: '/',
  component: Homepage,
});

const privacyPolicyRoute = rootRoute.createRoute({
  path: '/privacy-policy',
  component: PrivacyPolicy,
});

const routeConfig = rootRoute.addChildren([homePageRoute, privacyPolicyRoute]);

const router = createReactRouter({ routeConfig });

export const App = () => {
  useAnalyticsPageView();

  return (
    <>
      <Layout>
        <>
          <RouterProvider router={router}>
            <Cookies />
            <Header />
            <Outlet />
            <Footer />
          </RouterProvider>
        </>
      </Layout>
    </>
  );
};
