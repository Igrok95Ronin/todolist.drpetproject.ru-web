import BasicTextFields from "./assets/components/BasicTextFields/BasicTextFields";

import "./App.scss";

function App() {
  return (
    <section className="main">
      <div className="container">
        <div className="main__box">
          <h1 className="main__title">TODOLIST</h1>
          <BasicTextFields />
        </div>
      </div>
    </section>
  );
}

export default App;
