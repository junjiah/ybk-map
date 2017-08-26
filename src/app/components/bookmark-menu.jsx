import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/lib/checkbox';
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

      filters: {
        good: true,
        bad: true,
        willTry: true
      }
    };
  }

  getStyles() {
    return {
      paper: {
        position: 'absolute',
        top: '8px',
        left: '8px',
        margin: 0,
        zIndex: 1
      },
      container: {
        display: 'flex',
        flexDirection: 'column'
      },
      popover: {
        marginLeft: '8px',
        display: 'flex'
      },
      searchBox: {
        paddingLeft: '12px',
        fontSize: 'large',
        width: '264px'
      },
      checkboxContainer: {
        paddingLeft: '6px',
        fontSize: '20px'
      },
      checkbox: {
        float: 'left',
        width: '1%',
        margin: '6px !important',
        marginRight: '20px !important',
        paddingTop: '5px'
      }
    };
  }

  _onClickSearch() {
    const {isSearching} = this.state;
    this.setState({isSearching: !isSearching}, () => {
      if (isSearching) {
        // Clicked to close the search box. Reset search filter.
        this.props.onUpdateSearchBox('');
      } else {
        // Focus on input.
        document.getElementById('search-box').focus();
      }
    });
  }

  _onSearchContentChanged(e, searchText) {
    this.props.onUpdateSearchBox(searchText);
  }

  _onClickFilterBox() {
    const {isFiltering} = this.state;
    const newState = {isFiltering: !isFiltering};
    let callback = () => {};
    if (isFiltering) {
      // Clicked to close the filter box. Reset filters.
      const filters = {good: true, bad: true, willTry: true};
      newState.filters = filters;
      callback = () => this.props.onUpdateFilterCheckbox(filters);
    }

    this.setState(newState, callback);
  }

  _onCheckFilter(name) {
    return (e, checked) => {
      const filters = Object.assign(
        {}, this.state.filters, {[name]: checked});
      this.setState({filters}, () => {
        this.props.onUpdateFilterCheckbox(filters);
      });
    };
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
          <IconButton
            title="Filter" data-toggle="tooltip" id="filter-button"
            onTouchTap={this._onClickFilterBox.bind(this)} >>
            <FilterIcon />
          </IconButton>
          <Popover
            open={this.state.isFiltering}
            useLayerForClickAway={false}
            anchorEl={document.getElementById('filter-button')}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            style={styles.popover} >
            <div style={styles.checkboxContainer}>
              <Checkbox
                  label={<span className="glyphicon glyphicon-thumbs-up" aria-hidden="true" />}
                  style={styles.checkbox} onCheck={this._onCheckFilter('good')}
                  defaultChecked />
              <Checkbox
                  label={<span className="glyphicon glyphicon-thumbs-down" aria-hidden="true" />}
                  style={styles.checkbox} onCheck={this._onCheckFilter('bad')}
                  defaultChecked />
              <Checkbox
                  label={<span className="glyphicon glyphicon-eye-open" aria-hidden="true" />}
                  style={styles.checkbox} onCheck={this._onCheckFilter('willTry')}
                  defaultChecked />
            </div>
          </Popover>
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
  onUpdateFilterCheckbox: PropTypes.func.isRequired
};

export default BookmarkMenu;
