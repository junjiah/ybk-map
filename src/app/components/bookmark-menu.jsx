import React, { PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import Popover from 'material-ui/lib/popover/popover';
// Icons.
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import FilterIcon from 'material-ui/lib/svg-icons/content/filter-list';
import SortIcon from 'material-ui/lib/svg-icons/content/sort';
import InfoIcon from 'material-ui/lib/svg-icons/action/info';

class BookmarkMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      isFiltering: false,
      isSorting: false,
      isShowingAbout: false,
    }
  }

  getStyles() {
    return {
      paper: {
        position: 'absolute',
        top: '8px',
        left: '8px',
        margin: 0,
        zIndex: 1,
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
      },
      popover: {
        marginLeft:'8px',
      },
      searchBox: {
        paddingLeft: '12px',
        fontSize: 'large',
      }
    };
  }

  _onClickSearch() {
    const { isSearching } = this.state;
    this.setState({isSearching: !isSearching}, () => {
      if (isSearching) {
        // Clicked to close the search box. Reset search filter.
        this.props.onUpdateSearchBox('');
      }else {
        // Focus on input.
        document.getElementById('search-box').focus();
      }
    });
  }

  _onSearchContentChanged(e, searchText) {
    this.props.onUpdateSearchBox(searchText);
  }

  render() {
    const styles = this.getStyles();

    return (
      <Paper style={styles.paper}>
        <div style={styles.container}>
          <IconButton
            title="Search" data-toggle="tooltip" id="search-button"
            onTouchTap={this._onClickSearch.bind(this)} >
            <SearchIcon />
          </IconButton>
          <Popover
            open={this.state.isSearching}
            useLayerForClickAway={false}
            anchorEl={document.getElementById('search-button')}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            style={styles.popover} >
            <TextField
              id="search-box"
              underlineShow={false}
              hintText="Search bookmark"
              style={styles.searchBox}
              onChange={this._onSearchContentChanged.bind(this)}/>
          </Popover>
          <IconButton title="Filter" data-toggle="tooltip">
            <FilterIcon />
          </IconButton>
          <IconButton title="Sort" data-toggle="tooltip">
            <SortIcon />
          </IconButton>
          <IconButton title="About" data-toggle="tooltip">
            <InfoIcon />
          </IconButton>
        </div>
      </Paper>
    );
  }
}

BookmarkMenu.propTypes = {
  onUpdateSearchBox: PropTypes.func.isRequired,
};

export default BookmarkMenu;
