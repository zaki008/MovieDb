import { SET_LIST_SEARCH_MOVIE } from "@/redux/types/movieTypes";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const { movieSearch } = useSelector((state) => state.movieReducer);
  const router = useRouter();
  const dispatch = useDispatch();

  const debounced = useDebouncedCallback((value) => {
    dispatch({
      type: SET_LIST_SEARCH_MOVIE,
      value: { ...movieSearch, search: value, page: 1 },
    });
    router.push("/search");
  }, 1000);

  return (
    <div>
      <Input
        placeholder="input keyword"
        defaultValue={""}
        onChange={(e) => debounced(e.target.value)}
      />
    </div>
  );
};
export default Search;
