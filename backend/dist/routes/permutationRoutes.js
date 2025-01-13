"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permutationService_1 = require("../services/permutationService");
const router = (0, express_1.Router)();
router.post('/simplify-permutation', (req, res) => {
    const { cycles } = req.body;
    console.log(cycles);
    try {
        const result = (0, permutationService_1.decomposePermutation)(cycles);
        res.json({ result });
    }
    catch (error) {
        res.status(500).json({ message: 'Error processing cycles', error });
    }
});
exports.default = router;
