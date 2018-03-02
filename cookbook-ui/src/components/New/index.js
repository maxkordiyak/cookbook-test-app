import React, { Component } from 'react';
import { Button, Grid, Cell } from 'react-mdc-web/lib';

class NewRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        let name,
            description;

        this.props.createRecipe({
            name: this.state.name,
            description: this.state.description,
        });
    };

    render() {
        return(
            <div className="details">
                <h2 className="mdc-typography--title page-title">Add new recipe</h2>
                <div className="details__actions">
                    <a className="details__button--back" onClick={this.props.goBack}>Go Back</a>
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
                                <div className="mdc-text-field mdc-text-field--textarea mdc-text-field--textarea--upgraded">
                                    <textarea id="description"
                                              required
                                              id="description"
                                              className="mdc-text-field__input"
                                              name="description"
                                              placeholder="Description"
                                              value={this.state.description}
                                              onChange={({target : {value : description}}) => {
                                                  this.setState({ description })
                                              }}
                                              rows="8"
                                              cols="40"></textarea>
                                    <div className="mdc-text-field__bottom-line"></div>
                                </div>
                            </Cell>


                        </Grid>
                        <div className="details-footer">
                            <Button className="details-button" type="submit" raised>Create</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewRecipe;
