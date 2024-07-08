import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Toaster } from "react-hot-toast";
import { disableInspect } from "./disableInspect";
import { axiosInterceptor } from "./axiosInterceptor";
import { routes } from "./routes";
const rootElement = document.getElementById("root");
const lang = localStorage.getItem("i18nextLng");
// Disable right-click //
// disableInspect();
// Interceptor Handleing function //
axiosInterceptor();
const isRTL = lang === "ar";

// Apply the class based on the RTL status
if (isRTL) {
  rootElement.classList.add("rtl");
  rootElement.classList.remove("ltr");
} else {
  rootElement.classList.add("ltr");
  rootElement.classList.remove("rtl");
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register(`/firebase-messaging-sw.js`)
      .then((registration) => {
          console.log('Service Worker registration successful with scope: ', registration.scope);
      })
      .catch((err) => {
          console.log('Service Worker registration failed: ', err);
      });
}

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);
