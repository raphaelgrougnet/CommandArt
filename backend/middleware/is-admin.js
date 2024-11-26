module.exports = (req, res, next) => {
    if (!req.jwt.user.isAdmin) {
        return res.status(403).json({message : "Accès refusé."})
    }
    next()
}