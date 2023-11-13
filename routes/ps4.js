const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
    res.send("What's up!")
})

module.exports = router;