import React from "react";
import { Input, Row, Col, Select, Icon } from "antd";
import navigation from "../../static/navigation.svg";
import websiteLogo from "../../static/websiteLogo.png";
import searchIcon from "../../static/search.svg";
import { render } from "@testing-library/react";
const { Search } = Input;
const { Option } = Select;

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      provinceChoice: "",
      inputSearch: "",
    };
  }
  onProvinceChange = (value) => {
    console.log("e province", value.props.children);
    this.setState({ provinceChoice: value.props.children });
    this.props.provinceQuery(value.props.children)
  };
  handleSearch = (value) => {
    console.log("e search", value);
    this.setState({ inputSearch: value });
    this.props.searchQuery(value)
  };
  render() {
    const { provincesData } = this.props;
    return (
      <div
        className="d-flex items-center"
        style={{
          "max-width": "1280px",
          margin: "0 auto",
          backgroundColor: "white",
          "padding-top": "10px",
          padding: "10px",
        }}
      >
        <Col>
          <div style={{ padding: "10 auto" }}>
            <img
              src={websiteLogo}
              style={{ width: "151px", height: "41px" }}
              alt="website logo"
            />
          </div>
        </Col>
        <div className="d-flex .items-center">
          <div>
            {/* select province */}
            <Select
              style={{ borderRadius: "0.5rem", border: "0px", height: "100%" }}
              defaultValue={
                <div className="d-flex items-center font-plex-r">
                  <img src={navigation} className="mr-1" />
                  <span>พื้นที่ใกล้ฉัน</span>
                </div>
              }
              onChange={this.onProvinceChange}
            >
              {provincesData.map((item, index) => {
                return (
                  <Option
                    key={index}
                    value={<p className="font-plex-r text-left">{item}</p>}
                    className="font-plex-r text-left"
                  >
                    {item}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div>
            {/* search input */}
            <Search
              className="font-plex-r"
              placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
              allowClear
              onSearch={this.handleSearch}
              suffix={
                <div className="search-suffix">
                  <img src={searchIcon} alt="search icon"></img>
                </div>
              }
              style={{ width: "350%" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchHeader;
