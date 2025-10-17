const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const User = require('../models/user');

// Middleware d'authentification admin
const adminMiddleware = (req, res, next) => {
    if (!req.session.userId || !req.session.isAdmin) {
        return res.redirect('/auth/login');
    }
    next();
};

router.use(adminMiddleware);

// Dashboard admin
router.get('/dashboard', async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('auteur', 'nom')
            .populate('reponses.auteur', 'nom')
            .sort({ date: -1 });
        res.render('admin/dashboard', { questions });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Une erreur est survenue' });
    }
});

// Répondre à une question (admin)
router.post('/question/:id/repondre', async (req, res) => {
    try {
        const { contenu } = req.body;
        const question = await Question.findById(req.params.id);
        
        question.reponses.push({
            auteur: req.session.userId,
            contenu
        });
        
        await question.save();
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Une erreur est survenue' });
    }
});

// Ajouter un exercice
router.post('/exercice', async (req, res) => {
    try {
        const { contenu, option } = req.body;
        const exercice = new Question({
            auteur: req.session.userId,
            option,
            contenu,
            type: 'exercice'
        });
        await exercice.save();
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Une erreur est survenue' });
    }
});

module.exports = router;