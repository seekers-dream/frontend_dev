import { useScrollToTop } from '@/hooks/useScroll';
import DashboardSidebar from './Sidebar';

import React from 'react';

type DashboardLayoutProps = object;

export const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  useScrollToTop();
  return (
    <>
      <DashboardSidebar children={undefined} {...props} />
    </>
  );
};
