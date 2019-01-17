import React from 'react';
import { Link } from 'react-router-dom';


const TagList = () => {
  const visibleTags = [
    { name: 'freakin', rate: '13 411' },
    { name: 'ducks', rate: '2 411' },
    { name: 'empathy', rate: '51' },
    { name: 'freakin', rate: '2 222' },
  ];

  return (
    <div className="organization-list">
      <div className="organization-list__list">
        {visibleTags.map((item, id) => (
          <div className="organization-list__item" key={id}>
            <div className="user-card-simple_tag">
              <div className="user-card-simple__name">
                <Link to="#">#{item.name}</Link>
              </div>
              <div className="user-card-simple__rate">
                {item.rate}°
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default TagList;
