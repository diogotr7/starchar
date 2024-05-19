import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import reactDom from "react-dom/client";
import { App } from "./App.tsx";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";

reactDom.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Notifications position="top-center" zIndex={9999} />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
