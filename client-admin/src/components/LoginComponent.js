import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <div class="wrapper">
        <div class="logo">
            <img src="https://images.thefepi.com/files/1/products/files/files/96831/ADLV200726_260.jpg" alt="Logo"/>
        </div>
        <div class="text-center mt-4 name">
          <h3>Admin Panel</h3>
        </div>
        <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Tên đăng nhập" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Mật khẩu" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}/>
            </div>
            <button class="btn mt-3" value="LOGIN" onClick={(e) => this.btnLoginClick(e)}>Đăng nhập</button>
        </form>
    </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    
    if (!username && !password) {
      alert('Vui lòng nhập tên người dùng và mật khẩu');
    } else if (!username) {
      alert('Vui lòng nhập tên người dùng');
    } else if (!password) {
      alert('Vui lòng nhập mật khẩu');
    } else {
      const account = { username, password };
      this.apiLogin(account);
    }
  }
  
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;