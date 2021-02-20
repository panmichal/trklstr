import React, { useState } from 'react';
import { Table } from 'antd';
import './App.global.css';
import loadFilesFromDirectory from './files';

interface State {
  filesLoaded: boolean;
  filePaths: Array<string>;
}

interface FileListProps {
  fileNames: Array<string>;
}

const tableColumns = [
  {
    title: 'Path',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'Length',
    dataIndex: 'length',
    key: 'length',
  },
];

const ProjectList = ({ fileNames }: FileListProps) => {
  const data = fileNames.map((name, index) => ({
    key: index,
    path: name,
    length: 0,
  }));
  return <Table columns={tableColumns} dataSource={data} />;
};

export const Projects = () => {
  const [projects, setProjects] = useState<Array<string>>([]);

  return (
    <div>
      <ProjectList fileNames={projects} />
    </div>
  );
};

export default Projects;
