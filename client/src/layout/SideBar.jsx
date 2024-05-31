import { Logo } from '@components/base';
import { Buttonz, Dropdownz, Hrz } from '@components/core';
import {
  BuildingOffice2Icon,
  CalculatorIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  ServerIcon,
  Squares2X2Icon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { NavGroup, NavItem } from '@layout/shared';
import { useToastState, useUserState } from '@store';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const icons = {
  Squares2X2Icon,
  ChartBarIcon,
  BuildingOffice2Icon,
  ServerIcon,
  UsersIcon,
  Cog6ToothIcon,
  CalculatorIcon,
  ComputerDesktopIcon
};

const Sidebar = (props) => {
  const { showSidebar, onSignOut } = props;
  const { pathname } = useLocation();
  const { tools, projects, project, setProject, setLoadingz } = useUserState();
  const { showToast } = useToastState();
  const [open, setOpen] = useState(0);

  useEffect(() => {
    let title;
    const currentIndex = tools.findIndex((item) => {
      if (item.type === 'item') {
        if (item.route === pathname) title = item.label;
      } else {
        const childIndex = item.children?.findIndex((child) => (child.route === '/' ? pathname === '/' : pathname.startsWith(child.route)));
        if (childIndex >= 0) {
          title = item.children[childIndex].label;
          return true;
        }
      }
    });
    if (currentIndex >= 0) setOpen(currentIndex + 1);
    if (title) document.title = title;
  }, [pathname]);

  const onSelectProject = (e) => {
    setProject(e);
    localStorage.setItem('project', e);
    setLoadingz()
    setTimeout(() => {
      showToast({ title: 'Đổi dự án thành công', severity: 'success' });
    }, 1000)
  };

  return (
    <div
      className={`fixed left-0 inset-y-0 h-screen z-40 w-full max-w-[18rem] shadow-xl shadow-blue-gray-900/5 
      bg-sidebar text-on-sidebar transition-all duration-500 ease-in-out ${showSidebar ? '' : '-translate-x-full'}`}
    >
      <div className="p-4">
        <div className="mb-2 flex items-center gap-4 p-4">
          <Logo />
        </div>
        <Dropdownz
          value={project}
          onChange={onSelectProject}
          className="!w-full text-on-sidebar"
          label="Chọn dự án"
          options={projects}
          optionLabel="name"
          optionValue="_id"
          selectClassName="!text-on-sidebar"
        />
      </div>
      <Hrz className="mx-4" />
      <nav className="flex flex-col gap-1 text-base font-normal mt-4 h-body-sidebar overflow-scroll px-4">
        {tools?.map((item, index) => {
          const type = item.children?.length === 1 ? 'item' : 'group';
          const Icon = icons[item.icon];
          if (type === 'item') return <NavItem key={index} item={item.children[0]} pathname={pathname} Icon={Icon} />;
          else return <NavGroup key={index} item={item} value={index + 1} open={open} setOpen={setOpen} pathname={pathname} Icon={Icon} />;
        })}
      </nav>
      <div className="p-4">
        <Hrz className="my-3 border-on-sidebar" />
        <div className="flex flex-col gap-2">
          <Buttonz onClick={onSignOut} variant="outlined" className="w-full">
            Đăng xuất
          </Buttonz>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
