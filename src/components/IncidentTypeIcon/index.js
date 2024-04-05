/* eslint-disable react/jsx-props-no-spreading */
// @flow

import React from 'react';
import Icon from '@material-ui/core/Icon';
import VideocamIcon from '@material-ui/icons/Videocam';

type Props = {
  iconName: string,
}

const iconElementDictionary = {
  fire: props => (
    <img { ...props } src="/images/icons/fire.svg" alt="Fire" />
  ),
  video: props => (
    <VideocamIcon { ...props } />
  ),
  intrusion: props => (
    <img { ...props } src="/images/icons/intrusion.svg" alt="Intrusion" />
  ),
};

const DefaultIcon = ( props: any ) => (
  <Icon { ...props } fontSize="small">warning</Icon>
);

const IncidentTypeIcon = ( props: Props ) => {
  const { iconName, ...otherProps } = props;

  if ( Object.keys( iconElementDictionary ).includes( iconName ) ) {
    const SelectedIcon = iconElementDictionary[ iconName ];
    return (
      <SelectedIcon { ...otherProps } />
    );
  }
  return (
    <DefaultIcon { ...otherProps } />
  );
};

export default IncidentTypeIcon;
