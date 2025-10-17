const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Page de connexion
router.get('/login', (req, res) => {
    res.render('login');
});

// Traitement de la connexion
router.post('/login', async (req, res) => {
    try {
        const { matricule, password } = req.body;
        const user = await User.findOne({ matricule });

        if (!user || !(await user.comparePassword(password))) {
            return res.render('login', { error: 'Matricule ou mot de passe incorrect' });
        }

        req.session.userId = user._id;
        req.session.userOption = user.option;
        req.session.isAdmin = user.isAdmin;

        if (user.isAdmin) {
            res.redirect('/admin/dashboard');
        } else if (user.option === 'cybersecurite') {
            res.redirect('/cyber');
        } else {
            res.redirect('/genie');
        }
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Une erreur est survenue' });
    }
});

// Déconnexion
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;