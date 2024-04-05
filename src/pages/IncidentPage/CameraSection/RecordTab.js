// @flow
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import GetAppIcon from '@material-ui/icons/GetApp';

import moment from 'moment';
import { Button } from '@material-ui/core';

const VIDEO_DOWNLOAD_ADDRESS = process.env.VIDEO_DOWNLOAD_ADDRESS || '';

type Camera = {
  id: string,
  name: string,
  rtsp_stream: string,
  rtsp_params: string,
  selected: boolean,
  onMouseEnter: Function,
  onMouseLeave: Function,
};

type RecordTabProp = {
  videoNames: string[],
  cameras: Camera[],
};

const getVideoList = ( videoName: string, cameras: Camera[] ) => {
  const cameraResult = cameras.find( camera => (
    videoName.includes( `cam-${ camera.id }` )
  ) );
  if ( cameraResult ) {
    const matchResult: any = videoName.match( /record-(\S+).mp4/ );
    return {
      name: videoName,
      cameraName: cameraResult.name,
      timestamp: matchResult[ 1 ],
    };
  }
  return null;
};

const RecordTab = ( props: RecordTabProp ) => {
  const { videoNames, cameras } = props;
  const recordList: any[] = videoNames
    .filter( name => name.includes( 'record' ) )
    .map( name => getVideoList( name, cameras ) )
    .filter( entry => entry !== null );
  return (
    <Table>
      <TableHead>
        <TableRow elementType="tr">
          <TableCell>Camera</TableCell>
          <TableCell>Date/Time</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody elementType="tbody">
        {
          recordList.map( record => {
            const href = `${ VIDEO_DOWNLOAD_ADDRESS }/video/${ record.name }`;
            return (
              <TableRow key={ record.name.replace( '.mp4', '' ) } elementType="tr">
                <TableCell>{ record.cameraName }</TableCell>
                <TableCell>{ moment( record.timestamp ).toString() }</TableCell>
                <TableCell>
                  <Button
                    startIcon={ <GetAppIcon /> }
                    href={ href }
                    target="_blank"
                  />
                </TableCell>
              </TableRow>
            );
          } )
        }
      </TableBody>
    </Table>
  );
};

export default RecordTab;
