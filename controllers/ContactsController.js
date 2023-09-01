const ContactsModel = require("../schemas/Contacts")
const asyncHandler = require('express-async-handler')




//@HTTP: GET method
//@url: /api/contacts
//@info: to get all contacts
const getContacts = asyncHandler(async (req, res) => {
    try {
        const contact = await ContactsModel.find({})
        console.log('fetched all contacts')
        res.status(200).json(contact)
    }catch(err){
        console.log('failed to fetch contacts')
        res.status(500)
        throw new Error(err.message) 
    }
})

//@HTTP: GET method
//@url: /api/contacts/:id
//@info: to get a contact by id
const getContact = asyncHandler(async (req, res) => {
    try {
        const contact = await ContactsModel.findById(req.params.id)
        console.log(`found contact - ${contact.name}`)
        res.status(200).json(contact)
    }catch(err){
        console.log(`failed to find contact`)
        res.status(500)
        throw new Error(err.message)
    }
})

//@HTTP: POST method
//@url: /api/contacts
//@info: to create a new contact
const createContact = asyncHandler((req, res) => {
    let { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }
    try {
        (async () => {
            const contact = await ContactsModel.create(req.body)
            res.status(201).json(contact)
        })()
    } catch (err) {
        res.status(500)
        throw new Error(err.message)
    }
})

//@HTTP: PUT method
//@url: /api/contacts/:id
//@info: to update a contact
const updateContact = asyncHandler(async (req, res) => {
    try {
        const contact = await ContactsModel.findByIdAndUpdate(req.params.id, req.body)
        console.log(`updated`)
        getContact(req, res)

    }catch(err){
        console.log(`failed to update`)
        res.status(500)
        throw new Error(err.message)
    }
})

//@HTTP: DELETE method
//@url: /api/contacts/:id
//@info: to delete a contact
const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await ContactsModel.findByIdAndDelete(req.params.id)
        console.log(`deleted contact - ${contact.name}`)
        res.status(200).json(contact)
    }catch(err){
        console.log(`failed to delete contact`)
        res.status(500)
        throw new Error(err.message)
    }
})

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }