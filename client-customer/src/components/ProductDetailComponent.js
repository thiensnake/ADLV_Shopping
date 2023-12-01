import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
      
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="align-center">
        <div className="image-form-container">
          <div className="text-form"> 
          <form>
            <table>
              <tbody>
                <tr>
                  <td className='name-1'>{prod.name}</td>
                </tr>
                <tr>
                  <td className='name-2'>${prod.price}</td>
                </tr>
                <tr>
                <td>Thương hiệu: <span className='name-3'>{prod.category.name}</span></td>
                </tr>
                <tr>

      <td> Số lượng: <input className='name-4' type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
      </tr>
      <tr>
      </tr>
      <tr>
      <td><input className="name-5" type="submit" value="THÊM VÀO GIỎ HÀNG" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
      </tr>
              </tbody>
            </table>
          </form>
          </div>
          
          <img src={"data:image/jpg;base64," + prod.image} width="500px" height="500px" alt="" />
        </div>
      </div>
      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Thêm thành công');
    } else {
      alert('Vui lòng nhập số lượng');
    }
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}
export default withRouter(ProductDetail);