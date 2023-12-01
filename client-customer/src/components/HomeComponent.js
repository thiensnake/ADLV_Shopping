import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div  key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                width="200px"
                height="200px"
                alt=""
              />
            </Link>
            <figcaption className="text-center">
              {item.name}
              <br />
              Price: {item.price}
            </figcaption>
          </figure>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                width="200px"
                height="200px"
                alt=""
              />
            </Link>
            <figcaption className="text-center">
              {item.name}
              <br />
              Price: {item.price}
            </figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div className="text-center">
        <div className="align-center">
        <h2 className="text-center">SẢN PHẨM MỚI</h2>
    {newprods}
  </div>
  {this.state.hotprods.length > 0 ? (
    <div className="align-center">
      <h2 className="text-center">SẢN PHẨM BÁN CHẠY</h2>
      {hotprods}
    </div>
  ) : (
    <div />
  )}
  <div style={{ marginBottom: '50px' }}> {/* Add margin to create space */}
    <Footer />
  </div>
</div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;