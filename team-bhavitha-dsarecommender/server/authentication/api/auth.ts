// api/[auth].ts
import app from "../src/main";
import serverless from "serverless-http";

export default serverless(app);
