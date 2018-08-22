import React from 'react';
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
  <div className="create-story">
    <div className="create-story__form">
      <div className="create-story__form-block">
        <div className="create-story__form-label">Tags</div>
        <div className="create-story__form-input"><Dropdown isSearchable isMulti options={TAGS} /></div>
      </div>
    </div>
    <div className="create-story__text-editor">
      <TextEditor />
    </div>
  </div>
);

export default StoryPage;
