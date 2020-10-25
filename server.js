require("dotenv").config();
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const { mongoURI } = require('./src/config/keys');
const { authRoutes, taskRoutes } = require('./src/routes');

const app = express();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
mongoose.connect(mongoURI, options)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.error(`Error connecting to mongo: ${error}.`));

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on PORT ${process.env.PORT}.`);
});
