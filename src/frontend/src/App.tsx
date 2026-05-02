import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Onboarding from "@/pages/Onboarding";
import { useAppStore } from "@/store/appStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useEffect, useState } from "react";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Routines = lazy(() => import("@/pages/Routines"));
const Tasks = lazy(() => import("@/pages/Tasks"));
const Chat = lazy(() => import("@/pages/Chat"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

export type AppRoute = "/" | "/routines" | "/tasks" | "/chat" | "/settings";

export interface RouterContextValue {
  route: AppRoute;
  navigate: (route: AppRoute) => void;
}

import { createContext, useContext } from "react";
export const RouterContext = createContext<RouterContextValue>({
  route: "/",
  navigate: () => {},
});
export const useRouter = () => useContext(RouterContext);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[50vh]"
      data-ocid="page.loading_state"
    >
      <LoadingSpinner size="lg" />
    </div>
  );
}

const routeComponents: Record<AppRoute, React.ReactNode> = {
  "/": (
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  ),
  "/routines": (
    <Suspense fallback={<PageLoader />}>
      <Routines />
    </Suspense>
  ),
  "/tasks": (
    <Suspense fallback={<PageLoader />}>
      <Tasks />
    </Suspense>
  ),
  "/chat": (
    <Suspense fallback={<PageLoader />}>
      <Chat />
    </Suspense>
  ),
  "/settings": (
    <Suspense fallback={<PageLoader />}>
      <SettingsPage />
    </Suspense>
  ),
};

function AppRoutes() {
  const { onboardingCompleted, theme } = useAppStore();
  const [route, setRoute] = useState<AppRoute>("/");

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  if (!onboardingCompleted) {
    return <Onboarding />;
  }

  return (
    <RouterContext.Provider value={{ route, navigate: setRoute }}>
      <Layout currentRoute={route}>
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {routeComponents[route]}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </RouterContext.Provider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
