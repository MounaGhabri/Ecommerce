const express = require('express');
const router = express.Router();
const SCategorie=require("../models/scategorie")
const {verifyToken} =require("../middlerware/verify-token")
router.get('/',verifyToken, async (req, res, )=> {
    try {
    const scat = await SCategorie.find();
    res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    }); 
router.post('/',verifyToken, async (req, res) => {
        const { nomscategorie, imagescat,categorieID} = req.body;
        const newscategorie = new SCategorie({nomscategorie:nomscategorie,
        imagescat: imagescat,categorieID:categorieID})
        try {
        await newscategorie.save();
        res.status(200).json(newscategorie );
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });
router.delete('/:scategorieId', async (req, res)=> {
            const id = req.params.scategorieId;
            await SCategorie.findByIdAndDelete(id);
            res.json({ message: "sous categorie deleted successfully." });
            });
router.put('/:scategorieId', async (req, res)=> {
                const { nomscategorie, imagescat} = req.body;
                const id = req.params.scategorieId;
                try {
                const scat1 = {
                nomscategorie:nomscategorie,imagescat:imagescat, _id:id };
                await SCategorie.findByIdAndUpdate(id, scat1);
                 res.json(scat1);
                } catch (error) {
                res.status(404).json({ message: error.message });
                }
                });
router.get('/:scategorieId',async(req, res)=>{
                    try {
                    const cat = await SCategorie.findById(req.params.scategorieId);
                    res.status(200).json(cat);
                    } catch (error) {
                    res.status(404).json({ message: error.message });
                    }
                    });




    module.exports = router;
