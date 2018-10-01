import Validator from 'validatorjs';
import React, { PureComponent } from 'react';
import TextInput from './TextInput';
import Button from './Button';

class SourceForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rules: {
        title: 'required',
        sourceUrl: 'required|url',
      },
      errors: {},
      data: {
        title: this.props.title || '',
        description: this.props.description || '',
        sourceUrl: this.props.sourceUrl || '',
      },
      isValid: false,
    };
  }

  setData(fields) {
    const keys = Object.keys(fields);
    const data = Object.assign({}, this.state.data, fields);
    const validation = new Validator(data, this.state.rules);
    const isValid = validation.passes();
    const fieldsErrors = keys.reduce((value, key) => ({ ...value, [key]: validation.errors.get(key) }), {});

    this.setState({
      errors: Object.assign({}, this.state.errors, fieldsErrors),
      isValid,
      data,
    });
  }

  submit() {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this.state.data);
    }
  }

  reset() {
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  }

  render() {
    return (
      <div className="source-form">
        <div className="fields">
          <div className="fields__title">
            <h2 className="title title_xxsmall">Add external community</h2>
          </div>

          <div className="fields__item">
            <div className="field">
              <div className="field__label">Community name</div>
              <div className="field__input">
                <TextInput
                  touched
                  topLabel
                  isRequired
                  value={this.state.data.title}
                  error={this.state.errors.title && this.state.errors.title[0]}
                  onChange={title => this.setData({ title })}
                  placeholder="Kickstarter"
                />
              </div>
            </div>
          </div>

          <div className="fields__item">
            <div className="field">
              <div className="field__label">Description</div>
              <div className="field__input">
                <TextInput
                  touched
                  topLabel
                  value={this.state.data.description}
                  error={this.state.errors.description && this.state.errors.description[0]}
                  onChange={description => this.setData({ description })}
                  placeholder="Decenralized Exch..."
                />
              </div>
            </div>
          </div>

          <div className="fields__item">
            <div className="field">
              <div className="field__label">Community link</div>
              <div className="field__input">
                <TextInput
                  touched
                  topLabel
                  isRequired
                  value={this.state.data.sourceUrl}
                  error={this.state.errors.sourceUrl && this.state.errors.sourceUrl[0]}
                  onChange={sourceUrl => this.setData({ sourceUrl })}
                  placeholder="http://...."
                />
              </div>
            </div>
          </div>

          <div className="fields__item">
            <div className="field">
              <div className="field__input">
                <div className="inline">
                  <div className="inline__item">
                    <Button
                      theme="red"
                      size="small"
                      text="Add Community"
                      isDisabled={!this.state.isValid}
                      onClick={() => {
                        this.submit();
                        this.reset();
                      }}
                    />
                  </div>
                  <div className="inline__item">
                    <Button
                      theme="light"
                      size="small"
                      text="Cancel"
                      onClick={() => this.reset()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SourceForm;
