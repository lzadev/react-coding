import { useState, useEffect } from "react";

const CAT_IMAGE_BASE_URL = "https://cataas.com/cat";

export function useCatImage({ fact }) {
  const [imgId, setImgId] = useState("");

  //get random image cada vez que cambia el fact
  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ")[0];

    fetch(`${CAT_IMAGE_BASE_URL}/says/${firstWord}?size=50&color=red&json=true`)
      .then((res) => res.json())
      .then((response) => {
        setImgId(response._id);
      });
  }, [fact]);
  return { imageUrl: `${CAT_IMAGE_BASE_URL}/${imgId}` };
}
