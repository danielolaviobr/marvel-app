import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import md5 from "md5";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, search } = req.query;
  const offset = 20 * (Number(page) - 1) || 0;

  let searchQuery: string;

  if (search) {
    const searchText = search as string;
    searchQuery = `&name=${searchText.replace(/\s/g, "%20")}`;
  }

  const apiKey = process.env.MARVEL_API_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;

  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + apiKey);

  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&offset=${offset}${
      search ? searchQuery : ""
    }`
  );

  if (response) {
    res.statusCode = 200;
    res.json(response.data.data);
  } else {
    res.statusCode = 500;
    res.json({ message: "Internal Server Error" });
  }
};
