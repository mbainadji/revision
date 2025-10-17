const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Middleware d'authentification
const authMiddleware = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }
    if (!req.session.isAdmin && req.session.userOption !== 'genie_logiciel') {
        return res.redirect('/auth/login');
    }
    next();
};

router.use(authMiddleware);

// Page principale génie logiciel
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find({ option: 'genie_logiciel' })
            .populate('auteur', 'nom')
            .populate('reponses.auteur', 'nom')
            .sort({ date: -1 });
        res.render('genie/index', { questions });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Une erreur est survenue' });
    }
});

// Poser une question
router.post('/question', async (req, res) => {
    try {
        const { contenu } = req.body;
        const question = new Question({
            auteur: req.session.userId,
            option: 'genie_logiciel',
            contenu
        });
        await question.save();
        res.redirect('/genie');
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Une erreur est survenue' });
    }
});

// Répondre à une question
router.post('/question/:id/repondre', async (req, res) => {
    try {
        const { contenu } = req.body;
        const question = await Question.findById(req.params.id);
        
        question.reponses.push({
            auteur: req.session.userId,
            contenu
        });
        
        await question.save();
        res.redirect('/genie');
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Une erreur est survenue' });
    }
});

module.exports = router;