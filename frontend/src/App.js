import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const apiReq = () => {
    console.log("backend request");

    // axios("/auth/api/auth-test-api").then((res) => {
    //   console.log("response", res.data);
    // });

    axios("/api/testWithCurrentUser").then((res) => {
      console.log("response", res);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          DevOps is about culture, automation, monitoring of metrics and
          sharing. Web socket fix. again
        </a>
      </header>

      <button onClick={apiReq}>Make API Request</button>
    </div>
  );
}

export default App;
