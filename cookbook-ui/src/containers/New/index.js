import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createRecipe} from '../../actions/index';
import NewRecipe from '../../components/New/index';

class NewRecipeContainer extends Component {
    goBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    createRecipe(data) {
        if (!data) { return false; }
        return this.props.createRecipe(data).then(
            () => this.props.history.push('/recipes')
        )
    }

    render() {
        return (
            <NewRecipe createRecipe={(data) => this.createRecipe(data)}
                      goBack={(e) => this.goBack(e)} />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createRecipe: data => dispatch(createRecipe(data))
    };
};

export default withRouter(connect(null, mapDispatchToProps)(NewRecipeContainer));
