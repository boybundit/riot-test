route
  style.
    route .menu { display: inline; }

  h3 Route: /{ page }
  .menu: a(href="#/") Home
  .menu: a(href="#/about") About
  .menu: a(href="#/contact") Contact
  .menu: a(href="#/a/b/c") Sub Page

  script.
    // Routes
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
