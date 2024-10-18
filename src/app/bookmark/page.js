"use client";
import CardMovie from "@/components/CardMovie";
import { saveBookmark } from "@/redux/action";
import { Col, Flex, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "../search/Search.module.css";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { listBookmark } = useSelector((state) => state.bookmarkReducer);

  const handleBookmark = (item) => {
    const data = listBookmark.filter((res) => res.id != item.id);
    dispatch(saveBookmark(data));
  };

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Content style={{ margin: 16 }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 className={styles.title}>List Bookmark Movie</h1>
        </div>
        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          {listBookmark !== 0 &&
            listBookmark.map((movie, index) => {
              return (
                <Col xl={4} lg={6} md={8} sm={8} xs={12}>
                  <CardMovie
                    key={index}
                    data={movie}
                    type={"bookmark"}
                    onBookmark={() => handleBookmark(movie)}
                  />
                </Col>
              );
            })}
          {(!listBookmark || listBookmark.length === 0) && (
            <Flex justify="center" align="center" style={{ width: "100%" }}>
              <p style={{ fontWeight: "600", fontSize: 20 }}>
                Bookmark Tidak Tesedia
              </p>
            </Flex>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default Bookmark;
