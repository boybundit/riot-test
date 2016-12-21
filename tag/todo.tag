todo
  style.
    todo { display: block }
    todo h3 { font-size: 120% }
    todo .completed { text-decoration: line-through; }
    todo .red { color: red; }

  h3 { opts.title }

  ul
    li(each="{ items }")
      label(class="{ completed: done, red: done && red_completed }")
        input(type="checkbox" checked="{ done }" onclick="{ parent.toggle }")
        span { title }
        span(show="{ done }") - DONE

  form(onsubmit="{ add }")
    input(ref="input" onkeyup="{ edit }")
    button(disabled="{ !text }") Add No. { items.length + 1 }

  script.
    this.red_completed = opts.red_completed;
    this.items = opts.items;

    edit(e) {
      this.text = e.target.value;
    }

    add(e) {
      e.preventDefault();
      if (this.text) {
        this.items.push({ title: this.text });
        this.text = this.refs.input.value = '';
      }
    }

    toggle(e) {
      var item = e.item;
      item.done = !item.done;
    }
