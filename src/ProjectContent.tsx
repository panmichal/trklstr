import { Table, Button } from 'antd';
import React, { FunctionComponent, useState } from 'react';
import { Howl, Howler } from 'howler';
import Play from './ProjectVersion/ProjectVersionPlay';
import Item from 'antd/lib/list/Item';

function play(file: string): void {
  const sound = new Howl({
    src: [file],
  });
  sound.play();
}

interface Item {
  key: string;
  path: string;
  version: string;
  created: Date;
  lufs: number;
}

interface Sounds {
  [key: string]: Howl;
}

interface ProjectVersion {
  path: string;
  name: string;
  created: Date;
}

interface ProjectContentProps {
  versions: Array<ProjectVersion>;
}

function playSound(path: string, key: string, sounds: Sounds): Sounds {
  if (key in sounds) {
    sounds[key].play();
  } else {
    const sound = new Howl({
      src: [path],
    });
    sound.play();
    sounds[key] = sound;
  }

  return sounds;
}

function stopSound(path: string, key: string, sounds: Sounds): Sounds {
  if (key in sounds) {
    sounds[key].stop();
  } else {
    const sound = new Howl({
      src: [path],
    });
    sound.stop();
    sounds[key] = sound;
  }

  return sounds;
}

const ProjectTable: FunctionComponent<ProjectContentProps> = ({
  versions,
}: ProjectContentProps) => {
  const data: Array<Item> = versions.map((version) => ({
    key: version.name,
    version: version.name,
    path: version.path,
    created: version.created,
    lufs: 1.0,
  }));

  const [sounds, setSounds] = useState<Sounds>({});

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
    {
      title: 'Play',
      dataindex: 'play',
      key: 'play',
      /* eslint-disable react/display-name */
      render: (_: any, record: Item) => (
        <Play
          playCallback={() => playSound(record.path, record.key, sounds)}
          stopCallback={() => stopSound(record.path, record.key, sounds)}
          key={record.key}
        />
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export const ProjectContent: FunctionComponent<ProjectContentProps> = ({
  versions,
}: ProjectContentProps) => {
  return <ProjectTable versions={versions} />;
};
export default ProjectContent;
