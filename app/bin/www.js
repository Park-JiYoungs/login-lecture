"use script";

const app = require("../app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("서버 가동");
});