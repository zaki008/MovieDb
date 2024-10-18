import { Button, Card } from "antd";
import Image from "next/image";

import Text from "antd/es/typography/Text";
import moment from "moment";
import { useState } from "react";
import styles from "./Card.module.css";

const CardMovie = ({ data, type, onRemove, onEdit, onBookmark }) => {
  const [isValid, setIsValid] = useState(true);
  const handleError = () => {
    setIsValid(false);
  };

  const loadGambar = (data) => {
    try {
      if (data?.originFileObj?.type && data?.originFileObj?.size) {
        return URL?.createObjectURL(data?.originFileObj);
      }
      if (isValid) {
        return `https://media.themoviedb.org/t/p/w220_and_h330_face/${data}`;
      }
      return "https://dp3a.mataramkota.go.id/themes/kenshin-kenshinschool/assets/images/default.jpg";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      hoverable
      cover={
        <Image
          alt="example"
          src={loadGambar(data?.poster_path)}
          layout={
            data?.poster_path?.originFileObj || !isValid ? "" : "responsive"
          }
          width={200}
          height={240}
          onError={handleError}
        />
      }
    >
      <h4 className={styles.twoLineText}>{data.title}</h4>
      {data.release_date && (
        <div>
          <Text type="secondary">
            {moment(data.release_date).format("DD MMM YYYY")}
          </Text>
        </div>
      )}
      <div>
        <Text type="success">rating : {data?.vote_average?.toFixed(2)}</Text>
      </div>
      {(type == "bookmark" || type == "side") && (
        <Button
          type="primary"
          size="small"
          style={{
            width: "100%",
            marginTop: 4,
            background: data.is_bookmark && "#C62E2E",
          }}
          onClick={onBookmark}
        >
          {data.is_bookmark ? "Del Bookmark" : "Add Bookmark"}
        </Button>
      )}
      {type == "side" && (
        <>
          <Button
            type="primary"
            size="small"
            style={{ width: "100%", background: "#347928", marginTop: 4 }}
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            style={{ width: "100%", marginTop: 4 }}
            onClick={onRemove}
          >
            Remove
          </Button>
        </>
      )}
    </Card>
  );
};
export default CardMovie;
