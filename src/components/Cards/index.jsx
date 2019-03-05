import React from 'react';
import './style.css'
import { Card, Tag, Col, Button } from 'antd';

export const RoundCard = (props) => {
  return (
    <div >
      <Col  span={8}>
        <Card className="card" title={props.title} extra={<Tag color={props.tagColor}>{props.status}</Tag>}>
          <Button onClick={ event => { props.setRoundId(props.id) }} className="start-btn" size="large" block type="primary"> Start </Button>
        </Card>
      </Col>
  </div>
  );
}