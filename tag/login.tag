login
  h3 Login: username={username}
  form
    input(ref="username" name="username" type="text" placeholder="username")
    input(ref="password" name="password" type="password" placeholder="password")
    button(onclick="{ login }") Login
    button(onclick="{ logout }") Logout

  script.
    login(e) {
      e.preventDefault();
      opts.auth.login({
        username: this.refs.username.value,
        password: this.refs.password.value
      });
    }
    logout(e) {
      e.preventDefault();
      opts.auth.logout();
    }

    this.username = 'null';
    var that = this;
    // any tag on the system can listen to login event
    opts.auth.on('login', function(json) {
      that.username = json.username;
      that.update();
    });
    opts.auth.on('logout', function() {
      that.username = 'null';
      that.update();
    });
