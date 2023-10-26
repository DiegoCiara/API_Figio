import app from './app';
app.listen(process.env.CLIENT_PORT, () => console.log('Server on'));

// import app from './app';
// const https = require("https");
// import {readFileSync} from "fs"
// import {join} from "path"
// var privateKey = readFileSync(join(__dirname, "key.pem"));
// var certificate = readFileSync(join(__dirname, "cert.pem"));
// https
//   .createServer({
//     key: privateKey,
//     cert: certificate,
//   },app)
//   .listen(process.env.CLIENT_PORT, ()=>{
//     console.log('server on')
//   });

// Portas utilizadas:
// 3000 - Interna
