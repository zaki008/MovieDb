import Box from "@/components/Box";
import { getGenres } from "@/redux/action/genre";
import { DatePicker, Flex } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const Filter = ({ movies, handleChangeMovie }) => {
  const dispatch = useDispatch();
  const { listGenre } = useSelector((state) => state.genreReducer);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const onChangeFromDate = (date, dateString) => {
    handleChangeMovie({
      page: 1,
      release_date_gte: dateString,
    });
  };
  const onChangeToDate = (date, dateString) => {
    handleChangeMovie({
      page: 1,
      release_date_lte: dateString,
    });
  };
  const handleGenre = (item) => {
    if (movies.with_genres.includes(item.id)) {
      handleChangeMovie((prev) => ({
        page: 1,
        with_genres: prev.with_genres.filter((id) => id !== item.id),
      }));
    } else {
      handleChangeMovie((prev) => ({
        page: 1,
        with_genres: [...prev.with_genres, item.id],
      }));
    }
  };
  return (
    <div>
      <div className={styles.sectionFilter}>
        <p className={styles.titleFilter}>Genre</p>
        <Flex wrap={"wrap"} gap={10} style={{ marginTop: 10 }}>
          {listGenre.length !== 0 &&
            listGenre.map((item) => {
              return (
                <Box
                  key={item.id}
                  data={item}
                  onClick={() => handleGenre(item)}
                  selectedGenre={movies.with_genres}
                />
              );
            })}
        </Flex>
      </div>
      <div className={styles.sectionFilter}>
        <p className={styles.titleFilter}>Release Date</p>
        <p className={styles.titleSubFilter}>From</p>
        <DatePicker
          style={{ width: "100%", marginBottom: 10 }}
          onChange={onChangeFromDate}
          defaultValue={dayjs(moment(movies.release_date_gte))}
          maxDate={dayjs(
            moment(movies.release_date_lte).format("YYYY-MM-DD"),
            dateFormat
          )}
        />
        <p className={styles.titleSubFilter}>To</p>
        <DatePicker
          style={{ width: "100%" }}
          onChange={onChangeToDate}
          defaultValue={dayjs(moment(movies.release_date_lte))}
          minDate={dayjs(
            moment(movies.release_date_gte).format("YYYY-MM-DD"),
            dateFormat
          )}
        />
      </div>
    </div>
  );
};

export default Filter;
