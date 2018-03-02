import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Cell, Toolbar, ToolbarRow, ToolbarSection } from 'react-mdc-web/lib';
import logo from './img/logo.png';
import Nav from './components/Nav';
import Routes from './Routes';
import './App.css';

class App extends Component {

  componentWillMount() {
    this.props.history.push('/recipes');
  }

  render() {
    return (
      <div className="App">
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection align="start">
              <Link to="/recipes">
                <img className="logo" src={logo} alt="Recipes collection"/>
              </Link>
            </ToolbarSection>
            <ToolbarSection align="end">
              <Nav />
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>

        <main>
          <Grid className="centered-grid">
            <Cell col={12}>
              <Routes />
            </Cell>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
