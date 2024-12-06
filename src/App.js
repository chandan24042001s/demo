import { Provider } from "react-redux";
import Head from "./components/head";
import store from "./utils/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Head />
        </header>
      </div>
    </Provider>
  );
}

export default App;
