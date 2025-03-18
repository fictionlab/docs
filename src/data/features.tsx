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
      src: '/img/robots/leo/leo-rover.webp',
      width: 1000,
      height: 1000,
      hyperlink: 'leo-rover',
      style: { width: 400, height: 'auto', paddingBottom: 20 },
    },
    text: (
      <span>
        Ready to go open-source 4x4 mobile robot. <br /> Weatherproof | ROS
        based | Built-in UI and video streaming
      </span>
    ),
  },
  {
    name: 'Rapha Rover',
    image: {
      src: '/img/robots/rapha/rapha-rover.webp',
      width: 1000,
      height: 1000,
      hyperlink: 'rapha-rover/getting-started',
      style: { width: 400, height: 'auto', paddingBottom: 20 },
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
