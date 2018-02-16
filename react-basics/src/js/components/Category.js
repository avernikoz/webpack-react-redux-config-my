import React from 'react';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;
import {Link} from 'react-router-dom';


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


        let nested = this.props.parentCategory === null ? '' : ` nested level-${this.props.nestedLevel}`;

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

export default Category;