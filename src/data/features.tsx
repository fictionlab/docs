import { JSX } from 'react';

export type FeatureItem = {
  name: string;
  image: {
    src: string;
    width: number;
    height: number | string;
    hyperlink: string;
    style: object;
  };
  text: JSX.Element;
};

const FEATURES: FeatureItem[] = [
  {
    name: 'Leo Rover',
    image: {
      src: '/img/robots/leo/leo-rover-1.9.webp',
      width: 2000,
      height: 1300,
      hyperlink: 'leo-rover',
      style: { width: 'auto', height: 260, marginTop: 40 },
    },
    text: (
      <span>
        Ready to go open-source 4x4 mobile robot. <br /> Weatherproof | ROS
        based | Built-in UI and video streaming
      </span>
    ),
  },
  {
    name: 'Raph Rover',
    image: {
      src: '/img/robots/raph/raph-rover.webp',
      width: 2000,
      height: 1500,
      hyperlink: 'raph-rover',
      style: { width: 'auto', height: 300 },
    },
    text: (
      <span>
        Research-ready platform designed to streamline development of various
        robotic projects, including inspection, agriculture, construction, and
        more.
      </span>
    ),
  },
];

export default FEATURES;
