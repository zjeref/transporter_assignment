import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import { initialState, reducer,  GlobalState} from './middlewares/global-states';
import UserProtected from './middlewares/UserProtected'
import TranspoterProtected from './middlewares/TranspoterProtected';
import LoginProtected from './middlewares/LoginProtected';
import User from "./pages/User";
import Home from './pages/Home';


import TranspoterLanding from "./pages/TranspoterLanding";
import Transpoter from "./pages/Transpoter";
import Chat from './pages/Chat';


function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <GlobalState.Provider value={{ data: data, dispatch: dispatch }}>
        <Routes>
          <Route path="/" element={<UserProtected><Home/></UserProtected>} />
          <Route path="/transLanding" element={<TranspoterProtected><TranspoterLanding/></TranspoterProtected>} />
          <Route path="/user" element={<UserProtected><User/></UserProtected>} />
          <Route path="/transpoter" element={<TranspoterProtected><Transpoter/></TranspoterProtected>} />
          <Route path="/chat/:id" element={<LoginProtected><Chat/></LoginProtected>}/>
        </Routes>
      </GlobalState.Provider>
    </BrowserRouter>

  );
}

export default App;
