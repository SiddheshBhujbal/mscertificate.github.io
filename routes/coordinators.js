const express = require('express');
const router = express.Router();
const { Coord, validateCoord } = require('../model/coordinator')

router.get('/', async (req, res) => {
    const coords = await Coord.find()
                              .sort('firstName')
    res.send(coords);
    })

router.get('/:id', async(req, res) => {
    const coord = await Coord.findById(req.params.id);
    if(!coord) return res.status(404).send('Requested coordinator details not found ...')
    res.send(coord);
    })

router.post('/', async (req, res) => {
    const { error } = validateCoord(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const coord = new Coord({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        portfolio: req.body.portfolio,
    })

    await coord.save();
    
    res.send(coord)

})

router.put('/:id', async (req, res) => {
    const coord = await Coord.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        portfolio: req.body.portfolio
    }, { new: true });

    if(!coord) return res.status(404).send('Requested coordinator details not found ...')

    res.send(coord)

})

router.delete('/:id', async (req, res) => {
    const coord = await Coord.findByIdAndRemove(req.params.id);
    if(!coord) return res.status(404).send('Requested coordinator details not found ...')
    res.send(coord)
} )

module.exports = router