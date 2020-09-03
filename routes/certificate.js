const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const { Coord } = require('../model/coordinator');
const _ = require('lodash');
const JIMP = require('jimp');


router.get('/', async (req, res) => {
    await res.render('oldForm')
})

router.post('/getCertificate', async (req, res) => {
    const incomingCoord = {
        firstName: _.capitalize(_.trim(req.body.firstName)),
        lastName: _.capitalize(_.trim(req.body.lastName)),
        portfolio: _.startCase(_.trim(req.body.portfolio))
    }

    const foundCoord = await Coord.findOne(incomingCoord)
                                  .select("firstName lastName portfolio -_id");
    if(!foundCoord) return res.redirect('/certificate/error')
    const fullName = `${ foundCoord.firstName } ${ foundCoord.lastName }`;
    const _portfolio = ` ${ foundCoord.portfolio } Coordinator`;
    generateCertificate(fullName, _portfolio);
    res.redirect('/certificate/success')
    
})

router.get('/error', (req, res) => {
    res.render('error')
})

router.get('/success', (req, res) => {
    res.render('success')
})

router.get('/download', (req, res) => {
        console.log('Done ...');
        res.download('./image/mindspark.jpg')
})

function generateCertificate(fullName, portfolio){
    JIMP.read('./image/mindsparkCert.jpg')
        .then( certificate => {
            JIMP.loadFont('./public/font/font.fnt')
                .then(font => {
                    certificate.print(
                        font,
                        563,
                        570,
                        {
                            text: fullName,
                            alignmentX: JIMP.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: JIMP.VERTICAL_ALIGN_MIDDLE
                        },
                        593,
                        39
                    )
                    certificate.print(
                        font,
                        479,
                        683,
                        {
                            text: portfolio,
                            alignmentX: JIMP.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: JIMP.VERTICAL_ALIGN_MIDDLE
                        },
                        769,
                        35
                    )
                    certificate
                        .write('./image/mindspark.jpg')
                })
                .catch( err => console.log(err))
        } )
        .catch( err => console.log(err) )

}

module.exports = router;