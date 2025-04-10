// Nintendo.tsx
import { FC, RefObject } from "react";
import { Avatar, Typography, Row, Col } from "antd";
import JobCard from "../Jobs/JobCard";
import BuildingSVG from "../../icons/building.svg?react";

const { Title, Text } = Typography;

interface NitendoProps {
  loggedInUser: {
    firstName: string;
    lastName: string;
  };
  jobs: {
    jobId: string;
    jobTitle: string;
    jobDescription: string;
  }[];
  selectedJobId: string | null;
  handleCardClick: (jobId: string) => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

const Nintendo: FC<NitendoProps> = ({
  loggedInUser,
  jobs,
  selectedJobId,
  handleCardClick,
  containerRef,
}) => {
  return (
    <>
      <Title level={3}>
        <div className="font-bold text-4xl">
          Hello {loggedInUser?.firstName} {loggedInUser?.lastName}
        </div>
      </Title>
      <Text className="text-gray-500">
        <p className="font-light">Welcome to your dashboard</p>
      </Text>
      <div ref={containerRef}>
        <Row gutter={[16, 16]} className="mt-6">
          {jobs.map((job) => (
            <Col xs={24} sm={12} md={8} key={job.jobId}>
              <JobCard
                key={job.jobId}
                title={job.jobTitle}
                description={job.jobDescription}
                logo={<Avatar icon={<BuildingSVG />} size="large" />}
                selected={selectedJobId === job.jobId}
                onSelect={() => handleCardClick(job.jobId)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Nintendo;
