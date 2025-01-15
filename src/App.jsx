import * as React from "react";
import BasicTextFields from "./assets/components/BasicTextFields/BasicTextFields";
import ReactVirtualizedTable from "./assets/components/ReactVirtualizedTable/ReactVirtualizedTable";
import BasicButtonGroup from "./assets/components/BasicButtonGroup/BasicButtonGroup";

import "./App.scss";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);

  return (
    <section className="main">
      <div className="container">
        <div className="main__box">
          <h1 className="main__title">TODOLIST</h1>
          <BasicTextFields setLoading={setLoading} />
          {/* <NotesList loading={loading} setLoading={setLoading} /> */}
          <ReactVirtualizedTable loading={loading} setLoading={setLoading} setCount={setCount} />
          <BasicButtonGroup setLoading={setLoading} count={count} />
        </div>
      </div>
    </section>
  );
}

export default App;
