import { useEffect, useState, useRef } from "react";
import { Layout, Menu, Avatar, Input, Dropdown, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import NitendoSVG from "../icons/nitendo.svg?react";
import DisneySVG from "../icons/disney.svg?react";
import IbmSVG from "../icons/ibm.svg?react";
import LouisVitonSVG from "../icons/louisViton.svg?react";
import MasterCardSVG from "../icons/masterCard.svg?react";
import LogOutSVG from "../icons/logOutIcon.svg?react";
import IBMCircleSVG from "../icons/ibmCircle.svg?react";
import PizzaHutSVG from "../icons/pizzaHut.svg?react";
import AmericaBankSVG from "../icons/americaBank.svg?react";
import SearchIconSVG from "../icons/searchIcon.svg?react";
import UserIconSVG from "../icons/userIcon.svg?react";
import NotificationSVG from "../icons/notification.svg?react";
import BuildingSVG from "../icons/building.svg?react";
import LogoSVG from "../icons/logo.svg?react";
import { getCurrentDateTime } from "../utils/helper";
import { useGetUsers } from "../../hooks/useGetUsers";
import { useGetJobs } from "../../hooks/useGetJobs";
import Nintendo from "./DashboardContent/Nintendo";
import NewRequest from "./DashboardContent/NewRequest";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const sidebarItems = [
  { name: "Nintendo", icon: <NitendoSVG /> },
  { name: "IBM", icon: <IbmSVG /> },
  { name: "The Walt Disney Company", icon: <DisneySVG /> },
  { name: "Louis Vuitton", icon: <LouisVitonSVG /> },
  { name: "MasterCard", icon: <MasterCardSVG /> },
  { name: "Pizza Hut", icon: <PizzaHutSVG /> },
  { name: "Bank of America", icon: <AmericaBankSVG /> },
];

const Dashboard = () => {
  const { data: users } = useGetUsers();
  const { data: jobs } = useGetJobs();
  console.log(jobs);
  console.log(users);
  const loggedInUser = users[0];
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // state to track selected menu item
  const [currentDateTime, setCurrentDateTime] = useState<string>(""); // state to track and update current time

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<LogOutSVG />}>
        Log Out
      </Menu.Item>
    </Menu>
  );
  const businessLocationMenu = (
    <Menu>
      <Menu.Item key="1" icon={<LogOutSVG />}>
        Request Transfer
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setCurrentDateTime(getCurrentDateTime());
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedJobId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Layout className="min-h-screen">
      <Sider
        className="bg-black h-screen"
        style={{ backgroundColor: "#000" }}
        width={`15%`}
      >
        <div className="h-full flex flex-col">
          <div className="h-[10%] flex items-center justify-center text-white text-2xl font-bold">
            {<LogoSVG />}
          </div>
          <hr className="border-gray-300 opacity-50 mb-12" />

          <div className="flex-1 flex flex-col justify-between w-[90%] mx-auto">
            <div>
              {sidebarItems.map((item) => (
                <div
                  key={item.name}
                  className={`flex pt-5 px-5 cursor-pointer rounded-xl transform transition duration-200 ${
                    selectedItem === item.name
                      ? "bg-[#A93636]"
                      : "hover:bg-gray-900 hover:scale-[1.03]"
                  }`}
                  onClick={() => setSelectedItem(item.name)}
                >
                  <span className="text-2xl relative top-[4px]">
                    {item.icon}
                  </span>
                  <p className="text-white text-lg ml-3">{item.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex pt-5 px-5 cursor-pointer rounded-xl transform transition duration-200 hover:scale-[1.03]">
                <span className="text-2xl relative top-[4px]">
                  {<IBMCircleSVG />}
                </span>
                <p className="text-white text-lg ml-3">IBM</p>
              </div>
              <div className="flex pt-5 px-5 cursor-pointer rounded-xl transform transition duration-200 hover:scale-[1.03]">
                <span className="text-2xl relative top-[4px]">
                  {<LogOutSVG />}
                </span>
                <p className="text-white text-lg ml-3">Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between shadow px-6! py-12! bg-white!">
          <Input
            className="max-w-md"
            size="large"
            prefix={<SearchIconSVG />}
            placeholder="Search Parameter & Params"
          />
          <div className="flex items-center gap-6">
            <div className="text-md text-gray-500">
              {currentDateTime} | <strong>Business Date:</strong>{" "}
              {currentDateTime}
            </div>
            <div className="flex items-center gap-2 cursor-pointer rounded-full">
              <Avatar icon={<NotificationSVG />} />
            </div>
            <Dropdown overlay={businessLocationMenu} trigger={["click"]}>
              <div className="flex items-center gap-2 cursor-pointer rounded-full">
                <Avatar icon={<BuildingSVG />} />
                <Text>{loggedInUser?.location?.businessLocation}</Text>
                <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <div className="flex items-center gap-2 cursor-pointer rounded-full">
                <Avatar icon={<UserIconSVG />} />
                <Text>
                  {loggedInUser?.firstName} {loggedInUser?.lastName}
                </Text>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-6 bg-gray-100">
          <Nintendo
            loggedInUser={loggedInUser}
            jobs={jobs}
            selectedJobId={selectedJobId}
            handleCardClick={handleCardClick}
            containerRef={containerRef}
          />
          <div className="my-4">
            <hr />
          </div>
          <NewRequest />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
