import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/index.html                   0.48 kB │ gzip:   0.32 kB
// dist/assets/index-438bc36c.css   29.86 kB │ gzip:   5.05 kB
// dist/assets/index-30a54f58.js   510.61 kB │ gzip: 146.90

// After Lazy Loading:
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-a9e6818a.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-de55ba2b.css           26.18 kB │ gzip:   4.36 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-d238f4d8.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-cff3356d.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-7529d943.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-dedfdb34.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-ab9b2213.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-467419e0.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-d0de5c9c.js             1.01 kB │ gzip:   0.53 kB
// dist/assets/AppLayout-6fb76cd9.js       156.92 kB │ gzip:  46.10 kB
// dist/assets/index-485b5214.js           352.15 kB │ gzip: 100.22 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
