import './App.css';
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import CheckoutPage from "./components/CheckoutPage";
import SignIn from './SignIn';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import {useEffect} from 'react'
import { auth } from './firebase';
import {useStateValue} from "./StateProvider";
import { actionTypes } from './Reducer';
import Checkout from './components/CheckoutForm/Checkout'


function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=> {
      console.log();
      if(authUser){
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser
        })
      }
    });
  },[])

  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route path="/checkoutPage">
            <CheckoutPage></CheckoutPage>
          </Route>
          <Route path="/checkout">
            <Checkout></Checkout>
          </Route>
          <Route path="/signin">
            <SignIn></SignIn>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route path="/">
            <Products></Products>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
