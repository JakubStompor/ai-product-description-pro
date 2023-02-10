import { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode; className?: string }> = (props) => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
      <div className="relative w-full h-full max-w-lg md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Card;
