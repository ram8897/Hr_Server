const express = require('express');
const router = express();
const morgan = require('morgan');
router.use(morgan('tiny'));
const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/ContactsController')


// router.get('/', getContacts).post(createContact)

router.route('/')
    .get(getContacts)
    .post(createContact)

router.route('/:id')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact)

module.exports = router