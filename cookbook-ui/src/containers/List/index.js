import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { getRecipeList, setPageIndex, fetchRecipesIfNeeded } from '../../actions';
import List from '../../components/List';
import ReactPaginate from 'react-paginate';

class ListContainer extends Component {
    componentWillMount() {
        this.props.getRecipeList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.list !== prevProps.list) {
            return dispatch => {
                dispatch(fetchRecipesIfNeeded())
            }
        }
    }

    setPageIndex(pageIndex) {
        this.props.setPageIndex(pageIndex);
        this.props.getRecipeList();
    }

    render() {

        let errorMsg = null;
        if (this.props.errorMessage) {
            errorMsg = <div className="message--error">{this.props.errorMessage}</div>;
        };

        return (
            <div>
              {errorMsg}
              <List list={this.props.list} />
              <ReactPaginate previousLabel={"previous"}
                   nextLabel={"next"}
                   breakLabel={<a href="">...</a>}
                   breakClassName={"break-me"}
                   pageCount={this.props.pagination.pageCount}
                   marginPagesDisplayed={2}
                   pageRangeDisplayed={5}
                   onPageChange={(pageIndex) => this.setPageIndex(pageIndex)}
                   containerClassName={"pagination"}
                   subContainerClassName={"pages pagination"}
                   activeClassName={"active"}
              />
            </div>
        );
  }
}


const mapDispatchToProps = dispatch => {
    return {
        getRecipeList: () => dispatch(getRecipeList()),
        setPageIndex: index => {dispatch(setPageIndex(index))}
    };
};


const mapStateToProps = (state) => ({
  list: state.recipe.list,
  pagination: state.recipe.pagination
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
