import { useState } from "react";

const ImageComponent = (props) => {
  const { notFoundSrc, src, ...imageAttributes } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...imageAttributes}
      src={imgSrc || notFoundSrc}
      onError={() => {
        setImgSrc(notFoundSrc);
      }}
      style={{transition:'400ms'}}
    />
  );
};
export default ImageComponent;
