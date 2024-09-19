"use script";

const app = require("../app");
const logger = require("../src/config/logger.js");

const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`${port} 포트에서 서버가 가동되었습니다.`);
});