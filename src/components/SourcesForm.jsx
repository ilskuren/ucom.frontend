import React, { PureComponent } from 'react';
import CommunitiesSearch from './CommunitiesSearch';
import CommunitieList from './CommunitieList';
import SourceForm from './SourceForm';

class SourcesForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVisible: false,
    };
  }

  showForm() {
    this.setState({ formVisible: true });
  }

  hideForm() {
    this.setState({ formVisible: false });
  }

  render() {
    return (
      <div className="fields">
        <div className="fields__item">
          <div className="field field_reverse">
            <div className="field__input">
              <div className="field__section field__section_large">
                <CommunitiesSearch
                  placeholder={this.props.placeholder}
                  loadOptions={this.props.loadOptions}
                  onClickAddExternal={() => this.showForm()}
                  onChange={data => this.props.onSearch(Object.assign({}, data, { sourceType: 'internal' }))}
                />
              </div>
              {this.props.list.length > 0 && (
                <div className="field__section">
                  <CommunitieList
                    list={this.props.list}
                    onClickRemove={index => this.props.onClickRemove(index)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {this.state.formVisible && (
          <div className="fields__item">
            <SourceForm
              fieldPrefix={this.props.fieldPrefix}
              onReset={() => this.hideForm()}
              onSubmit={data => this.props.onSubmit(data)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SourcesForm;
