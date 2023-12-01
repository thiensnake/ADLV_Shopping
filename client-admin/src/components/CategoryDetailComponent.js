import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="list">
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
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default" >TÊN</InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}/>
                </InputGroup>
                <ButtonGroup size="sm">
                  <Button input type="submit" value="Thêm mới" onClick={(e) => this.btnAddClick(e)} >Thêm mới</Button>
                  <Button input type="submit" value="Cập nhập" onClick={(e) => this.btnUpdateClick(e)}>Cập nhập</Button>
                  <Button input type="submit" value="Xóa" onClick={(e) => this.btnDeleteClick(e)}>Xóa</Button>
                </ButtonGroup>
            </tbody>
          </table>
        </form>
      </div>
      </div>
      
    );
  }
   // event-handlers
   btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn chắc chứ?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Vui lòng chọn tên thương hiệu');
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Xóa thành công');
        this.apiGetCategories();
      } else {
        alert('Vui lòng thử lại');
      }
    });
  }
   btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Vui lòng chọn tên thương hiệu');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Cập nhập thành công');
        this.apiGetCategories();
      } else {
        alert('Vui lòng thử lại');
      }
    });
  }
   btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Vui lòng thêm tên thương hiệu');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm thành công');
        this.apiGetCategories();
      } else {
        alert('Vui lòng thử lại');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
}
export default CategoryDetail;