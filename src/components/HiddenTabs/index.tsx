import {JSX} from 'react';
import Tabs, { type Props as TabsProps } from '@theme/Tabs';

const HiddenTabs = (props: TabsProps): JSX.Element => {
  return (
    <Tabs {...props} className="hide-tab-labels">
      {props.children}
    </Tabs>
  );
};

export default HiddenTabs;