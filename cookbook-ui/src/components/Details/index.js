import React, { Component } from 'react';
import _ from 'lodash';
import './index.css';
import format from 'date-fns/format';
import { Button, Grid, Cell } from 'react-mdc-web/lib';

class RecipeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            oldDescription: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.recipe, nextProps.recipe)) {
            const recipe = nextProps.recipe;
            const oldFullVersion = Array.isArray(recipe.history) ?
                recipe.history["0"].changes.filter(changes => changes.path[0] === 'description') : [];
            const oldFullDescription = oldFullVersion.map(el => el.after);
            const oldDescriptionString = oldFullDescription.join();
            this.setState({
                id: recipe._id,
                name: recipe.name,
                description: recipe.description,
                updatedAt: recipe.updatedAt,
                oldDescription: oldDescriptionString
            });
        } else {
            const recipe = this.props.recipe;
            const oldFullVersion = Array.isArray(recipe.history) ?
                recipe.history["0"].changes.filter(changes => changes.path[0] === 'description') : [];
            const oldFullDescription = oldFullVersion.map(el => el.after);
            const oldDescriptionString = oldFullDescription.join();
            this.setState({
                id: recipe._id,
                name: recipe.name,
                description: recipe.description,
                updatedAt: recipe.updatedAt,
                oldDescription: oldDescriptionString
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let name,
            description;

        this.props.updateRecipe({
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        })
    };

    render() {
        return(
            <div className="details">
                <h2 className="mdc-typography--title page-title">Recipe
                    (last updated {format(this.state.updatedAt, 'Do MMMM, YYYY HH:mm')})
                </h2>
                <div className="details__actions">
                    <a className="details__button--back" onClick={this.props.goBack}>Go Back</a>
                    <a className="details__button--remove"
                       onClick={() => this.props.removeRecipe(this.props.recipe._id)}>
                        Delete recipe
                    </a>
                </div>
                <div className="details-inner">
                    <form onSubmit={this.onSubmit}>
                        <Grid>
                            <Cell col={6}>
                                <h4>Name of your recipe:</h4>
                            </Cell>
                            <Cell col={6}>
                                <div className="mdc-text-field mdc-text-field--fullwidth">
                                    <input type="text"
                                           required
                                           id="name"
                                           className="mdc-text-field__input"
                                           name="name"
                                           placeholder="Name"
                                           value={this.state.name}
                                           onChange={({target : {value : name}}) => {
                                               this.setState({ name })
                                           }}
                                    />
                                    <div className="mdc-text-field__bottom-line"></div>
                                </div>
                            </Cell>

                            <Cell col={6}>
                                <h4>Description:</h4>
                            </Cell>
                            <Cell col={6}>
                                <div className="mdc-text-field mdc-text-field--textarea
                                 mdc-text-field--textarea--upgraded">
                                    <textarea id="description"
                                              required
                                              className="mdc-text-field__input"
                                              name="description"
                                              placeholder="Description"
                                              value={this.state.description}
                                              onChange={({target : {value : description}}) => {
                                                  this.setState({ description })
                                              }}
                                              rows="8"
                                              cols="40">
                                    </textarea>
                                    <div className="mdc-text-field__bottom-line"></div>
                                </div>
                            </Cell>

                            <Cell col={6}>
                                <h4>Originally your recipe was as follows:</h4>
                            </Cell>
                            <Cell col={6} className="details__previousDescription">
                                {
                                    this.state.oldDescription !== this.state.description ?
                                        this.state.oldDescription :
                                        'No changes were made to the recipe description since recipe was created.'
                                }
                            </Cell>
                        </Grid>
                        <div className="details-footer">
                            <Button className="details-button" type="submit" raised>Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RecipeDetails;

