import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Inform from './InformComponent';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      theme: localStorage.getItem('theme') || 'light', // Retrieve theme from localStorage or default to 'light'
    };
  }

  componentDidMount() {
    this.apiGetCategories();
    // Set the initial theme
    document.documentElement.setAttribute('data-bs-theme', this.state.theme);
  }

  // Event handler for the search button click
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // Event handler for the mode switch
  ckbChangeMode(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme); // Save theme preference to localStorage
    this.setState({ theme });
  }

  // API call to get categories
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <NavDropdown.Item key={item._id} href={`/product/category/${item._id}`}>
        {item.name}
      </NavDropdown.Item>
    ));

    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {['md'].map((expand) => (
          <Navbar key={expand} expand={expand} className={`menu-list ${this.state.theme}`} fixed='top'>
            <Container fluid className='menu-list1'>
              <Navbar.Brand href='/home'>
                <img
                  src='https://d2308c07sw6r8q.cloudfront.net/media/logo/websites/7/logo_adlv.png'
                  width='150px'
                  height='50px'
                  className='d-inline-block align-top'
                  alt='React Bootstrap logo'
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement='start'
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <Navbar.Brand href='/home'></Navbar.Brand>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className='justify-content-start flex-grow-1 pe-3'>
                    <Nav.Link href='/home' className='home-link'>
                      TRANG CHỦ
                    </Nav.Link>
                    <NavDropdown className='home-link' title='SẢN PHẨM' id={`offcanvasNavbarDropdown-expand-${expand}`}>
                      {cates}
                    </NavDropdown>
                  </Nav>
                  <div>
                  <div style={{ display: 'flex', marginTop: "32px" }} className='form-switch'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        onChange={(e) => this.ckbChangeMode(e)}
                      />
                      &nbsp; Light / Dark
                    </div>
                  </div>
                  <div className='search-box'>
                    
                    <form className='home-link' id='searchbox' method='get' type='search' autoComplete='off'>
                      <input
                        name=''
                        type='text'
                        size='15'
                        placeholder='Bạn đang tìm sản phẩm gì...'
                        value={this.state.txtKeyword}
                        onChange={(e) => {
                          this.setState({ txtKeyword: e.target.value });
                        }}
                      />
                      <input id='button-submit' type='submit' value='' onClick={(e) => this.btnSearchClick(e)} />
                    </form>
                  </div>
                  
                  <Nav.Link href='/gmap' className='home-link'>
                    CỬA HÀNG
                  </Nav.Link>
                  <Nav.Link href=''>
                    <Inform />
                  </Nav.Link>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    );
  }
}

export default withRouter(Menu);
