import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./../../redux";

function Wrapper({ children }) {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
}

export default Wrapper;
