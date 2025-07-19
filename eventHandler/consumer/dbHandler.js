const Product = require("../../models/readmodel/product");

// CREATE
const create = async (payload) => {
  try {
    const body = payload.DTO;
    const result = await Product.create(body);

    console.log("Product created in read DB:", result);
  } catch (error) {
    console.error("Error while creating product in read DB:", error, payload);
  }
};

// UPDATE
const update = async (payload) => {
  try {
    const body = payload.DTO;
    const filter = { productId: body.productId }; // Assumes `productId` is unique
    const result = await Product.findOneAndUpdate(filter, body, { new: true, upsert: true });

    console.log("Product updated in read DB:", result);
  } catch (error) {
    console.error("Error while updating product in read DB:", error, payload);
  }
};

// DELETE
const remove = async (payload) => {
  try {
    const productId  = payload.DTO._id;

    const result = await Product.deleteOne({ productId });

    if (result.deletedCount > 0) {
      console.log(`Product with ID ${productId} deleted from read DB.`);
    } else {
      console.warn(`No product found with ID ${productId} to delete.`);
    }
  } catch (error) {
    console.error("Error while deleting product from read DB:", error, payload);
  }
};

const handleEvent = async (payload) => {
  switch (payload.Operation) {
    case "create":
      await create(payload);
      break;
    case "update":
      await update(payload);
      break;
    case "delete":
      await remove(payload);
      break;
    default:
      console.warn("Unknown command received for Product read model:", payload.Command);
  }
};

module.exports = {
  create,
  update,
  remove,
  handleEvent,
};
