import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FaBasketShopping } from "react-icons/fa6";

        



class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
<div className="menu-botton">
  <div className="home-link">
    {this.context.token === '' ?
      <div>
        <Link to='/login' className="home-link">ĐĂNG NHẬP</Link>   <Link to='/signup' className="home-link">ĐĂNG KÝ</Link>
      </div>
      :
      <div className="float1">
          <Link className="home-link" to='/myorders'>ĐƠN HÀNG</Link><Link className="home-link" to='/home' onClick={() => this.lnkLogoutClick()}>ĐĂNG XUẤT</Link>| Xin chào <Link to='/myprofile'>{this.context.customer.name}</Link>
          <div className="float2">

    
   
    
  </div>
  
      </div>
    }
  </div>
  <div className='float2'>
          <Link to='/mycart' >  <FaBasketShopping /> </Link><p className='home-icon'>{this.context.mycart.length}</p>
          </div>
</div>
    );
  }
    // event-handlers
    lnkLogoutClick() {
      this.context.setToken('');
      this.context.setCustomer(null);
      this.context.setMycart([]);
    }
}
export default Inform;