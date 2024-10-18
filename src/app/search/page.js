"use client";
import CardMovie from "@/components/CardMovie";
import SkeletonMovie from "@/components/SkeletonMovie";
import { getSearhMovie } from "@/redux/action/movie";
import { SET_LIST_SEARCH_MOVIE } from "@/redux/types/movieTypes";
import { Col, Flex, Input, Layout, Pagination, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import styles from "./Search.module.css";

const Search = () => {
  const dispatch = useDispatch();
  const { loadSearchMovie, movieSearch } = useSelector(
    (state) => state.movieReducer
  );

  useEffect(() => {
    dispatch(getSearhMovie(movieSearch));
    window.scrollTo(0, 0);
  }, [dispatch, movieSearch.page, movieSearch.search]);

  const onChange = (page) => {
    dispatch({
      type: SET_LIST_SEARCH_MOVIE,
      value: { ...movieSearch, page: page },
    });
  };

  const debounced = useDebouncedCallback((value) => {
    dispatch({
      type: SET_LIST_SEARCH_MOVIE,
      value: { ...movieSearch, search: value, page: 1 },
    });
  }, 1000);

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Content style={{ margin: 16 }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 className={styles.title}>Search Movies</h1>
          <Input
            placeholder="input keyword"
            defaultValue={movieSearch.search}
            onChange={(e) => debounced(e.target.value)}
          />
        </div>
        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          {loadSearchMovie ? (
            Array.from({ length: 18 }).map((_, index) => (
              <Col xl={4} lg={6} md={8} key={index}>
                <SkeletonMovie />
              </Col>
            ))
          ) : movieSearch.results.length !== 0 ? (
            movieSearch.results.map((movie, index) => {
              return (
                <Col xl={4} lg={6} md={8} sm={8} xs={12} key={movie.id}>
                  <CardMovie key={index} data={movie} />
                </Col>
              );
            })
          ) : (
            <Flex justify="center" align="center" style={{ width: "100%" }}>
              <p style={{ fontWeight: "600", fontSize: 20 }}>
                Data Movie Tidak Tesedia
              </p>
            </Flex>
          )}
        </Row>
        {movieSearch.results.length !== 0 && (
          <Row style={{ marginTop: 20, marginBottom: 20 }}>
            <Pagination
              current={movieSearch.page || 1}
              total={movieSearch.total_pages}
              showSizeChanger={false}
              onChange={onChange}
            />
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default Search;
