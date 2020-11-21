import React from "react";
import { Row, Col, Card, Radio, Input, Select } from "antd";
import "./selectionCard.css";
import navigation from "../../static/navigation.svg";
const axios = require("axios");
const { Option } = Select;
const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};
class SelectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopType: "ร้านอาหารและเครื่องดื่ม",
      categoryType: 0,
      categoryTitle: "ประเภทร้านอาหารและเครื่องดื่ม",
      categoryChoice: [],
      provinceChoice: '',
      priceChoice:'',
    };
  }
  onShopChange = (e) => {
    console.log("e shop", e.target.value);
    const choice = this.props.categoriesData.filter(
      (i) => i.name === e.target.value
    );
    console.log("choice", choice[0]);
    this.setState({
      shopType: e.target.value,
      categoryTitle: `ประเภท${e.target.value}`,
      categoryChoice: choice[0].subcategories,
    });
  };
  onCategoryChange = (e) => {
    console.log("e cat", e.target.value);
    this.setState({ categoryType: e.target.value });
    this.props.categoryQuery(e.target.value)
  };
  onProvinceChange = (value) => {
    console.log("e province", value);
    this.setState({ provinceChoice: value });
    this.props.provinceQuery(value.props.children)

  };
  onPriceChange = (value) => {
    if (value === undefined){
      console.log("e price");
    this.props.priceQuery(0)
    } else {
    // this.setState({ priceChoice: value });
      this.props.priceQuery(parseInt(value.key) + 1)
    }
  };
  render() {
    const { categoriesData, priceRangeData, provincesData } = this.props;
    const {
      shopType,
      categoryType,
      categoryTitle,
      categoryChoice,
    } = this.state;
    return (
      <Card className="card-style mr-4">
        <Row>
          <p className="text-left font-plex-b">ประเภทร้านค้า</p>
          <Radio.Group
            onChange={this.onShopChange}
            value={shopType}
            className="radio-group-style font-plex-r"
          >
            {categoriesData.map((item, index) => {
              return (
                <Radio style={radioStyle} value={item.name} key={index}>
                  {item.name}
                </Radio>
              );
            })}
          </Radio.Group>
        </Row>
        {/* จังหวัด/ใกล้ฉัน */}
        <div className="mt-2">
          <p className="text-left font-plex-b">จังหวัด/ใกล้ฉัน</p>
          <div className="d-flex items-center h-full">
            <Select
              defaultValue={
                <div
                  className="d-flex items-center h-full font-plex-r"
                >
                  <img src={navigation} className="mr-1" />
                  <span>พื้นที่ใกล้ฉัน</span>
                </div>
              }
              onChange={this.onProvinceChange}
                  style={{ width: "100%" }}
              className="select-style"
            >
              {provincesData.map((item, index) => {
                return (
                  <Option key={index} value={<p className="font-plex-r text-left">{item}</p>} className="font-plex-r" >
                    {item}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        {/* ราคา */}
        <div>
          <p className="text-left font-plex-b mt-4">ราคา</p>
          <div className="d-flex items-center" 
          >
            <Select
            style={{ width: "100%" }}
              placeholder={<p style={{"text-align":"left"}}>กรุณาเลือก</p>}
              className="select-style font-plex-r"
              onChange={this.onPriceChange}
              allowClear
            >
              {priceRangeData.map((item, index) => {
                return (
                  <Option key={index} value={<p className="font-plex-r text-left" key={index}>{item}</p>}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        {/* ประเภทอาหารและเครื่องดื่ม */}
        <div>
          <p className="text-left font-plex-b mt-1">{categoryTitle}</p>
          <Radio.Group
            onChange={this.onCategoryChange}
            value={categoryType}
            className="radio-group-style font-plex-r"
          >
            {categoryChoice.map((item, index) => {
              return (
                <Radio style={radioStyle} value={index} key={index}>
                  {item}
                </Radio>
              );
            })}
          </Radio.Group>
        </div>
      </Card>
    );
  }
}

export default SelectionCard;
