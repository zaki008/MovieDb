import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonMovie = () => {
  return (
    <Skeleton
      style={{ width: "100%", height: "350px", borderRadius: 20 }}
      className="mx-4 my-2"
      baseColor="#CCC"
    />
  );
};

export default SkeletonMovie;
