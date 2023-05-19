const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./Routes/indexRouter');
const app = express();

app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());

const server = app.listen(app.get('port'), () => {
    const { address, port } = server.address()
  console.log(`Servidor escuchando en http://${address}:${port}`)
});

function stopServer() {
    server.close(() => {
        console.log("Servidor cerrado");
    })
}

app.use("/api", router)

module.exports = {app, stopServer};