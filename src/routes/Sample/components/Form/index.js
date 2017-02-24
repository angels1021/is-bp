import React from 'react';

const Form = () => (
  <section className="ss-section" id="forms">
    <h1>Forms</h1>
    <p className="lead">
      {`Use forms to allow users to interact with the site and
      provide information to the company.`}
    </p>

    <hr />
    <h2>Elements of a Form</h2>
    <p>
      {`A form should be marked up using its default HTML properties.
      The ones we make use of include (in hierarchical order):`}
    </p>
    <ul>
      <li>Form</li>
      <li>Label</li>
      <li>Input</li>
      <li>Select</li>
      <li>Text area</li>
      <li>Button</li>
    </ul>
    <hr />
    <h2>How to Use</h2>
    <p>{'Make forms great and easy to use with the following rules:'}</p>
    <ul>
      <li>{'Wrap checkboxes and radio buttons within labels for larger hit areas, and be sure to set the for, name, and id attributes for all applicable elements.'}</li>
      <li>{'Series of checkboxes and radio buttons below within a '}<code>{' ul className="inline-list" '}</code>.</li>
      <li>{'Before selecting any set of fields to use for a required input, explore other options (e.g., radio buttons over select lists).'}</li>
    </ul>
    <hr />
    <h2>Learn All About Forms</h2>
    <p>
      {'Check out the'}
      <a href="http://foundation.zurb.com/sites/docs">Foundation Docs</a>
      {`to learn about how flexible our forms are for creating different layouts.
      It works perfectly with the grid to meet all your form needs.`}
    </p>
    <hr />
    <h2>Form Layouts</h2>
    <p>
      {`Form elements in Foundation are styled based on their type attribute
      rather than a className. Inputs in Foundation have another major advantage —
      they are full width by default. That means that inputs will run as
      wide as the column that contains them. However, you have two options
      which make these forms extremely versatile:`}
    </p>
    <ul>
      <li>
        {'You can size inputs using column sizes, like '}
        <code>.medium-6</code>, <code>.small-6</code>.
      </li>
      <li>
        {`You can create row elements inside your form and use columns for the form,
        including inputs, labels and more. Rows inside a form inherit some special padding
        to even up input spacing.`}
      </li>
    </ul>
    <hr />
    <h2>Form Example</h2>
    <div className="ss-code">
      <pre>
        <code className="html">
          <span className="hljs-tag">
            <span className="hljs-title">{'<form>\n'}</span>
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'  <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"row"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'    <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"large-12 columns"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'      <label>'}</span>
          </span>
          {'Label'}
          <span className="hljs-tag">
            <span className="hljs-title">{'</label>\n'}</span>
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'      <input '}</span>
            <span className="hljs-attribute">type</span>=
            <span className="hljs-value">{'"text"'}</span>
            <span className="hljs-attribute">placeholder</span>=
            <span className="hljs-value">{'"placeholder"'}</span> {' />\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  </div>\n'}</span> </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'  <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"row"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'    <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"large-6 columns"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <label>'}</span> </span>
          {'Label'}
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'      <input '}</span>
            <span className="hljs-attribute">type</span>=
            <span className="hljs-value">{'"text"'}</span>
            <span className="hljs-attribute">placeholder</span>=
            <span className="hljs-value">{'"placeholder"'}</span>
            {' />\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'    </div>\n'}</span>
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'    <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"large-6 columns"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'      <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"row collapse"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'        <label>'}</span> </span>
          {'Label'}
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'        <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"input-group"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'          <input '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"input-group-field"'}</span>
            <span className="hljs-attribute">type</span>=
            <span className="hljs-value">{'"text"'}</span>
            <span className="hljs-attribute">placeholder</span>=
            <span className="hljs-value">{'"placeholder"'}</span>
            {' />\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'          <span '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"input-group-label"'}</span>
            {' >'}
          </span>.com
          <span className="hljs-tag"> <span className="hljs-title">{'</span>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'        </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"row"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag">
            <span className="hljs-title">{'    <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"large-12 columns"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <label>'}</span> </span>
          Select Box
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <select>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'        <option '}</span>
            <span className="hljs-attribute">value</span>=
            <span className="hljs-value">{'"good"'}</span>
            {' >'}
          </span>
          Good
          <span className="hljs-tag"> <span className="hljs-title">{'</option>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'        <option '}</span>
            <span className="hljs-attribute">value</span>=
            <span className="hljs-value">{'"better"'}</span>
            {' >'}
          </span>
          Better
          <span className="hljs-tag"> <span className="hljs-title">{'</option>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'        <option '}</span>
            <span className="hljs-attribute">value</span>=
            <span className="hljs-value">{'"best"'}</span>
            {' >'}
          </span>
          Best
          <span className="hljs-tag"> <span className="hljs-title">{'</option>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      </select>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"row"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"large-6 columns"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <label>'}</span>
          </span>
          Choose Your Favorite
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <input '}</span>
            <span className="hljs-attribute">type</span>=
            <span className="hljs-value">{'"radio"'}</span>
            <span className="hljs-attribute">name</span>=
            <span className="hljs-value">{'"radio1"'}</span>
            <span className="hljs-attribute">value</span>=
            <span className="hljs-value">{'"radio1"'}</span>
            <span className="hljs-attribute">id</span>=
            <span className="hljs-value">{'"radio1"'}</span>
            {' />\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <label '}</span>
            <span className="hljs-attribute">for</span>=
            <span className="hljs-value">{'"radio1"'}</span>
            {' >'}
          </span>
          Red
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <input '}</span>
            <span className="hljs-attribute">type</span>=
            <span className="hljs-value">{'"radio"'}</span>
            <span className="hljs-attribute">name</span>=
            <span className="hljs-value">{'"radio1"'}</span>
            <span className="hljs-attribute">value</span>=
            <span className="hljs-value">{'"radio2"'}</span>
            <span className="hljs-attribute">id</span>=
            <span className="hljs-value">{'"radio2"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <label '}</span>
            <span className="hljs-attribute">for</span>=
            <span className="hljs-value">{'"radio2"'}</span>
          </span>
          Blue
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"large-6 columns"'}</span>
            {' >\n'}
          </span>

          <span className="hljs-tag"> <span className="hljs-title">{'      <label>'}</span>
          </span>
          Check these out
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <input '}</span>
            <span className="hljs-attribute">id</span>=
            <span className="hljs-value">{'"checkbox1"'}</span>
            <span className="hljs-attribute">type</span>=
            <span className="hljs-value">{'"checkbox"'}</span>
            {' />\n'}
          </span>

          <span className="hljs-tag"> <span className="hljs-title">{'      <label '}</span>
            <span className="hljs-attribute">for</span>=
            <span className="hljs-value">{'"checkbox1"'}</span>
            {' >'}
          </span>
          Checkbox 1
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <input '}</span>
            <span className="hljs-attribute">id</span>=
            <span className="hljs-value">{'"checkbox2"'}</span>
            <span className="hljs-attribute">type</span>=
            <span className="hljs-value">{'"checkbox"'}</span>
            {' />\n'}
          </span>

          <span className="hljs-tag"> <span className="hljs-title">{'      <label '}</span>
            <span className="hljs-attribute">for</span>=
            <span className="hljs-value">{'"checkbox2"'}</span>
            {' >'}
          </span>
          Checkbox 2
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"row"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    <div '}</span>
            <span className="hljs-attribute">className</span>=
            <span className="hljs-value">{'"large-12 columns"'}</span>
            {' >\n'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <label>'}</span> </span>

          Textarea Label
          <span className="hljs-tag"> <span className="hljs-title">{'</label>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'      <textarea '}</span>
            <span className="hljs-attribute">placeholder</span>=
            <span className="hljs-value">{'"placeholder"'}</span>
            {' >'}
          </span>
          <span className="hljs-tag"> <span className="hljs-title">{'</textarea>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'    </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'  </div>\n'}</span> </span>
          <span className="hljs-tag"> <span className="hljs-title">{'</form>'}</span> </span>
        </code>
      </pre>
    </div>

    <div className="ss-code-live">
      <form>
        <div className="row">
          <div className="large-12 columns">
            <label htmlFor="textInput" >Label</label>
            <input name="textInput" type="text" placeholder="placeholder" />
          </div>
        </div>
        <div className="row">
          <div className="large-6 columns">
            <label htmlFor="emailInput" >Label email</label>
            <input name="emailInput" type="email" placeholder="placeholder" />
          </div>
          <div className="large-6 columns">
            <div className="row collapse">
              <label htmlFor="groupInput" >Label</label>
              <div className="input-group">
                <input name="groupInput" className="input-group-field" type="text" placeholder="placeholder" />
                <span className="input-group-label">.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <label htmlFor="selectInput" >Select Box</label>
            <select name="selectInput" >
              <option value="good">Good</option>
              <option value="better">Better</option>
              <option value="best">Best</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="large-6 columns">
            <h5>Choose Your Favorite</h5>
            <input type="radio" name="radio1" value="radio1" id="radio1" /><label htmlFor="radio1">Red</label>
            <input type="radio" name="radio1" value="radio2" id="radio2" /><label htmlFor="radio1">Blue</label>
          </div>
          <div className="large-6 columns">
            <h5>Check these out</h5>
            <input id="checkbox1" type="checkbox" /><label htmlFor="checkbox1">Checkbox 1</label>
            <input id="checkbox2" type="checkbox" /><label htmlFor="checkbox2">Checkbox 2</label>
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <label htmlFor="textareaInput" >Textarea Label</label>
            <textarea name="textareaInput" placeholder="placeholder"></textarea>
          </div>
        </div>
      </form>
    </div>
  </section>
);

Form.propTypes = {
  // prop: PropTypes.string.isRequired
  //
};

export default Form;
