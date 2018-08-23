import React, { Fragment } from 'react';
import TextEditor from '../../components/TextEditor';
import Dropdown from '../../components/Dropdown';

const TAGS = [
  { value: 'fsdf', label: 'fsdf' },
  { value: 'fsdf2', label: 'fsdf2' },
  { value: 'fsd3', label: 'fsd3' },
  { value: 'fsdf5', label: 'fsdf5' },
  { value: 'fsd7', label: 'fsd7' },
  { value: 'fsdfee', label: 'fsdfee' },
  { value: 'fsdgf', label: 'fsdgf' },
  { value: 'fsdsdf', label: 'fsdsdf' },
  { value: 'fsdsdgsf', label: 'fsdsdgsf' },
  { value: 'fsdfdgf', label: 'fsdfdgf' },
];

const StoryPage = () => (
  <Fragment>
    <div className="create-post__content">
      <div className="create-post__field">
        <div className="field">
          <div className="field__label">Tags</div>
          <div className="field__input">
            <Dropdown isSearchable isMulti options={TAGS} />
          </div>
        </div>
      </div>
    </div>

    <div className="create-post__editor">
      <TextEditor />
    </div>
  </Fragment>
);

export default StoryPage;
