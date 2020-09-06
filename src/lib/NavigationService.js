import * as React from 'react';

export const navigationRef = React.createRef();

export default class NavigationService {
  static navigate(name, params) {
    navigationRef.current?.navigate(name, params);
  }

  // add other navigation functions that you need and export them
}
