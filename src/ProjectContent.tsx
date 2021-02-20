import { Table } from 'antd';
import React, { FunctionComponent, useState } from 'react';

const columns = [
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'LUFS',
    dataIndex: 'lufs',
    key: 'lufs',
  },
];

interface ProjectContentProps {
  versions: Array<string>;
}

const ProjectTable: FunctionComponent<ProjectContentProps> = ({
  versions,
}: ProjectContentProps) => {
  const data: Array<{
    key: string;
    version: string;
    lufs: number;
  }> = versions.map((version) => ({
    key: version,
    version,
    lufs: 1.0,
  }));

  return <Table dataSource={data} columns={columns} />;
};

export const ProjectContent: FunctionComponent<ProjectContentProps> = ({
  versions,
}: ProjectContentProps) => {
  return <ProjectTable versions={versions} />;
};
export default ProjectContent;
