const { Category } = require('../models')

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        return res.status(200).json({categories: categories})
    }
    catch (err) {
        return res.status(500).json({message: 'Une erreur interne s\'est produite'});
    }
}

exports.createCategory = async (req, res, next) => {
    const { name } = req.body
    const regexNameCategory = /^[a-zA-Z0-9-_]{3,50}$/;

    if (!regexNameCategory.test(name)) {
        return res.status(400).json({message: "Le nom de la catégorie doit contenir entre 3 et 50 charactères alphanumériques."})
    }

    try {
        const categoryFound = await Category.findOne({ where: { name: name }})

        if (categoryFound) {
            return res.status(400).json({message : "Catégorie déja existante."})
        }

        await Category.create({
            name: name
        })

        const categorySaved = await Category.findOne({ where: { name: name }})

        return res.status(201).json({
            message: "Catégorie créée.",
            category: categorySaved
        })
    }
    catch (err) {
        return res.status(500).json({message: 'Une erreur interne s\'est produite'});
    }
}

exports.deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const category = await Category.findOne({ where: { id: id }})
        if (!category) {
            return res.status(404).json({message: "Catégorie introuvable."})
        }

        await category.destroy()

        return res.status(200).json({message: "Catégorie supprimée.", category: category})
    }
    catch (err) {
        return res.status(500).json({message: 'Une erreur interne s\'est produite'});
    }
}