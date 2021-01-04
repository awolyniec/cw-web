import React from 'react';

import './styles.scss';

const MemberListItem = ({ name, color, isSelf }) => {
  return (
    <div className="member-list-item">
      <div className="color-circle" style={{ "background-color": color }} />
      <b>{name} {isSelf ? (" (you)") : (<></>)}</b>
    </div>
  );
};

export default MemberListItem;