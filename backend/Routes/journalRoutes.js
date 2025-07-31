const express = require('express');
const router = express.Router();
const journalController = require('../Controllers/journalController');
const upload = require('../Middleware/upload');

router.post('/addJournal', upload.single('img'), journalController.addJournal);
router.get('/getJournals', journalController.getJournals);
router.get('/getJournalWithBlogs/:id', journalController.getJournalWithBlogs);
router.put('/updateJournal/:id', upload.single('img'), journalController.updateJournal);
router.delete('/deleteJournal/:id', journalController.deleteJournal);

module.exports = router;
