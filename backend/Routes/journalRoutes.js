const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

router.post('/addJournal', journalController.addJournal);
router.get('/getJournals', journalController.getJournals);
router.get('/getJournalWithBlogs/:id', journalController.getJournalWithBlogs);

module.exports = router;
