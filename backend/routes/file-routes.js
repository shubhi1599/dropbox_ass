import express from "express";
import {getFiles, deleteFile, updateFile} from '../controller/file-controller.js';

const router = express.Router();

router.get('/', getFiles);
router.delete('/delete/:id', deleteFile);
router.put('/:id', updateFile)

export default router;