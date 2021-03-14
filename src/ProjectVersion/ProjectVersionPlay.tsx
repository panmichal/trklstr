import React, { FunctionComponent, useState } from 'react';
import { CaretRightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface PlayProps {
  key: string;
  playCallback: () => void;
  stopCallback: () => void;
}

export const ProjectVersionPlay: FunctionComponent<PlayProps> = ({
  key,
  playCallback,
  stopCallback,
}: PlayProps) => {
  const [isPlaying, setPlaying] = useState(false);
  const onClick = () => {
    if (isPlaying) {
      setPlaying(false);
      stopCallback();
    } else {
      setPlaying(true);
      playCallback();
    }
  };
  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={isPlaying ? <CloseCircleOutlined /> : <CaretRightOutlined />}
        size="small"
        onClick={onClick}
      />
    </>
  );
};

export default ProjectVersionPlay;
