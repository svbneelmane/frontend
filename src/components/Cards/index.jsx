import React from 'react';
import './style.css'
import { Card, Tag, Col, Button } from 'antd';
import { navigate } from 'gatsby';

export const RoundCard = (props) => {
  return (
    <div >
      <Col  span={8}>
        <Card className="card" title={props.title} extra={<Tag color={props.tagColor}>{props.status}</Tag>}>
          <Button onClick={ event => { navigate('/app/events/:eventid/') }} className="start-btn" size="large" block type="secondary"> Generate Slots </Button>
          <Button onClick={ event => { props.setRoundId(props.id) }} className="start-btn" size="large" block type="primary"> Start Judging </Button>
        </Card>
      </Col>
  </div>
  );
}