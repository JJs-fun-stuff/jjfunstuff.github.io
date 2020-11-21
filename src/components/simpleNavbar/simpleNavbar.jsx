import React from "react";
import { Input, Row, Col, Select } from "antd";
const SimpleNavbar = () => {
  return (
    <React.Fragment>
      <Row style={{backgroundColor:"#27397c"}}>
      <Col offset={1}>
      <div style={{"padding-top":"1rem","padding-bottom":"1rem"}}>
        <span className="font-plex-r fs-16" style={{color:"white"}}>
        หน้าแรก/ ค้นหา
        </span>
      </div>
      </Col>
      </Row>
    </React.Fragment>
  );
};

export default SimpleNavbar;
