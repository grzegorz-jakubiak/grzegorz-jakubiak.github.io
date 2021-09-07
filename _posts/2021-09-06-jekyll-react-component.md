---
layout: post
title: Jekyll React Component
date: 2021-09-06 20:46
excerpt_separator: <!--more-->
categories: Ruby
---

I've recently learned that you can finally use JavaScript `import` natively in the browser. I've decided to try it out.

<!--more-->

> Every act of creation is first an act of destruction.
>
> -- <cite>Pablo Picasso</cite>

Ever thought of integrating jekyll with React so you can render components directly? 
... 

Yes, sir! 

Then gather round the fireplace, and I'll spin the tale.

# The tale

The support of `import` in the browser means you can use any ES module directly. Using websites like e.g. [ESM](https://esm.sh/) which is a CDN for `npm` packages you are able to add any dependency to your modules.

This is great, but with React there is one problem. We are used to `JSX` syntax. However, `JSX` requires transpilation which is not available in the browser.

Fortunately, there's an alternative - [HTM(Hyperscript Tagged Markup)](https://github.com/developit/htm). Using **HTM** it is possible to write slightly modified `JSX` syntax.

I put all of these together and built [jekyll-react-component](https://github.com/grzegorz-jakubiak/jekyll-react-component). It adds a `react_component` tag to jekyll. You can use that to write React components like so

{% raw %}
```
{% react_component {"name": "ComponentName"} %}
... javascript code...
{% endreact_component %}
```
{% endraw %}

Et voilà:

{% react_component {"name": "Clock"} %}
import AnalogClock from 'https://esm.sh/analog-clock-react';


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        clockOptions: {
          width: "300px",
          border: true,
          borderColor: "#2e2e2e",
          baseColor: "#17a2b8",
          centerColor: "#459cff",
          centerBorderColor: "#fff",
          handColors: {
            second: "#d81c7a",
            minute: "#fff",
            hour: "#fff"
          }
        },
        date: new Date()
      };
    }

    componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

    render() {
      return html`<${AnalogClock} ...${this.state.clockOptions}/>`;
    }
}

{% endreact_component %}


A clock component built with ES modules and [AnalogClock](https://github.com/vishnuramana/analogclock) React component.