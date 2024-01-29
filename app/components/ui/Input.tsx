type InputProps = {
  label: string;
  id: string;
};

const Input = ({ label, id }: InputProps) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="text-xs">
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        className="rounded-md py-1 pl-2 pr-7  text-white bg-gray-800"
      />
    </>
  );
};

export default Input;
