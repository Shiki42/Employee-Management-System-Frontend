import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback: React.ProfilerOnRenderCallback = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number
  // You can include other parameters as well if you need them
) => {
  console.log(`Render on ${id} during ${phase} phase.`);
  console.log(`Actual render time: ${actualDuration} ms`);
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Profiler id="Root" onRender={callback}>
      <Provider store={store}>
        <App />
      </Provider>
    </Profiler>
  </React.StrictMode>
);
