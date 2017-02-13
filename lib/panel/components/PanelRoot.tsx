import * as _ from 'lodash';
import * as React from "react";
import { connect } from "react-redux"
import * as ReactModal from "react-modal";
import * as classNames from 'classnames';

import {
  changeActiveIntrospection,
  changeSortByAlphabet,
  changeSkipRelay,
  showIntrospectionModal,
  toggleMenu
} from '../../actions/';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { cyan500 } from 'material-ui/styles/colors';

import IntrospectionModal from './IntrospectionModal';
import RootSelector from './RootSelector';
import TypeDoc from './TypeDoc';

interface PanelRootProps {
  isLoading: boolean;
  sortByAlphabet: boolean;
  skipRelay: boolean;
  dispatch: any;
  menuOpened: boolean;
}

function mapStateToProps(state) {
  return {
    isLoading: (state.currentSvgIndex === null),
    sortByAlphabet: state.displayOptions.sortByAlphabet,
    skipRelay: state.displayOptions.skipRelay,
    menuOpened: state.menuOpened
  };
}

class PanelRoot extends React.Component<PanelRootProps, void> {

  // TODO: temp method
  toggleDarkMode() {
    document.querySelector('body').classList.toggle('dark-theme');
  }

  render() {
    const {
      isLoading,
      sortByAlphabet,
      skipRelay,
      dispatch,
      menuOpened
    } = this.props;
    const $panel = this.refs['panel'];

    return (
      <div className="panel-wrap">
        <div className="title-area">
          <h2 style={{textAlign: 'center'}} onClick={() => this.toggleDarkMode()}>GraphQL Voyager</h2>
          <IntrospectionModal/>
          <div ref="panel" className="menu-buttons">
            <RaisedButton label="Load Introspection" primary={true} style={{flex: 1}}
              onTouchTap={() => dispatch(showIntrospectionModal())}/>
            <IconButton onTouchTap={() => dispatch(toggleMenu())}
              style={{height: '36px', padding: 0, width: '36px'}}>
              <SettingsIcon color={cyan500}/>
            </IconButton>
          </div>
          <Popover
            open={menuOpened}
            anchorEl={$panel}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={() => dispatch(toggleMenu())}
          >
            <div className="menu-content">
              <h3 style={{margin: 0}}> Root Node </h3>
              <RootSelector/>
              <h3> Options </h3>
              <Checkbox label="Sort by Alphabet" checked={sortByAlphabet}
                onCheck={(e, val) => dispatch(changeSortByAlphabet(val))} />
              <Checkbox label="Skip Relay" checked={skipRelay}
                onCheck={(e, val) => dispatch(changeSkipRelay(val))} />
            </div>
          </Popover>
        </div>
        <TypeDoc/>
        <div className={classNames({
          'loading-box': true,
          'visible': isLoading
        })}>
          <h1>Loading</h1>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PanelRoot);
