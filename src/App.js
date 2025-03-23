import React, { lazy, Suspense } from "react";
const Routing = lazy(() => import("./application/routing/routing"));

import "./app.scss";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routing />
    </Suspense>
  );
};

export default App;
