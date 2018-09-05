import React from 'react';
import cn from 'classnames';

const Pagination = () => (
  <div className="pagination">
    <div className={cn('pagination__turn', { pagination__turn_active: false })}>Prev</div>
    <div className="pagination__pages">
      {[1, 2, 3, 4, 5].map(page => (
        <span key={page} className={cn('pagination__page', { pagination__page_active: page === 1 })}>{page}</span>
      ))}
      <span className="pagination__page">. . .</span>
      <span className="pagination__page">105</span>
    </div>
    <div className={cn('pagination__turn', { pagination__turn_active: true })}>Next</div>
  </div>
);


export default Pagination;
