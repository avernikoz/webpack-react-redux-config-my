import React from 'react';
import createReactClass from 'create-react-class';
import {Link} from 'react-router-dom';

React.createClass = createReactClass;


let CategorysBox = React.createClass({
    getInitialState: function () {
        return {
            categoryInputText: '',
        }
    },
    setCategoryText: function (event) {
        this.setState({categoryInputText: event.target.value})
    },
    addCategoryHandler: function () {
        let categoryText = this.state.categoryInputText;

        this.props.addCategory(categoryText);

        this.setState({categoryInputText: ''});   // to handler
    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.addCategoryHandler();
        }
    },
    render: function () {
        return (
            <div className="category-box">
                <div className="category-add-container">
                    <input className="category-add-input" type="text" placeholder="Enter category title"
                           value={this.state.categoryInputText} onChange={this.setCategoryText}
                           onKeyPress={this._handleKeyPress}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addCategoryHandler}/>
                </div>
                <CategoryList categories={this.props.categories}
                              setSelectedCurrentCategory={this.props.setSelectedCurrentCategory}
                              selectedCategoryId={this.props.selectedCategoryId}
                              showModal={this.props.showModal}
                              categoryIdLink={+this.props.match.params.categoryId}

                />
            </div>
        )
    }
});

let CategoryList = React.createClass({
    render: function () {
        return (
            <div className="category-list">
                {this.props.categories.map((elem) => {
                    return (
                        <Category id={elem.id} key={elem.id} categoryName={elem.name} parentCategory={elem.parent}
                                  setSelectedCurrentCategory={this.props.setSelectedCurrentCategory}
                                  selectedCategoryId={this.props.selectedCategoryId}
                                  showModal={this.props.showModal}
                                  categoryIdLink={this.props.categoryIdLink}

                        />
                    )
                })}
            </div>

        )
    }
});
// TODO: NEED to rewrite the LINK elemtns because they are somithing wrong with this implementation


let Category = React.createClass({
    onClickCurrentCategory: function () {
        this.props.setSelectedCurrentCategory(this.props.id, this.props.categoryName);
    },
    componentWillMount: function () {
        if (this.props.categoryIdLink === this.props.id)  {
            this.props.setSelectedCurrentCategory(this.props.id, this.props.categoryName);
        }
    },
    showAddCategoryModal: function () {
        this.props.showModal('addCategory');
    },
    showEditCategoryModal: function () {
        this.props.showModal('editCategory');
    },
    showDeleteCategoryModal: function () {
        this.props.showModal('deleteCategory');
    },
    render: function () {
        // It works without router
        // let categoryClassName = this.props.selectedCategoryId === this.props.id ? 'category selected-category' : 'category';

        let categoryClassName = this.props.categoryIdLink === this.props.id ? 'category selected-category' : 'category';


        let nested = this.props.parentCategory === null ? '' : ' nested';

        return (
            <div className={categoryClassName + nested} onClick={this.onClickCurrentCategory}>
                <Link to={`/categories/${this.props.id}`}>
                    <div className="category-name-container">
                        <div className="category-name">{this.props.categoryName}</div>
                        <i className="fas fa-edit fa-sm icon" onClick={this.showEditCategoryModal}/>
                    </div>
                    <div className="category-icons-container">
                        <i className="fas fa-trash-alt fa-sm icon" onClick={this.showDeleteCategoryModal}/>
                        <i className="fas fa-plus fa-sm icon" onClick={this.showAddCategoryModal}/>
                    </div>
                </Link>
            </div>
        )
    }
});

export {CategorysBox, CategoryList, Category}
