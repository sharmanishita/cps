"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Prerequisite_1 = __importDefault(require("../models/Prerequisite"));
const router = express_1.default.Router();
// Dummy prerequisite generation function
function generatePrerequisites(topic) {
    const map = {
        'Binary Trees': ['Trees', 'Recursion'],
        'Graphs': ['DFS', 'BFS'],
        'Dynamic Programming': ['Recursion', 'Memoization'],
    };
    return map[topic] || ['Basics of Programming'];
}
// GET /api/prerequisite/:topic
router.get('/:topic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic } = req.params;
    try {
        let prereq = yield Prerequisite_1.default.findOne({ topic });
        if (!prereq) {
            const prerequisites = generatePrerequisites(topic);
            prereq = new Prerequisite_1.default({ topic, prerequisites });
            yield prereq.save();
        }
        res.json({ prerequisites: prereq.prerequisites });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
