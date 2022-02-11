const basketModel = require("../Model/basketModel")
const pantryModel = require("../Model/pantryModel")
const validator = require("../validator/validator")


const createBasket = async function (req, res) {
    try {
        const pantryId = req.params.pantryId
        const basketName = req.params.basketName
        const body = req.body
        const { basket } = body
        if (!validator.isValidObjectId(pantryId)) {
            return res.status(404).send({ status: false, messege: "The PantryId Is Invalid" })
        }
        if (!validator.isValid(basketName)) {
            return res.status(400).send({ status: false, message: "Please Provide A valid Basket Name That You Want To Create" })
        }
        let spacecheck = await basketModel.find({ pantryId: pantryId })
        if (spacecheck.length == 100) {
            return res.status(400).send({ status: false, messege: "Your Basket Is Over Loaded-100%full" })
        }
        let checkname = await basketModel.findOne({ basketName: basketName, pantryId: pantryId })
        if (checkname) {
            if (!basket) {
                return res.status(200).send({ status: true, messege: `Your Pantry Was Updated By Basket- ${basketName}`, Data: checkname })
            }
            let update = await basketModel.findOneAndUpdate({ basketName: basketName, pantryId: pantryId }, { basket: basket },{new:true})

            return res.status(201).send({ status: true, messege: `Your Pantry Was Updated By Basket ${basketName}`, update })

        }
        let present = await pantryModel.findOne({ _id: pantryId })
        if (!present) {
            return res.status(404).send({ status: false, messege: "Unable To Find The Pantry Detail" })
        }
        let data = { basketName: basketName, pantryId: pantryId, basket }
        let save = await basketModel.create(data)

        return res.status(201).send({ status: true, messege: `Your Pantry Was Updated By Basket ${basketName}`, save })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getBasket = async function (req, res) {
    try {
        const pantryId = req.params.pantryId
        const basketName = req.params.basketName
        if (!validator.isValidObjectId(pantryId)) {
            return res.status(404).send({ status: false, messege: "The PantryId Is Invalid" })
        }
        if (!validator.isValid(basketName)) {
            return res.status(400).send({ status: false, message: "Please Provide A valid Basket Name That You Want To Create" })
        }
        let checkbasket = await basketModel.findOne({ basketName: basketName, pantryId: pantryId }).select({ basket: 1, _id: 0 })
        if (!checkbasket) {
            return res.status(200).send({ status: true, messege: `Can't Find The Basket - ${basketName}` })
        }
        return res.status(200).send({ status: true, messege: "Here's Your Basket !", Data: checkbasket })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const updateBasket = async function (req, res) {
    try {
        const pantryId = req.params.pantryId
        const basketName = req.params.basketName
        const body = req.body
        const { basket } = body
        if (!validator.isValidRequestBody(body)) {
            return res.status(400).send({ status: false, messege: "Please Provide The Credential That You Need To Udate" })
        }
        if (!validator.isValidObjectId(pantryId)) {
            return res.status(404).send({ status: false, messege: "The PantryId Is Invalid" })
        }
        if (!validator.isValid(basketName)) {
            return res.status(400).send({ status: false, message: "Please Provide A valid Basket Name That You Want To Create" })
        }
        let check = await basketModel.findOne({ pantryId: pantryId, basketName: basketName })
        if (!check) {
            return res.status(404).send({ status: false, messege: "Unable To Find The Details" })
        }
        let temp = check.basket
        for (let [key, value] of Object.entries(basket)) {
            temp[key] = value
        }
        let updateBasket = await basketModel.findOneAndUpdate({ pantryId: pantryId, basketName: basketName }, { basket: temp },{new:true}).select({ basket: 1, _id: 0 })
        return res.status(200).send({ status: true, messege: `Your Basket ${basketName} Updated Successfully`, Data: updateBasket })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const deleteBasket = async function (req, res) {
    try {
        const pantryId = req.params.pantryId
        const basketName = req.params.basketName
        if (!validator.isValidObjectId(pantryId)) {
            return res.status(404).send({ status: false, messege: "The PantryId Is Invalid" })
        }
        if (!validator.isValid(basketName)) {
            return res.status(400).send({ status: false, message: "Please Provide A valid Basket Name That You Want To Create" })
        }

        await basketModel.findOneAndDelete({ pantryId: pantryId, basketName: basketName })
        return res.status(200).send({ status: true, messege: `${basketName} Basket Has Been Deleted Successfully` })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { createBasket, getBasket, updateBasket, deleteBasket }