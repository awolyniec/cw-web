import React from 'react';

import { MemberListItem } from '../MemberListItem';

import './styles.scss';

const MemberList = ({ data = [] }) => {
  return (
    <div className="member-list">
      {data.map(member => {
        return (
          <div className="member-entry-container" key={`member-${member.name}`}>
            {<MemberListItem { ...member } />}
          </div>
        );
      })}
    </div>
  );
};

export default MemberList;