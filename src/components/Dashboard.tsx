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

  useEffect(() => {
    alert(
      "To view the second page, select Nintendo in the sidebar. Other options will show the initial dashboard."
    );
  }, []);

  return (
    <Layout className="min-h-screen">
      <Sider
        className="bg-black"
        width={`20%`}
        style={{
          backgroundColor: "#000",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div className="h-full flex flex-col">
          <div className="h-[10%] flex items-center justify-center text-white text-2xl font-bold mt-2">
            {<LogoSVG />}
          </div>
          <hr className="border-gray-300 opacity-50 mb-12 mt-4" />

          <div className="flex-1 flex flex-col justify-between w-[90%] mx-auto">
            <div>
              {sidebarItems.map((item) => (
                <div
                  key={item.name}
                  className={`flex pt-3 px-5 cursor-pointer rounded-xl transform transition duration-200 ${selectedItem === item.name
                    ? "bg-[#A93636]"
                    : "hover:bg-gray-900 hover:scale-[1.03]"
                    }`}
                  onClick={() => setSelectedItem(item.name)}
                >
                  <span className="text-xs relative bottom-[4px]">
                    {item.icon}
                  </span>
                  <p className="text-white text-xs ml-3">{item.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto py-6">
              <div className="flex pt-5 px-5 cursor-pointer rounded-xl transform transition duration-200 hover:scale-[1.03]">
                <span className="text-xs relative bottom-[4px]">
                  {<IBMCircleSVG />}
                </span>
                <p className="text-white text-xs ml-3">IBM</p>
              </div>
              <div className="flex pt-5 px-5 cursor-pointer rounded-xl transform transition duration-200 hover:scale-[1.03]">
                <span className="text-xs relative bottom-[4px]">
                  {<LogOutSVG />}
                </span>
                <p className="text-white text-xs ml-3">Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </Sider>
      <Layout style={{ marginLeft: '20%' }}>
        <Header className="flex items-center justify-between shadow px-2 py-3 bg-white!">
          <div className="flex-1">
            <Input
              className="max-w-xs text-xxs"
              size="small"
              prefix={<SearchIconSVG />}
              placeholder="Search Parameter & Params"
            />
          </div>
          <div className="flex items-center gap-4 scale-80">
            <div className="text-xxs text-gray-500 whitespace-nowrap">
              {currentDateTime} | <strong>Business Date:</strong> {currentDateTime}
            </div>

            <div className="flex items-center cursor-pointer">
              <Avatar size="small" icon={<NotificationSVG />} />
            </div>

            <Dropdown overlay={businessLocationMenu} trigger={["click"]}>
              <div className="flex items-center gap-1 cursor-pointer">
                <Avatar size="small" icon={<BuildingSVG />} />
                <Text className="text-xxs max-w-[120px] truncate">
                  {loggedInUser?.location?.businessLocation}
                </Text>
                <DownOutlined style={{ fontSize: "10px" }} />
              </div>
            </Dropdown>

            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <div className="flex items-center gap-1 cursor-pointer">
                <Avatar size="small" icon={<UserIconSVG />} />
                <Text className="text-xxs max-w-[100px] truncate">
                  {loggedInUser?.firstName} {loggedInUser?.lastName}
                </Text>
                <DownOutlined style={{ fontSize: "10px" }} />
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="p-6 bg-gray-100">
          {selectedItem === "Nintendo" ? (
            <NewRequest />
          ) : (
            <Nintendo
              loggedInUser={loggedInUser}
              jobs={jobs}
              selectedJobId={selectedJobId}
              handleCardClick={handleCardClick}
              containerRef={containerRef}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
