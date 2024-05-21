import { useGetJobImagesQuery } from "../slices/jobApiSlice";
import Loader from "./Loader";

const JobDetailsManagerViewImages = ({ id }) => {
  const {
    data: images,
    isLoading,
    isError,
    isSuccess,
  } = useGetJobImagesQuery(id);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <p>Error fetching images</p>}
      {isSuccess && images.length > 0 ? (
        <>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className={`max-h-24 rounded-lg`}
            />
          ))}
        </>
      ) : (
        <p>No Images to show</p>
      )}
    </>
  );
};

export default JobDetailsManagerViewImages;
