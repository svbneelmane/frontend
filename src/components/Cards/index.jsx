import React from 'react';
import './style.css'
import { Card, Tag, Col, Button } from 'antd';

export const RoundCard = (props) => {
  return (
    <div >
      <Col  span={8}>
        <Card className="card" title={props.title} extra={(props.status == 1) ? <Tag color="#2db7f5">Scheduled</Tag> : (props.status == 2) ? <Tag color="#87d068">In process</Tag> : <Tag color="#f50">Finished</Tag>}>
          <Button onClick={ event => { props.setRoundId(props.id) }} className="submit-btn" size="large" block type="primary"> Start </Button>
        </Card>
      </Col>
  </div>
  );
}

export const CriteriaCard = (props) => {
  return (
    <div>
      <Col  span={12}>
        <Card className="card" title={props.title}>
          <Button  className="submit-btn" size="large" block type="primary"> Add Score </Button>
        </Card>
      </Col>
    </div>
  )
}