/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { useMediaQuery } from "react-responsive";


interface Props {
  user: {
    role: string;
  } | null;
}

const NavbarMenu: React.FC<Props> = ({ user }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  let menuItems;

  // Define menu items based on user role
  if (user?.role === "employee") {
    menuItems = [
      <Menu.Item key="1">Personal Information</Menu.Item>,
      <Menu.Item key="2">Visa Status Management</Menu.Item>,
      <Menu.Item key="3">Logout</Menu.Item>,
    ];
  } else if (user?.role === "HR") {
    menuItems = [
      <Menu.Item key="1">Home</Menu.Item>,
      <Menu.Item key="2">Employee Profiles</Menu.Item>,
      <Menu.Item key="3">Visa Status Management</Menu.Item>,
      <Menu.Item key="4">Hiring Management</Menu.Item>,
      <Menu.Item key="5">Logout</Menu.Item>,
    ];
  } else {
    // Navigate back to login if no user
    window.location.href = "/login";
    return null;
  }

  if (isSmallScreen) {
    return (
      <Dropdown overlay={<Menu>{menuItems}</Menu>}>
        <Button>
          Menu
        </Button>
      </Dropdown>
    );
  } else {
    return (
      <Menu mode="horizontal">
        {menuItems}
      </Menu>
    );
  }
};

export default NavbarMenu;
