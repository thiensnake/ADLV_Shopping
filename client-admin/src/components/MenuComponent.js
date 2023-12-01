import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    
    return (
<Navbar collapseOnSelect expand="lg" className="menu-body">
      <Container>
      <Navbar.Brand href="#home">
            <img
              src="https://d2308c07sw6r8q.cloudfront.net/media/logo/websites/7/logo_adlv.png"
              width="120px"
              height="40px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <li className="menu"><Link to='/admin/home'>Trang chủ</Link></li>
          <li className="menu"><Link to='/admin/category'>Thương hiệu</Link></li>
          <li className="menu"><Link to='/admin/product'>Sản phẩm</Link></li>
          <li className="menu"><Link to='/admin/order'>Đặt hàng</Link></li>
          <li className="menu"><Link to='/admin/customer'>Khách hàng</Link></li>         
          </Nav>
          <Nav className="logout">
          <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Đăng xuất</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;