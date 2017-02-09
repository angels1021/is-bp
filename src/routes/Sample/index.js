/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import './style/style.scss';

const Sample = () => (
  <div>
    <div className="pattern">
      <div className="display">
        <blockquote>
          <p>
            This text is quoted. A block of quoted text like this is
            particularly useful when presented as a pull-quote within
            an article of text.
          </p>
        </blockquote>
      </div>
      <div className="source">
        <div className="source-container" >
          <blockquote>
            <p>This text is quoted. A block of quoted text like this is
                particularly useful when presented as a pull-quote within
                an article of text.
            </p>
          </blockquote>
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <div className="feedback error">
          <p>This is an error feedback message.</p>
        </div>
      </div>
      <div className="source">
        <div className="source-container" >
          <div className="feedback error">
            <p>This is an error feedback message.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <div className="feedback">
          <p>This is a feedback message for the user.</p>
        </div>
      </div>
      <div className="source">
        <div className="source-container" >
          <div className="feedback">
            <p>This is a feedback message for the user.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <button type="button">Button element</button>
        <button type="submit">Submit button</button>
      </div>
      <div className="source">
        <div className="source-container" >
          <button type="button">Button element</button>
          <button type="submit">Submit button</button>
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <label htmlFor="sample_checkbox" >
          <input name="sample_checkbox" type="checkbox" />
          <span>Label text</span>
        </label>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <label htmlFor="input_email" >Label text</label>
        <input name="input_email" type="email" />
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <label htmlFor="input_number" >Label text</label>
        <input name="input_number" type="number" />
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <select>
          <option>option text</option>
        </select>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <label htmlFor="input_text" >Label text</label>
        <input name="input_text" type="text" />
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <label htmlFor="input_textarea" >Label text</label>
        <textarea name="input_textarea" rows="5" cols="20"></textarea>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <label htmlFor="input_url" >Label text</label>
        <input name="input_url" type="url" />
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <h1>Level one heading</h1>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <h2>Level two heading</h2>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <h3>Level three heading</h3>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <h4>Level four heading</h4>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <h5>Level five heading</h5>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <h6>Level six heading</h6>
      </div>
      <div className="source">
        <div className="source-container" >
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <ol>
          <li>First list item</li>
          <li>Second item in a list of ordered items</li>
          <li>Third item in the list</li>
        </ol>
      </div>
      <div className="source">
        <div className="source-container" >
          <ol>
            <li>First list item</li>
            <li>Second item in a list of ordered items</li>
            <li>Third item in the list</li>
          </ol>
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <ul>
          <li>A list item</li>
          <li>Another item in a list</li>
          <li>Yet another item in this list of items</li>
        </ul>
      </div>
      <div className="source">
        <div className="source-container" >
          <ul>
            <li>A list item</li>
            <li>Another item in a list</li>
            <li>Yet another item in this list of items</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="pattern">
      <div className="display">
        <p>This is a paragraph of text. Some of the text may be <em>emphasised</em> and some it
        might even be <strong>strongly emphasised</strong>. Occasionally <q>quoted text</q> may be
        found within a paragraph and of course <a href="#">a link</a> may appear at any point
        in the text. The average paragraph contains five or six sentences although some may contain
        as little or one or two while others carry on for anything up to ten sentences and beyond.
        </p>
      </div>
      <div className="source">
        <div className="source-container" >
          <p>This is a paragraph of text. Some of the text may be <em>emphasised</em> and some it
            might even be <strong>strongly emphasised</strong>. Occasionally <q>quoted text</q> may be
            found within a paragraph and of course <a href="#">a link</a> may appear at any point
            in the text. The average paragraph contains five or six sentences although some may contain
            as little or one or two while others carry on for anything up to ten sentences and beyond.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Sample;
