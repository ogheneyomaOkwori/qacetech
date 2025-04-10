import React from "react";

interface JobCardProps {
  title: string | null;
  description: string | null;
  logo: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ title, description, logo, selected, onSelect }) => {

  return (
    <div
      className={`rounded-lg shadow-md py-2 px-8 pl-6 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-101 hover:shadow-xl ${
        selected ? "bg-rose-100 border border-red-900" : "bg-white"
      }`}
      onClick={onSelect}
    >
      <div className="font-bold py-1 text-2xl rounded-full">{logo}</div>
      <div className="font-bold pb-2 py-1 text-lg">{title}</div>
      <p className="text-sm ">{description}</p>
    </div>
  );
};

export default JobCard;
