import React from 'react';

type OptionProps = {
  id: string;
  name: string;
};

type SelectProps = {
  id: string;
  children: React.ReactNode;
  //   options?: OptionProps[];
  handleChange: (eventValue: number) => void;
};

const Select: React.FunctionComponent<SelectProps> = ({ children, id, handleChange }) => {
  const onHandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(+event.target.value);
  };

  return (
    <select id={id} onChange={onHandleChange}>
      {/* {options.map((option: OptionProps) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))} */}

      {children}
    </select>
  );
};

export default Select;
