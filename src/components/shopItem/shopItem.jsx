import React from "react";
import { Row, Col, Rate, Divider, Card, Tag } from "antd";
import "./shopItem.css";
import parkingCar from "../../static/parkingCar.png"
import reservation from "../../static/document.png"
import allowedPet from "../../static/allowedPet.png"

const axios = require("axios");

let data = {};
axios.get("https://panjs.com/ywc18.json").then((res) => {
  console.log("res.data", res.data);
  data = res.data;
});
const ShopItem = ({ shopData }) => {
  return shopData.map((item, index) => {
    console.log("item", item);
    return (
      <Card className="store-card mb-2" key={index}>
        <Row
>
          <Col  sm={16} md={12} lg={4} xl={4}>
            <div className="container">
              <img
                src={item.coverImageId}
                alt="merchandise pic"
              ></img>
            </div>
          </Col>
          <Col  sm={8} md={12} lg={20} xl={20} >
            {/* {data.merchants[0].shopNameTH} */}
            <div className="text-container">
              <div className="font-plex-b fs-26 d-flex align-items-center">
                <span style={{ marginRight: "1rem" }}>{item.shopNameTH}</span>
                {item.isOpen === "Y" ? (
                  <Tag className="font-plex-sb" color="#1bc300">
                    เปิดอยู่
                  </Tag>
                ) : (
                  <Tag className="font-plex-sb" color="#9e9e9e">
                    ปิดแล้ว
                  </Tag>
                )}
              </div>
              {/* ซีกบน */}
              <div className="font-plex-m c-gray fs-14">
                <span>{item.subcategoryName}</span>
                <Divider type="vertical" className="vertical-divider c-gray" />
                <Rate
                  character="฿"
                  count={4}
                  value={item.priceLevel}
                  className="c-black"
                  disabled
                ></Rate>
                <Divider type="vertical" className="vertical-divider c-gray" />
                <span>{item.addressDistrictName} {item.addressProvinceName}</span>
              </div>
            </div>
            <Divider className="divider" />
            <div className="text-container c-gray">
              <div>มีของกินเล่นหลายอย่าง</div>
              <div>
                <span className="c-black">เมนูแนะนำ:</span> ข้าวเม่าทอด,
                น้ำเต้าหู้,ลูกชิ้นย่าง
              </div>
            </div>
            <div className="facility-icon-container">
              {item.facilities.map(item => {
                if(item ==="ที่จอดรถ") {
                  return <img className="facility-icon" src={parkingCar}></img>
                }
                else if(item ==="รับจองล่วงหน้า") {
                  return <img className="facility-icon" src={reservation}></img>
                }
                else if(item ==="สามารถนำสัตว์เลี้ยงเข้าได้") {
                  return <img  className="facility-icon" src={allowedPet}></img>
                }
              })}
            </div>
          </Col>
        </Row>
      </Card>
    );
  });
};

export default ShopItem;
