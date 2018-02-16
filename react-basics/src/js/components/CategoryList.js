import React from 'react';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;

import Category from './Category';


let CategoryList = React.createClass({
    render: function () {
        return (
            <div className="category-list">
                {this.props.categories.map((elem) => {
                    return (
                        <Category id={elem.id} key={elem.id} categoryName={elem.name} parentCategory={elem.parent}
                                  nestedLevel={elem.nestedLevel}
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

export default CategoryList;