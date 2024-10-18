import { Select } from "antd";
import { dataSorting } from "./data";

const Sorting = ({ handleChangeMovie }) => {
  const handleChange = (value) => {
    handleChangeMovie({ page: 1, sort_by: value });
  };
  return (
    <Select
      placeholder={"Choose Sort By"}
      style={{
        width: "100%",
      }}
      onChange={handleChange}
      options={dataSorting}
      defaultValue={"popularity.desc"}
    />
  );
};

export default Sorting;
