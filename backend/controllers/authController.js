const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const validator = require('validator');

const { User } = require('../models');
const { Op } = require('sequelize');

exports.checkEmailExists = async (req, res, next) => {
    const {email} = req.body;
    User.findOne({ where : { email: email }})
        .then(user => {
            if (!user) {
                return res.status(200).json({message: 'Email non existant!'});
            }
            res.status(400).json({message: 'Email déjà utilisé!'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Une erreur interne s\'est produite'});
        });
}

exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        if (!user) {
            return res.status(401).json({message: 'Nom d\'utilisateur ou mot de passe incorrect!'});
        }
        const doMatch = await bcrypt.compare(password, user.password)

        if (doMatch) {
            const token = jwt.sign(
                {user: user},
                config.SECRET_JWT
            );
            res.status(200).json({
                token: token,
                user: user
            });
        } else {
            res.status(401).json({message: 'Nom d\'utilisateur ou mot de passe incorrect!'});
        }

    }
    catch (err) {
            console.log(err);
            res.status(500).json({message: 'Une erreur interne s\'est produite'});
    }
};

exports.register = async (req, res, next) => {
    const {email, username, password} = req.body;
    const nameRegex = /^[a-zA-Z0-9\-_ ]{3,50}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}$/;

    if (!validator.isEmail(email)) {
        return res.status(400).json({message: 'Le courriel doit être un courriel valide.'});
    }

    if (!nameRegex.test(username)) {
        return res.status(400).json({message: 'Le nom d\'utilisateur doit contenir entre 3 et 50 caractères alphanumériques.'});
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({message: 'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un symbole.'});
    }

    try {
        const userFound = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        })
        if (userFound) {
            return res.status(400).json({message: 'Un utilisateur existe déjà avec cet email ou nom d\'utilisateur.'});
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        await user.save();

        const userSaved = await User.findOne({
            where: {
                email: email,
                username: username
            }
        })

        const token = jwt.sign(
            {user: userSaved},
            process.env.SECRET_JWT
        );

        return res.status(201).json({
            message: 'Utilisateur créé!',
            user: userSaved,
            token: token
        });
    }
    catch (err) {
        return res.status(500).json({message: 'Une erreur interne s\'est produite'});
    }
};

