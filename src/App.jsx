import * as React from "react";
import BasicTextFields from "./assets/components/BasicTextFields/BasicTextFields";
import NotesList from "./assets/components/NotesList/NotesList";
import ReactVirtualizedTable from "./assets/components/ReactVirtualizedTable/ReactVirtualizedTable";

import "./App.scss";

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <section className="main">
      <div className="container">
        <div className="main__box">
          <h1 className="main__title">TODOLIST</h1>
          <BasicTextFields setLoading={setLoading} />
          {/* <NotesList loading={loading} setLoading={setLoading} /> */}
          <ReactVirtualizedTable loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </section>
  );
}

export default App;
