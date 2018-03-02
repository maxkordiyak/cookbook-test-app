import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRecipeDetails, removeRecipe, updateRecipe } from '../../actions';
import Details from '../../components/Details';

class DetailsContainer extends Component {
  componentWillMount() {
    this.props.getRecipeDetails(this.props.match.params.id);
  }

  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  removeRecipe(id) {
    if (!id) { return false; }
      return this.props.removeRecipe(id).then(
          () => this.props.history.push('/recipes')
      )
  }

  updateRecipe(data) {
    if (!data) { return false; }
       return this.props.updateRecipe(data).then(
           () => this.props.history.push('/recipes')
       )
    }

    render() {
      return (
        <Details recipe={this.props.details}
                 removeRecipe={(id) => this.removeRecipe(id)}
                 goBack={(e) => this.goBack(e)}
                 updateRecipe={(data) => this.updateRecipe(data)}
        />
      );
  }
}
const mapDispatchToProps = dispatch => {
    return {
        getRecipeDetails: id => dispatch(getRecipeDetails(id)),
        removeRecipe: id => dispatch(removeRecipe(id)),
        updateRecipe: data => dispatch(updateRecipe(data))
    };
};


const mapStateToProps = (state) => ({
  details: state.recipe.details
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsContainer));
