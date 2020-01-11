import React, { Component } from "react";
import { itemList } from "../store/ItemList";
import { connect } from "react-redux";
import AddRemoveButton from "./AddRemoveButton.js";
class ListComponent extends Component {
  componentDidMount() {
    const { LoadList, categoryId } = this.props;
    //console.log(this.props);
    LoadList(categoryId);
  }

  ListUI(item) {
    return (
      <div key={item.id} className="product-item">
        <img alt={item.name} src={item.poster} />
        <div className="product-detail">
          <div className="product-title">{item.name}</div>
          <div className="product-purchase">
            <span>₹{item.price}</span>
            <AddRemoveButton item={item} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { items } = this.props;
    return <div className="products">{items.map(this.ListUI.bind(this))}</div>;
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LoadList: id => {
      return dispatch(itemList(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
