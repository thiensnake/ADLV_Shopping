import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (

      <div class="wrapper">
      <div class="logo">
          
      </div>
      <div class="text-center mt-4 name">
          <h3>KÍCH HOẠT TÀI KHOẢN</h3>
        </div>
      <form class="p-3 mt-3">
          <div class="form-field d-flex align-items-center">
              <span class="far fa-user"></span>
              <input type="text"  placeholder="ID" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }}  />
          </div>
          <div class="form-field d-flex align-items-center">
              <span class="fas fa-key"></span>
              <input type="text" placeholder="TOKEN" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} />
          </div>
          <button class="btn mt-3" type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)}>KÍCH HOẠT</button>
      </form>
  </div>
    
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    
    if (id && token) {
      // Both ID and token are provided, proceed with apiActive
      this.apiActive(id, token);
    } else {
      // Check if both ID and token are missing or one of them is missing
      if (!id && !token) {
        alert('Vui lòng nhập ID và token.'); // Both ID and token are missing
      } else if (!id) {
        alert('Vui lòng nhập ID.'); // ID is missing
      } else {
        alert('Vui lòng nhập token.'); // Token is missing
      }
    }
  }
  
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Kích hoạt thành công');
      } else {
        alert('Vui lòng thử lại');
      }
    });
  }
}
export default Active;