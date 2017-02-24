/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Form from './components/Form';
import './style/style.scss';

const grayscale = {
  'light-gray': '#e6e6e6',
  'medium-gray': '#cacaca',
  'dark-gray': '#464a4c'
};

const palette = {
  primary: '#a0f',
  secondary: '#03a9f4',
  success: '#47cf73',
  warning: '#fcd000',
  alert: '#ff3c41',
  info: '#76daff',
  text: grayscale['dark-gray']
};

const allColors = Object.assign({}, palette, grayscale);

const Sample = () => (
  <div>
    <div className="column row">
      <h1>Client Style Guide</h1>
      <p className="lead">This style guide was built with Foundation for Sites. For more information on how to use this responsive front-end framework, check out the documentation, get help from the Foundation community, or request immediate technical support.</p>
      <a href="http://foundation.zurb.com/docs/" className="button">Visit the Docs</a>
      <a href="http://foundation.zurb.com/forum/" className="secondary button">Foundation Forum</a>
      <a href="http://foundation.zurb.com/business/business-support.html" className="secondary button">Technical Support</a>
    </div>

    <div className="column row">
      <div className="row collapse">
        <div className="large-3 medium-4 columns" data-sticky-container >
          <ul className="vertical menu">
            <li><a href="#the-grid">The Grid</a></li>
            <li><a href="#colors">Colors</a></li>
            <li><a href="#typography">Typography</a></li>
            <li><a href="#buttons">Buttons</a></li>
            <li><a href="#forms">Forms</a></li>
            <li><a href="#new-section">New Section</a></li>
          </ul>
        </div>
        <div className="large-9 medium-8 columns">
          <section className="ss-section" id="the-grid">
            <h1>The Grid</h1>
            <p className="lead">
              {`Problem: You've got tons of content, each needing
              different sized vertical columns, and don't know how to quick
              and easily get it all done. Solution: The awesome grid!`}
            </p>
            <hr />
            <h2>Overview</h2>
            <p>
              {`The grid is built around two key elements: rows and columns.
              Rows create a max-width and contain the columns, and columns create
              the final structure. Everything on your page that you don't give a
              specific structural style to should be within a row or column.`}
            </p>
            <hr />
            <h2>Nesting</h2>
            <p>
              {`In the Grid you can nest columns down as far as you'd like.
              Just embed rows inside columns and go from there.
              Each embedded row can contain up to 12 columns.`}
            </p>
            <hr />
            <h2>How to Use</h2>
            <p>
              { `Using this framework is easy. Here's how your code will look when you
              use a series of` }<code>div</code>{' tags to create vertical columns.'}
            </p>
            <div className="ss-code">
              <pre>
                <code className="html">
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"row"'}</span>
                  </span>
                  <span className="hljs-tag"> <span className="hljs-title">div</span> <span className="hljs-attribute">className</span>=<span className="hljs-value">{'"small-6 medium-4 large-3 columns"'}</span> </span>...<span className="hljs-tag"> <span className="hljs-title">div</span> </span>
                  <span className="hljs-tag"> <span className="hljs-title">div</span> <span className="hljs-attribute">className</span>=<span className="hljs-value">{'"small-6 medium-8 large-9 columns"'}</span> </span>...<span className="hljs-tag"> <span className="hljs-title">div</span> </span>
                  <span className="hljs-tag"> <span className="hljs-title">div</span> </span>
                </code>
              </pre>
            </div>
            <div className="row display">
              <div className="small-12 large-4 columns">4</div>
              <div className="small-12 large-4 columns">4</div>
              <div className="small-12 large-4 columns">4</div>
            </div>
            <div className="row display">
              <div className="small-12 large-3 columns">3</div>
              <div className="small-12 large-6 columns">6</div>
              <div className="small-12 large-3 columns">3</div>
            </div>
            <div className="row display">
              <div className="small-12 large-2 columns">2</div>
              <div className="small-12 large-8 columns">8</div>
              <div className="small-12 large-2 columns">2</div>
            </div>
            <div className="row display">
              <div className="small-12 large-3 columns">3</div>
              <div className="small-12 large-9 columns">9</div>
            </div>
            <div className="row display">
              <div className="small-12 large-4 columns">4</div>
              <div className="small-12 large-8 columns">8</div>
            </div>
            <div className="row display">
              <div className="small-12 large-5 columns">5</div>
              <div className="small-12 large-7 columns">7</div>
            </div>
            <div className="row display">
              <div className="small-12 large-6 columns">6</div>
              <div className="small-12 large-6 columns">6</div>
            </div>
            <hr />
            <h2>Nesting Rows</h2>
            <p>
              {`In the Grid you can nest columns down as far as you'd like.
              Just embed rows inside columns and go from there.
              Each embedded row can contain up to 12 columns.`}
            </p>
            <div className="ss-code">
              <pre>
                <code className="html">
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"row"'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-8 columns"'}</span>
                  </span>
                  8
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"row"'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-8 columns"'}</span>
                  </span>
                  8 Nested
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"row"'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-8 columns"'}</span>
                  </span>8 Nested Again
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-4 columns"'}</span>
                  </span>
                  4
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-4 columns"'}</span>
                  </span>
                  4
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-4 columns"'}</span>
                  </span>
                  4
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                </code>
              </pre>
            </div>
            <div className="row display">
              <div className="small-8 columns">8
                <div className="row">
                  <div className="small-8 columns">8 Nested
                    <div className="row">
                      <div className="small-8 columns">8 Nested Again</div>
                      <div className="small-4 columns">4</div>
                    </div>
                  </div>
                  <div className="small-4 columns">4</div>
                </div>
              </div>
              <div className="small-4 columns">4</div>
            </div>
            <hr />
            <h2>Small Grid</h2>
            <p>
              {`As you've probably noticed in the examples above, you have access to a small,
              medium, and large grid. If you know that your grid structure will be the same
              for small devices as it will be on large devices, just use the small grid.
              You can override your small grid classNamees by adding medium or large grid
              classNamees`}.
            </p>
            <div className="ss-code">
              <pre>
                <code className="html">
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"row"'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-2 columns"'}</span>
                  </span>
                  2
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-10 columns"'}</span>
                  </span>
                  10, last
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"row"'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-3 columns"'}</span>
                  </span>
                  3
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"small-9 columns"'}</span>
                  </span>
                  9, last
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">div</span>
                  </span>
                </code>
              </pre>
            </div>
            <div className="row display">
              <div className="small-2 columns">2</div>
              <div className="small-10 columns">10, last</div>
            </div>
            <div className="row display">
              <div className="small-3 columns">3</div>
              <div className="small-9 columns">9, last</div>
            </div>
          </section>
          <section className="ss-section" id="colors">
            <h1>Colors</h1>
            <p className="lead">
              {`Below you can find the different values we created that support the primary
              color variable you can change at any time in`} <code>_settings.scss</code>
            </p>
            <hr />
            <div className="row up-1 medium-up-3 large-up-5">
              { Object.keys(allColors).map((color) =>
                (
                  <div className="column">
                    <h5>{color}</h5>
                    <div className="color-block">
                      <span style={{ background: allColors[color] }}></span>
                      { allColors[color] }
                    </div>
                  </div>
                )
              ) }
            </div>
          </section>
          <section className="ss-section" id="typography">
            <h1>Typography</h1>
            <p className="lead">
              This design uses Helvetica Neue for headings and paragraph text.
            </p>
            <hr />
            <h2>Headings</h2>
            <p>
              Headings are used to denote different sections of content,
              usually consisting of related paragraphs and other HTML elements.
              They range from h1 to h6 and should be styled in a clear hierarchy
              (i.e., largest to smallest)
            </p>
            <hr />
            <h2>Paragraphs</h2>
            <p>
              Paragraphs are groups of sentences, each with a lead (first sentence)
              and transition (last sentence). They are block level elements,
              meaning they stack vertically when repeated. Use them as such.
            </p>
            <hr />
            <h1>Heading Level 1</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam
              ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum,
              a optio odio placeat debitis ullam aut non distinctio.
            </p>
            <h2>Heading Level 2</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam
              ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum,
              a optio odio placeat debitis ullam aut non distinctio.
            </p>
            <h3>Heading Level 3</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam
              ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum,
              a optio odio placeat debitis ullam aut non distinctio.
            </p>
            <h4>Heading Level 4</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam
              ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum,
              a optio odio placeat debitis ullam aut non distinctio.
            </p>
            <h5>Heading Level 5</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam
              ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum,
              a optio odio placeat debitis ullam aut non distinctio.
            </p>
            <h6>Heading Level 6</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam
              ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum,
              a optio odio placeat debitis ullam aut non distinctio.
            </p>
          </section>
          <section className="ss-section" id="buttons">
            <h1>Buttons</h1>
            <p className="lead">
              {`Buttons are tied to an action of some kind, whether that button is on a
              cheese dispenser or launches the rocket that you're strapped to.
              On the web, we follow similar conventions.`}
            </p>
            <hr />
            <h2>Primary Buttons</h2>
            <p>
              {'These buttons are primary calls to action and should be used sparingly.'}
              {'Their size can be adjusted with the '}<code>.tiny</code>{', '}<code>.small</code>
              {', and '}<code>{'.large'}</code>{' classNamees.'}
            </p>
            <div className="ss-code">
              <pre>
                <code className="html">
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"primary large button"'}</span>
                  </span>
                  Large button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"primary button"'}</span>
                  </span>
                  Regular button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"primary small button"'}</span>
                  </span>
                  Small button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"primary tiny button"'}</span>
                  </span>
                  Tiny button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                </code>
              </pre>
            </div>

            <div className="ss-code-live">
              <a href="#" className="primary large button">Large button</a>
              <a href="#" className="primary button">Regular button</a>
              <a href="#" className="primary small button">Small button</a>
              <a href="#" className="primary tiny button">Tiny button</a>
            </div>
            <hr />
            <h2>Secondary Buttons</h2>
            <p>These buttons are used for less important, secondary actions on a page.</p>
            <div className="ss-code">
              <pre>
                <code className="html">
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"secondary large button"'}</span>
                  </span>
                  Large button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"secondary button"'}</span>
                  </span>
                  Regular button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"secondary small button"'}</span>
                  </span>
                  Small button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">{'<'}a{'>'}</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"secondary tiny button"'}</span>
                  </span>
                  Tiny button
                  <span className="hljs-tag">
                    <span className="hljs-title">{'</'}a{'>'}</span>
                  </span>
                </code>
              </pre>
            </div>

            <div className="ss-code-live">
              <a href="#" className="secondary large button">Large button</a>
              <a href="#" className="secondary button">Regular button</a>
              <a href="#" className="secondary small button">Small button</a>
              <a href="#" className="secondary tiny button">Tiny button</a>
            </div>
          </section>
          <Form />
          <section className="ss-section" id="new-section">
            <h1>New Section</h1>
            <p>
              {`Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Tempora omnis suscipit id ut laborum recusandae molestias hic aliquid`}
              <strong>{'expedita!'}</strong> <a href="zurb.com">{'Non dicta'}</a>,
              {'autem obcaecati error, id ab voluptate unde culpa nulla.'}
            </p>
            <div className="ss-code">
              <pre>
                <code className="html">
                  <span className="hljs-tag">
                    <span className="hljs-title">a</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"button"'}</span>
                  </span>
                  Button
                  <span className="hljs-tag">
                    <span className="hljs-title">a</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">a</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"button"'}</span>
                  </span>
                  Button
                  <span className="hljs-tag">
                    <span className="hljs-title">a</span>
                  </span>
                  <span className="hljs-tag">
                    <span className="hljs-title">a</span>
                    <span className="hljs-attribute">href</span>=
                    <span className="hljs-value">{'"#"'}</span>
                    <span className="hljs-attribute">className</span>=
                    <span className="hljs-value">{'"button"'}</span>
                  </span>
                  Button
                  <span className="hljs-tag">
                    <span className="hljs-title">a</span>
                  </span>
                </code>
              </pre>
            </div>

            <div className="ss-code-live">
              <a href="#" className="button">Button</a>
              <a href="#" className="button">Button</a>
              <a href="#" className="button">Button</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

export default Sample;
