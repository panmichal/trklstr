/* eslint-disable react/jsx-props-no-spreading */
import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Table, Layout, Menu, Breadcrumb, Button } from 'antd';
import { FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Projects } from './ProjectList';
import icon from '../assets/icon.svg';
import './App.global.css';
import addDirectory from './projects/projects';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

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

const FileList = ({ fileNames }: FileListProps) => {
  const data = fileNames.map((name, index) => ({
    key: index,
    path: name,
    length: 0,
  }));
  return <Table columns={tableColumns} dataSource={data} />;
};
// const Hello = () => {
//   const [filePaths, setFilePaths] = useState<Array<string>>([]);
//   const [filesLoaded, setFilesLoaded] = useState(false);

//   return (
//     <div>
//       <div className="Hello">
//         <img width="200px" alt="icon" src={icon} />
//       </div>
//       <h1>electron-react-boilerplate</h1>
//       <button
//         type="button"
//         onClick={() => loadFilesFromDirectory(setFilePaths)}
//       >
//         <span role="img" aria-label="books">
//           📚
//         </span>
//         OPEN
//       </button>
//       <div>
//         <Projects />
//       </div>
//       <div>
//         <FileList fileNames={filePaths} />
//       </div>
//       <div className="Hello">
//         <a
//           href="https://electron-react-boilerplate.js.org/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               📚
//             </span>
//             Read our docs
//           </button>
//         </a>
//         <a
//           href="https://github.com/sponsors/electron-react-boilerplate"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               🙏
//             </span>
//             Donate
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

function addProject(
  currentProjects: Array<string>,
  newProject: string
): Array<string> {
  return [...currentProjects, newProject];
}

const ProjectContent: FunctionComponent<ProjectContentProps> = (
  props: ProjectContentProps
) => {
  return <div>HEJ</div>;
};

interface ProjectProps {
  name: string;
}

interface ProjectContentProps {
  versions: Array<string>;
}

const Project: FunctionComponent<ProjectProps> = ({
  name,
  ...props
}: ProjectProps) => {
  return (
    <Menu.Item key={`project_${name}`} {...props}>
      {name}
    </Menu.Item>
  );
};

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [projects, setProjects] = useState<Array<string>>([]);
  const [
    currentProject,
    setCurrentProject,
  ] = useState<ProjectContentProps | null>(null);

  const projectItems = projects.map((project) => (
    <Project key={`project_${project}`} name={project} />
  ));

  return (
    <Layout style={{ minHeight: '200vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onSelect={(i) => console.log(i)}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Projects">
            {projectItems}
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
        <div className="menu-bottom">
          <Button
            type="primary"
            size="middle"
            className="add-project-button"
            onClick={() =>
              addDirectory((newProject) =>
                setProjects(addProject(projects, newProject))
              )
            }
          >
            Add project
          </Button>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
