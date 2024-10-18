import { Flex, Switch } from "antd";

const Header = ({ isDarkMode, handleClick }) => {
  return (
    <Flex
      style={{
        background: "#333",
        justifyContent: "space-between",
        padding: 8,
      }}
    >
      <div />
      <Switch
        checked={isDarkMode}
        onChange={handleClick}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </Flex>
  );
};

export default Header;
