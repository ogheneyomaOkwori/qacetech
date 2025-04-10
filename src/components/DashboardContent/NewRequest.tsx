import { useState } from "react";
import { Input, Radio, RadioChangeEvent, Typography } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import DashboardSVG from "../../icons/dashboard.svg?react";
import ArrowRightSVG from "../../icons/arrowRight.svg?react";
import UserOctagonSVG from "../../icons/userOctagon.svg?react";
import Cube3dSVG from "../../icons/cube3d.svg?react";
import ProgressStepperSVG from "../../icons/progressStepper.svg?react";

const { Title, Text } = Typography;
const { TextArea } = Input;
const radioOptions: CheckboxGroupProps<string>["options"] = [
  "Tampa (FL)",
  "Tampa (Fl)",
];

const NewRequest = () => {
  const [value, setValue] = useState("Tampa (FL)");
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
  };
  return (
    <>
      <Title level={3}>
        <div className="font-bold text-4xl">Nitendo</div>
      </Title>
      <Text className="text-gray-500">
        <div className="flex">
          <div className="flex cursor-pointer transition duration-200 hover:scale-[1.03]">
            <span>{<DashboardSVG />}</span>
            <p className="text-gray-400 ml-3">Dashboard</p>
          </div>
          <div className="flex cursor-pointer">
            <span className="ml-3">{<ArrowRightSVG />}</span>
            <span className="">{<UserOctagonSVG />}</span>
            <p className="text-gray-400 ml-3 transition duration-200 hover:scale-[1.03]">
              Nitendo
            </p>
            <span className="ml-3">{<ArrowRightSVG />}</span>
            <span className="ml-3">{<Cube3dSVG />}</span>
            <p className="text-gray-900 ml-3 transition duration-200 hover:scale-[1.03]">
              New Murabaha Financing
            </p>
          </div>
        </div>
      </Text>
      <div className="w-full">{<ProgressStepperSVG />}</div>
      <div className="w-full bg-white rounded-lg shadow-sm">
        <div>
          <Radio.Group
            size="large"
            options={radioOptions}
            onChange={onChange}
            value={value}
          />
        </div>

        <div className="w-full flex justify-center mt-4">
          <div className="w-[90%] max-w-full">
            <div className="my-4">
              <p>
                Web Designer <span className="text-red-900">*</span>
              </p>
              <Input placeholder="Enter asset name" size="large" />
            </div>
            <div className="my-4">
              <p className="flex">
                Marketting Coordinator <span className="text-red-900">*</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 cursor-pointer text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                  />
                </svg>
              </p>
              <TextArea rows={5} size="large" placeholder="Enter asset description" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRequest;
