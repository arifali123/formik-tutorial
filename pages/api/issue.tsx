import { NextApiRequest, NextApiResponse } from "next";

export default function IssueApi(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).json({ hi: "hi" });
}
