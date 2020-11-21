import 'antd/dist/antd.css';
import "./App.css";
import { Button,Row,Col } from "antd";
import SearchPage from "./pages/searchPage/searchPage"
import SearchHeader from "./components/searchHeader/searchHeader";
import SimpleNavbar from "./components/simpleNavbar/simpleNavbar"
const axios = require("axios");
function App() {

  return (
    <div className="App">
<SearchPage />
    </div>
  );
}

export default App;
