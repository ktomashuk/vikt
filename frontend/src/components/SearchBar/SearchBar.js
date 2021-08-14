import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import { searchStart, searchStop } from '../../store/actions/search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]:{
      width: 320,
      },
      [theme.breakpoints.up('lg')]:{
      width: 420,
      },
      [theme.breakpoints.up('xl')]:{
      width: 500,
      },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const { type, estimatesSystem, filter, searchStart, searchStop } = props;
  // Text in a search bar
  const [searchValue, setSearchValue] = useState('');
  // Start searching when text in a search bar changes
  useEffect(() => {
        const search = setTimeout(() => {
            // Saving search result to redux
            if (searchValue === '') {
                searchStop();
            } else {
                searchStart(searchValue);
            }
            // Checking what to search
            switch(type){
                case 'estimates':
                    return filter(searchValue, estimatesSystem);
                case 'contractors':
                    return filter(searchValue);
                default:
                    return;
            }
          }, 500 );
      return () => {
        clearTimeout(search);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Поиск"
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={(e) => {setSearchValue(e.target.value)}}
      />
      <IconButton className={classes.iconButton} aria-label="clear" onClick={() => {setSearchValue('')}}>
        <CancelIcon />
      </IconButton>
    </Paper>
  );
};

const mapStateToProps = state => {
    return {
        estimatesObject: state.est.estimatesObject,
        estimatesSystem: state.est.estimatesSystem,
        searchResult: state.srch.searchResult,
    };
};

export default connect(mapStateToProps, { searchStart, searchStop })(SearchBar);