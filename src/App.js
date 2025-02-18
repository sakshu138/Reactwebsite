import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login'
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import Kid_banner from './Components/Assets/banner_kids.png'
import Signup  from './Pages/Signup';
import Forget from './Pages/Forget';
import { ToastContainer } from 'react-toastify';
import ShippingMethod from './Pages/ShippingMethod';
import PaymentMethod from './Pages/PaymentMethod';
import Information from './Pages/information';
import Thankyou from './Pages/Thankyou';
import OrderTimeline from './Pages/OrderTimeline';
import Profile from "./Pages/Profile";
import History from "./Pages/History";





function App() {
  return (
   <div>
    
    <BrowserRouter>
    <Navbar/>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
      <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
      <Route path='/kids' element={<ShopCategory banner={Kid_banner} category="kid"/>}/>
      <Route path='/product' element={<Product/>}>
      <Route path=':productId' element={<Product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/Forget' element={<Forget/>}/>
      <Route path='/shippingMethod' element={<ShippingMethod/>}/>
      <Route path='/information' element={<Information/>}/>
      <Route path='/thankyou' element={<Thankyou/>}/>
      <Route path='/ordertimeline' element={<OrderTimeline/>}/>
      <Route path='/payment' element={<PaymentMethod/>}/>
       
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
     
      
      </Routes>
      <Footer/>
    </BrowserRouter>
   
   
   </div>
  );
}

export default App;
