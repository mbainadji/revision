require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const sequelize = require('./config/database');

const app = express();

// Configuration
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
    secret: 'ict4d_secret_key',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
}));

// Database connection and sync
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de données synchronisée');
    })
    .catch(err => {
        console.error('Erreur de synchronisation de la base de données:', err);
    });

// Routes
const authRoutes = require('./routes/auth');
const cyberRoutes = require('./routes/cyber');
const genieRoutes = require('./routes/genie');
const adminRoutes = require('./routes/admin');

app.use('/auth', authRoutes);
app.use('/cyber', cyberRoutes);
app.use('/genie', genieRoutes);
app.use('/admin', adminRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});