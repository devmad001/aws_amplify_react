// reference: https://gist.github.com/MichalKalita/95c67cd40362c72a868c60085a8d3a72#file-searchfilter-tsx
/* eslint-disable */

/*
This is almost copy of ra-ui-materialui/src/list/Filter.tsx
Filters in array of props.searchSources are changed to ILIKE %value%
*/

import * as React from 'react';
import { FC, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { sanitizeListRestProps, useListContext } from 'ra-core';
import PropTypes from 'prop-types';

import { ClassesOverride, FilterButton, FilterForm } from 'ra-ui-materialui';
import _ from 'lodash';

const useStyles = makeStyles(
  {
    button: {},
    form: {},
  },
  { name: 'RaFilter' },
);

export interface FilterProps {
  context?: string;
  variant?: string;
  classes: ClassesOverride<typeof useStyles>;
  children: ReactNode;

  searchSources: string[];
}

const SearchFilter: FC<FilterProps> = props => {
  const classes = useStyles( props );
  const {
    resource,
    showFilter,
    hideFilter,
    setFilters: _setFilters,
    displayedFilters,
    filterValues: _filterValues,
  } = useListContext( props );

  const handleSetFilters = (
    filters: Record<string, any>,
    displayedFilters: any,
  ) => {
    Object.keys( filters ).forEach( filterInput => {
      if ( props.searchSources.includes( filterInput ) ) {
        filters[ filterInput ] = { _ilike: `%${ filters[ filterInput ] }%` };
      }
    } );
    _setFilters( filters, displayedFilters );
  };

  const filterValues = React.useMemo( () => {
    const result = _.cloneDeep( _filterValues );

    Object.keys( result ).forEach( filterInput => {
      if ( props.searchSources.includes( filterInput ) ) {
        result[ filterInput ] = result[ filterInput ]?._ilike
          ?.replace( /^%/, '' )
          ?.replace( /%$/, '' );
      }
    } );
    return result;
  }, [ _filterValues, props.searchSources ] );

  const renderButton = () => {
    const {
      classes: classesOverride,
      context,
      children,
      variant,
      ...rest
    } = props;

    return (
      <FilterButton
        className={ classes.button }
        resource={ resource }
        filters={ React.Children.toArray( children ) }
        showFilter={ showFilter }
        displayedFilters={ displayedFilters }
        filterValues={ filterValues }
        { ...sanitizeListRestProps( rest ) }
      />
    );
  };

  const renderForm = () => {
    const {
      classes: classesOverride, context, children, ...rest
    } = props;

    return (
      <FilterForm
        className={ classes.form }
        resource={ resource }
        filters={ React.Children.toArray( children ) }
        hideFilter={ hideFilter }
        displayedFilters={ displayedFilters }
        initialValues={ filterValues }
        setFilters={ handleSetFilters }
        { ...sanitizeListRestProps( rest ) }
      />
    );
  };

  return props.context === 'button' ? renderButton() : renderForm();
};

SearchFilter.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  context: PropTypes.oneOf( [ 'form', 'button' ] ),
};

export default SearchFilter;
