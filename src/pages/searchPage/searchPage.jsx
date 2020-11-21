import React from "react";
import { Row, Col } from "antd";
import SearchHeader from "../../components/searchHeader/searchHeader";
import SimpleNavbar from "../../components/simpleNavbar/simpleNavbar";
import SelectionCard from "../../components/selectionCard/selectionCard";
import ShopItem from "../../components/shopItem/shopItem";
import background from "../../static/background.jpg";
import "./searchPage.css";
const axios = require("axios");

class searchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      provinces: [],
      categories: [],
      priceRanges: [],
      merchants: [],
      dataIsReturned: false,
      inputQuery: "",
      provinceQuery: "",
      priceQuery: "",
      categoryQuery:"",
    };
  }
  componentDidMount() {
    axios.get("https://panjs.com/ywc18.json").then((res) => {
      console.log("responddd", res);
      this.setState(
        {
          provinces: res.data.provinces,
          categories: res.data.categories,
          priceRanges: res.data.priceRange,
          merchants: res.data.merchants,
          dataIsReturned: true,
        }
        // () => console.log("dataaaaaaa", this.state.provinces, this.state.categories, this.state.priceRanges, this.state.merchants)
      );
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prevState", prevState);
    console.log("prevprops", prevProps);
  }
  handleSearchQuery(value) {
    this.setState({ inputQuery: value }, () => {
      axios.get("https://panjs.com/ywc18.json").then((res) => {
        // when there is no query
        if (this.state.inputQuery === "") {
          this.setState({ merchants: res.data.merchants });
        } else {
          let tempData = res.data.merchants;
          // when there is input query
          tempData = tempData.filter((item) => {
            if (
              item.shopNameTH
                .toLowerCase()
                .includes(this.state.inputQuery.toLowerCase()) &&
              this.state.inputQuery !== ""
            ) {
              return true;
            }
          });
          // console.log("tempData", tempData);
          this.setState({ merchants: tempData });
        }
      });
    });
  }
  handleProvinceQuery(value) {
    this.setState({ provincesQuery: value }, () => {
      axios.get("https://panjs.com/ywc18.json").then((res) => {
        let tempData = res.data.merchants;
        // when there is input query
        tempData = tempData.filter((item) => {
          if (item.addressProvinceName.includes(this.state.provincesQuery)) {
            return true;
          }
        });
        // console.log("tempData", tempData);
        this.setState({ merchants: tempData });
      });
    });
  }
  handlePriceQuery(value) {
    this.setState({ priceQuery: value }, () => {
      axios.get("https://panjs.com/ywc18.json").then((res) => {
        let tempData = res.data.merchants;
        // when there is input query
        console.log('value price', value)
        if(value === 0) {
          this.setState({ merchants: tempData});
        } else {
          tempData = tempData.filter((item) => {
            if (item.priceLevel === (this.state.priceQuery)) {
              return true;
            }
          });
          // console.log("tempData", tempData);
          this.setState({ merchants: tempData });
        }
      });
    });
  }
  handleCategoryQuery(value) {
    this.setState({ categoryQuery: value }, () => {
      axios.get("https://panjs.com/ywc18.json").then((res) => {
        let tempData = res.data.merchants;
        // when there is input query
        console.log('value price', value)
        if(value === 0) {
          this.setState({ merchants: tempData});
        } else {
          tempData = tempData.filter((item) => {
            if (item.priceLevel === (this.state.priceQuery)) {
              return true;
            }
          });
          // console.log("tempData", tempData);
          this.setState({ merchants: tempData });
        }
      });
    });
  }
  render() {
    const {
      provinces,
      categories,
      priceRanges,
      merchants,
      dataIsReturned,
    } = this.state;
    return (
      <div
        style={{
          backgroundSize: "cover",
          height: "100%",
          backgroundImage: `url(${background})`,
        }}
      >
        <SearchHeader
          provincesData={dataIsReturned ? provinces : []}
          searchQuery={this.handleSearchQuery.bind(this)}
          provinceQuery={this.handleProvinceQuery.bind(this)}
        />
        <SimpleNavbar />
        <Row className="searchPage">
          <Col>
            <p className="font-plex-b fs-18 mb-2 mt-1 ml-1">
              ผลการค้นหา ร้านอาหารและเครื่องดื่มทั้งหมด
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={0} sm={0} md={0} lg={6} xl={6}>
            <SelectionCard
              categoriesData={dataIsReturned ? categories : []}
              priceRangeData={dataIsReturned ? priceRanges : []}
              provincesData={dataIsReturned ? provinces : []}
              provinceQuery={this.handleProvinceQuery.bind(this)}
              priceQuery={this.handlePriceQuery.bind(this)}
              categoryQuery={this.handleCategoryQuery.bind(this)}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <ShopItem shopData={dataIsReturned ? merchants : []} />
          </Col>
        </Row>
      </div>
    );
  }
}
{
  /* {categoriesData.map((item, index)=> {
          return(
        <Radio style={radioStyle} value={index}>
          {item.name}
        </Radio>
          );
        })} */
}

export default searchPage;
