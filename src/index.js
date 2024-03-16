import init from "./init";
import app from "./utils/app";


init().then(() => {
    app.listen(8080, () => {
        console.log('Server is started on port 8080...');
    })
})