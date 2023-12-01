import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: '',
      cmbCategory: '',
      imgProduct: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className="list-2">
      <div className="float-right">
        <h2 className="text-center">CHI TIẾT</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default" >ID</InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true}/>
                  </InputGroup>
              </tr>
              <tr>
              <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default" >TÊN</InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}/>
                  </InputGroup>
              </tr>
              <tr>
              <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default" >GIÁ</InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      input type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }}/>
                  </InputGroup>
              </tr>
              <tr>
              <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)}/>
                  </InputGroup>
              </tr>
              <tr>
              <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default" >THƯƠNG HIỆU</InputGroup.Text>
                  <select onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>{cates}</select>
                  </InputGroup>
              </tr>
              <ButtonGroup size="sm">
                  <Button input type="submit" value="Thêm mới" onClick={(e) => this.btnAddClick(e)} >Thêm mới</Button>
                  <Button input type="submit" value="Cập nhập" onClick={(e) => this.btnUpdateClick(e)}>Cập nhập</Button>
                  <Button input type="submit" value="Xóa" onClick={(e) => this.btnDeleteClick(e)}>Xóa</Button>
                </ButtonGroup>
              <tr>
                <td colSpan="2"><img src={this.state.imgProduct} width="300px" height="300px" alt="" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn chắc chứ?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Vui lòng nhập ID');
      }
    }
  }
  // apis
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Xóa thành công');
        this.apiGetProducts();
      } else {
        alert('Vui lòng thử lại');
      }
    });
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      alert('Vui lòng nhập thông tin sản phẩn');
    }
  }
  // apis
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Cập nhập thành công');
        this.apiGetProducts();
      } else {
        alert('vui lòng thử lại');
      }
    });
  }
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Vui lòng nhập thông tin sản phẩm');
    }
  }
  // apis
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm thành công');
        this.apiGetProducts();
      } else {
        alert('Vui lòng thử lại');
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages, result.curPage);
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const curPage = this.props.curPage - 1;
        axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  }
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default ProductDetail;