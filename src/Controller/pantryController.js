const basketModel = require("../Model/basketModel")
const pantryModel = require("../Model/pantryModel")
const validator = require("../validator/validator.js")

const createPantry = async function (req, res) {
    try {
        let data = req.body
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, messege: "Please Provide The Required Field To Go Forward" })
        }
        const { email, PantryName, description } = data

        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, messege: "Please Provide The Email Dig in" })
        }
        if (!validator.isValid(PantryName)) {
            return res.status(400).send({ status: false, messege: "Please Give A Name To Your Pantry !" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: `${email} should be a valid email address` })
        }
        if (description) {
            if (!validator.isValid(description)) {
                return res.status(400).send({ status: false, messege: "Please Give A Name To Your Pantry !" })
            }
        }
        let save = { name: PantryName, description }
        let store = await pantryModel.create(save)
        let PantryId = store._id
        return res.status(201).send({ status: true, messege: `Successfully Created The Pantry By Name- ${PantryName}`, pantryId: PantryId })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

const getPantry = async function (req, res) {
    try {
        let body = req.params.pantryId
        if (!validator.isValidObjectId(body)) {
            return res.status(404).send({ status: false, messege: "The PantryId Is Invalid" })
        }
        if (!validator.isValid(body)) {
            return res.status(400).send({ status: false, messege: "Please Provide The PantryId" })
        }
        let findpantry = await pantryModel.findById(body).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        if (!findpantry) {
            return res.status(404).send({ status: false, messege: "Unable To Find The Pantry Make Sure The PantryId Is Correct" })
        }
        let checkbasket = await basketModel.find({ pantryId: body }).select({ basketName: 1, expire: 1, _id: 0 })
        findpantry.baskets = checkbasket
        findpantry.percentFull = checkbasket.length
        return res.status(200).send({ status: true, messege: "Successfully Fetched Your Pantry Details", Data: findpantry })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//const update
module.exports = { createPantry, getPantry }