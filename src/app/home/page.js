"use client";
import { CardMovie, ModalCreate, SkeletonMovie } from "@/components";
import { saveBookmark } from "@/redux/action";
import { deleteMovieById, getMovies } from "@/redux/action/movie.js";
import { Button, Col, Flex, Layout, Pagination, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import SideBar from "./side-bar.js";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { listBookmark } = useSelector((state) => state.bookmarkReducer);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [movies, setMovies] = useState({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
    sort_by: "popularity.desc",
    release_date_gte: moment(new Date("1980-10-20")).format("YYYY-MM-DD"),
    release_date_lte: moment().format("YYYY-MM-DD"),
    with_genres: [],
  });
  const [loadMovie, setLoadMovie] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [form, setForm] = useState({
    title: "",
    rating: "",
    image: null,
    preview: null,
    releaseDate: moment(),
  });

  const handleChangeMovie = (updates) => {
    setMovies((prev) => ({
      ...prev,
      ...(typeof updates === "function" ? updates(prev) : updates),
    }));
  };

  useEffect(() => {
    dispatch(getMovies(setLoadMovie, handleChangeMovie, movies));
    window.scrollTo(0, 0);
  }, [
    dispatch,
    movies.page,
    movies.sort_by,
    movies.with_genres,
    movies.release_date_gte,
    movies.release_date_lte,
  ]);

  const onChange = (page) => {
    handleChangeMovie({ page: page });
  };

  const handleEdit = (item) => {
    setIsModalCreate(!isModalCreate);
    setIdEdit(item.id);
    setForm({
      title: item.title,
      rating: Number(item.vote_average),
      image: item.poster_path,
      preview: `https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`,
      releaseDate: moment(item.release_date),
    });
  };

  const handleRemove = (id) => {
    dispatch(deleteMovieById(id, movies, handleChangeMovie));
  };

  const handleBookmark = (item) => {
    if (!item.is_bookmark) {
      const data = [{ ...item, is_bookmark: true }, ...listBookmark];
      dispatch(saveBookmark(data));
      return;
    }
    const data = listBookmark.filter((res) => res.id != item.id);
    dispatch(saveBookmark(data));
  };

  const dataResult = movies?.results.map((item) => ({
    ...item,
    is_bookmark:
      listBookmark.find(({ id }) => id === item.id)?.is_bookmark || false,
  }));

  return (
    <Layout>
      <Content style={{ margin: 16 }}>
        <Flex
          style={{
            marginBottom: "20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Flex style={{ alignItems: "center" }}>
            <h1 className={styles.title}>Movies</h1>
            <Button
              type="primary"
              onClick={() => setIsModalCreate(!isModalCreate)}
            >
              Create Movie
            </Button>
          </Flex>
          <Button
            type="primary"
            style={{ background: "#FEEC37", color: "#000" }}
            onClick={() => router.push("bookmark")}
          >
            List Bookmark
          </Button>
        </Flex>
        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          <Col span={24} lg={6} md={6}>
            <SideBar movies={movies} handleChangeMovie={handleChangeMovie} />
          </Col>
          <Col span={24} lg={18} md={18}>
            <Row gutter={[10, 24]}>
              {loadMovie
                ? Array.from({ length: 18 }).map((_, index) => (
                    <Col xl={4} lg={6} md={8} sm={12} xs={24} key={index}>
                      <SkeletonMovie />
                    </Col>
                  ))
                : dataResult.length !== 0 &&
                  dataResult.map((movie, index) => {
                    return (
                      <Col xl={4} lg={6} md={8} sm={8} xs={12} key={movie.id}>
                        <CardMovie
                          key={index}
                          data={movie}
                          type={"side"}
                          onRemove={() => handleRemove(movie.id)}
                          onEdit={() => handleEdit(movie)}
                          onBookmark={() => handleBookmark(movie)}
                        />
                      </Col>
                    );
                  })}
            </Row>
            <Row style={{ marginTop: 20, marginBottom: 20 }}>
              <Pagination
                current={movies.page || 1}
                total={movies.total_pages}
                showSizeChanger={false}
                onChange={onChange}
              />
            </Row>
          </Col>
        </Row>
        <ModalCreate
          isModalOpen={isModalCreate}
          setIsModalOpen={setIsModalCreate}
          movies={movies}
          handleChangeMovie={handleChangeMovie}
          form={form}
          setForm={setForm}
          idEdit={idEdit}
        />
      </Content>
    </Layout>
  );
};

export default Home;
