import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
      <div class="wrapper">
      <div class="logo">
          
      </div>
      <div class="text-center mt-4 name">
          <h3>ĐĂNG KÝ TÀI KHOẢN</h3>
        </div>
      <form class="p-3 mt-3">
          <div class="form-field d-flex align-items-center">
              <span class="far fa-user"></span>
              <input type="text" name="userName" id="userName" placeholder="Tên đăng nhập" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
          </div>
          <div class="form-field d-flex align-items-center">
              <span class="fas fa-key"></span>
              <input type="password" name="password" id="pwd" placeholder="Mật khẩu" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input type="text" placeholder="Tên khách hàng" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
        </div>
        <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input type="tel" placeholder="Số điện thoại" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
        </div>
        <div class="form-field d-flex align-items-center">
              <span class="far fa-user"></span>
              <input type="email" placeholder="Email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
          </div>
          <button class="btn mt-3" type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)}  >Đăng ký tài khoản</button>
          <div class="text-center">
          <Link to='/Active'>
          <p class="active-1">Kích hoạt tài khoản</p>
        </Link>
        </div>
      </form>
  </div>

    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    const diachi = this.state.txtDiachi;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email, diachi: diachi };
      this.apiSignup(account);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin khách hàng');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;