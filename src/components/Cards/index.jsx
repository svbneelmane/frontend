import React from 'react';
import './style.css'
import { Card, Tag, Col, Button } from 'antd';

export const RoundCard = (props) => {
  return (
    <div >
      <Col  span={8}>
        <Card className="card" title={props.title} extra={<Tag color={props.tagColor}>{props.status}</Tag>}>
          <Button onClick={ event => { props.setRoundId(props.id) }} className="submit-btn" size="large" block type="primary"> Start </Button>
        </Card>
      </Col>
  </div>
  );
}

export const CriteriaCard = (props) => {
  return (
    <div>
      <Col  span={8}>
        <Card className="card" title={props.title}>
          <Button  className="submit-btn" size="large" block type="primary"> Add Score </Button>
        </Card>
      </Col>
    </div>
  )
}