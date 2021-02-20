import { Table } from 'antd';
import React, { FunctionComponent, useState } from 'react';

const columns = [
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    render: (created: Date) => created.toISOString(),
  },
  {
    title: 'LUFS',
    dataIndex: 'lufs',
    key: 'lufs',
  },
];

interface ProjectVersion {
  name: string;
  created: Date;
}

interface ProjectContentProps {
  versions: Array<ProjectVersion>;
}

const ProjectTable: FunctionComponent<ProjectContentProps> = ({
  versions,
}: ProjectContentProps) => {
  const data: Array<{
    key: string;
    version: string;
    created: Date;
    lufs: number;
  }> = versions.map((version) => ({
    key: version.name,
    version: version.name,
    created: version.created,
    lufs: 1.0,
  }));

  return <Table dataSource={data} columns={columns} />;
};

export const ProjectContent: FunctionComponent<ProjectContentProps> = ({
  versions,
}: ProjectContentProps) => {
  console.log(versions);
  return <ProjectTable versions={versions} />;
};
export default ProjectContent;
