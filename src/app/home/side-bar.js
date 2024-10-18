import { Collapse } from "antd";
import Filter from "./filter";
import Search from "./search";
import Sorting from "./sorting";

const SideBar = ({ movies, handleChangeMovie }) => {
  const items = [
    {
      key: "1",
      label: "Sorting By",
      children: <Sorting handleChangeMovie={handleChangeMovie} />,
    },
    {
      key: "2",
      label: "Search",
      children: <Search />,
    },
    {
      key: "3",
      label: "Filter",
      children: (
        <p>
          <Filter movies={movies} handleChangeMovie={handleChangeMovie} />
        </p>
      ),
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
  );
};
export default SideBar;
