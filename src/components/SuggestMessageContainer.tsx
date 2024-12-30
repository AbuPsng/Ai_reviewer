import { UseFormSetValue } from "react-hook-form";

const SuggestMessageContainer = ({
  content,
  handleSelect,
}: {
  content: string;
  handleSelect: UseFormSetValue<{ content: string }>;
}) => {
  const handleClick = () => {
    handleSelect("content", content);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 rounded-md border text-center w-full cursor-pointer hover:bg-slate-100"
    >
      {content}
    </div>
  );
};

export default SuggestMessageContainer;
