import React from 'react';

const CampusNetwork = ({ store }) => {
  if (!store.currentCampus) {
    return (
      <div className="hospital-list">
        <ul>
          {
            store.campuses.map(campus => (
              <li onClick={() => store.setCurrentCampus(campus)} key={campus.id}>{campus.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }

  return (
    <div className="campus-network">
    </div>
  );
};

export default CampusNetwork;
