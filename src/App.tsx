/* eslint-disable react/jsx-props-no-spreading */
import Store from 'electron-store';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './App.global.css';
import addDirectory, { readProjectContent } from './projects/projects';
import { ProjectContent } from './ProjectContent';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const store = new Store();

function addProject(
  currentProjects: Array<ProjectProps>,
  name: string,
  path: string
): Array<ProjectProps> {
  const newProject = { name, path } as ProjectProps;
  const projects = [...currentProjects, newProject];
  return projects;
}

interface ProjectProps {
  name: string;
  path: string;
}

interface ProjectVersion {
  path: string;
  name: string;
  created: Date;
}

interface ProjectContentProps {
  versions: Array<ProjectVersion>;
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
  const [projects, setProjects] = useState<Array<ProjectProps>>([]);
  const [currentProject, setCurrentProject] = useState<ProjectContentProps>({
    versions: [],
  });

  const selectProjectByKey: (i: string) => void = (i: string) => {
    const toFind = i.substring(8);
    const selectedProject = projects.find((project) => project.name === toFind);
    if (selectedProject !== undefined) {
      readProjectContent(selectedProject)
        .then((files) =>
          files.map((file) => ({
            path: file.path,
            name: file.name,
            created: file.created,
          }))
        )
        .then((versions) => setCurrentProject({ versions }))
        .catch((e) => setCurrentProject({ versions: [] }));
    }
  };

  const projectItems = projects.map((project) => (
    <Project
      key={`project_${project.name}`}
      name={project.name}
      path={project.path}
    />
  ));

  useEffect(() => {
    const loadedProjects = store.get('projects') as Array<ProjectProps>;
    setProjects(loadedProjects);
  }, []);

  useEffect(() => {
    store.set('projects', projects);
  }, [projects]);

  return (
    <Layout style={{ minHeight: '200vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onSelect={(i) => selectProjectByKey(i.key)}
          defaultOpenKeys={['sub1']}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Projects">
            {projectItems}
          </SubMenu>
        </Menu>
        <div className="menu-bottom">
          <Button
            type="primary"
            size="middle"
            className="add-project-button"
            onClick={() =>
              addDirectory((projectName, projectPath) =>
                setProjects(addProject(projects, projectName, projectPath))
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
            <ProjectContent versions={currentProject.versions} />
          </div>
        </Content>
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
