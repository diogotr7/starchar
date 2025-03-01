import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import reactDom from "react-dom/client";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import init from "../chf-rs/wasm/pkg";
import { App } from "./components2/App";

async function startApp() {
  console.debug("loading wasm");
  await init();
  console.debug("starting app");
  reactDom.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <MantineProvider defaultColorScheme="auto">
        <Notifications position="top-center" zIndex={9999} />
        <App />
      </MantineProvider>
    </React.StrictMode>
  );
}

startApp();
