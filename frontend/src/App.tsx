import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout"
const LoginPage = lazy(() => import('./pages/LoginPage'));
const LoaderComponent = lazy(() => import('./components/LoaderComponent'));
import routesDisplay, { routes } from "./routes/routes"


const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<LoaderComponent />}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route element={<Layout />}>
          {routes.map(({ path, component: Component }: any) => (
            <>
              <Route
                path={path}
                element={
                  <Suspense fallback={<LoaderComponent />}>
                    <Component />
                  </Suspense>
                }
              />
            </>
          ))}
        </Route >
      </Routes>
    </>
  )
}

export default App