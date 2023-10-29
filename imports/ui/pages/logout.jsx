import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

const Logout = () => {
  const user = useTracker(() => Meteor.user());


return (
  <Fragment>
    <h1>Ciao</h1>
    <div className="user" onClick={() => Meteor.logout()}>
      🚪 {user?.username}
    </div>
  </Fragment>)
}

export default Logout;