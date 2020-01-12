import React, { Component } from "react";
import "../style/itemList.scss";
import dummyData from "../data/data.json";
class ItemList extends Component {
  constructor(props) {
    super(props);

    this.itemUi = this.itemUi.bind(this);
  }

  itemUi(item) {
    return (
      <li>
        <div key={item._id} className="item">
          <h2>{item._name}</h2>
          <p>{item._id}</p>
          <div key={item._id + 1} className="product">
            <img />
          </div>
        </div>
      </li>
    );
  }

  render() {
    const date = new Date();
    const hour = date.getHours();
    const Breakfast = dummyData.Breakfast;
    const Lunch = dummyData.Lunch;
    const Dinner = dummyData.Dinner;
    const Snack = dummyData.Snack;
    const Drink = dummyData.Drink;
    const Sweet = dummyData.Sweet;
    console.log(Breakfast);

    if (hour >= 8 && hour < 13) {
      return (
        <div>
          <div className="container">
            <div className="title">
              <div className="heading">Breakfast</div>
            </div>
            <ul>
              {Breakfast.map(this.itemUi)}
              <li>
                <div key="11" className="item">
                  <h2>Show More</h2>
                  <p>Inf</p>
                  <div key="12" className="product">
                    <img />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    } else if (hour >= 13 && hour < 16) {
      return (
        <div>
          <div className="container">
            <div className="title">
              <div className="heading">Lunch</div>
            </div>
            <ul>{Lunch.map(this.itemUi)}</ul>
          </div>
        </div>
      );
    } else if (hour >= 16 && hour < 19) {
      return (
        <div>
          <div className="container">
            <div className="title">
              <div className="heading">Snack</div>
            </div>
            <ul>{Dinner.map(this.itemUi)}</ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container">
            <div className="title">
              <div className="heading">Snack</div>
            </div>
            <ul>{Dinner.map(this.itemUi)}</ul>
          </div>
        </div>
      );
    }
  }
}

export default ItemList;
