
riot.tag2('login', '<h3>Login: username={username}</h3> <form> <input ref="username" name="username" type="text" placeholder="username"> <input ref="password" name="password" type="password" placeholder="password"> <button onclick="{login}">Login</button> <button onclick="{logout}">Logout</button> </form>', '', '', function(opts) {
    this.login = function(e) {
      e.preventDefault();
      opts.auth.login({
        username: this.refs.username.value,
        password: this.refs.password.value
      });
    }.bind(this)
    this.logout = function(e) {
      e.preventDefault();
      opts.auth.logout();
    }.bind(this)

    this.username = 'null';
    var that = this;

    opts.auth.on('login', function(json) {
      that.username = json.username;
      that.update();
    });
    opts.auth.on('logout', function() {
      that.username = 'null';
      that.update();
    });
});

riot.tag2('route', '<h3>Route: /{page}</h3> <div class="menu"><a href="#/">Home</a></div> <div class="menu"><a href="#/about">About</a></div> <div class="menu"><a href="#/contact">Contact</a></div> <div class="menu"><a href="#/a/b/c">Sub Page</a></div>', 'route .menu { display: inline; }', '', function(opts) {

    this.page = '';
    var that = this;
    route.base('#');
    route('/*', function (page) {
      that.page = page;
      that.update();
    });
    route(function () {
      that.page = Array.from(arguments).join('/');
      that.update();
    });
    route.start(true);
});

riot.tag2('todo', '<h3>{opts.title}</h3> <ul> <li each="{items}"> <label class="{completed: done, red: done &amp;&amp; red_completed}"> <input type="checkbox" checked="{done}" onclick="{parent.toggle}"><span>{title}</span><span show="{done}">- DONE</span> </label> </li> </ul> <form onsubmit="{add}"> <input ref="input" onkeyup="{edit}"> <button disabled="{!text}">Add No. {items.length + 1}</button> </form>', 'todo { display: block } todo h3 { font-size: 120% } todo .completed { text-decoration: line-through; } todo .red { color: red; }', '', function(opts) {
    this.red_completed = opts.red_completed;
    this.items = opts.items;

    this.edit = function(e) {
      this.text = e.target.value;
    }.bind(this)

    this.add = function(e) {
      e.preventDefault();
      if (this.text) {
        this.items.push({ title: this.text });
        this.text = this.refs.input.value = '';
      }
    }.bind(this)

    this.toggle = function(e) {
      var item = e.item;
      item.done = !item.done;
    }.bind(this)
});