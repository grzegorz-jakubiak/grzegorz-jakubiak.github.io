require 'active_support'
require 'active_support/core_ext/string'
require 'nokogiri'

Jekyll::Hooks.register :posts, :post_render do |post|
  puts "My Custom hook lol"
  html = post.output
  doc = Nokogiri::HTML(html)
  head = doc.at_css('head')
  head << <<~WTF
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react",
          "react-dom": "https://esm.sh/react-dom",
          "htm": "https://esm.sh/htm"
        }
      }
    </script>
  WTF
  post.output = doc.to_html
end

class ReactTag < Liquid::Block
  def initialize(tag, params, tokens)
    @component_name = params
    @id = @component_name.underscore.dasherize
    super
  end

  def render(context)
    @code = super
    <<~WTF
      <div id="#{@id}"></div>
      <script type="module">
        import React from 'react';
        import ReactDOM from 'react-dom';
        import htm from 'https://esm.sh/htm'
        const html = htm.bind(React.createElement);
        #{@code}

        ReactDOM.render(html`<${#{@component_name}} />`, document.getElementById('#{@id}'));
      </script>
    WTF
  end
end

Liquid::Template.register_tag('react', ReactTag)
