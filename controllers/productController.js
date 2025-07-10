
const {sequelize} = require('../config/mysql');

const Product = require('../writeModel/product')(sequelize);

const getById = async (req,res)=>{
    try{
        const prodId=req.params.id;

        const result= await Product.findByPk(prodId);
        if(!result)
        {
            return res.status(404).json({status:"Not found"});
        }
        return res.status(200).json(result.toJSON());
    }
    catch(error)
    {
        return res.status(500).json({status:"Internal server error"});
    }
}

const get = async(req,res) => {

    try{
        const result=await Product.findAll();
        return res.status(200).json({result:result});
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({status:"Internal server error"});
    }
}

const add = async (req, res) => {
  try {
    const body = req.body;
    const result = await Product.create(body);

    return res.status(200).json({
      status: "Product added successfully",
      product: result.toJSON()
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { id, newData } = req.body;

    const [updatedRows] = await Product.update(newData, { where: { id: id } });

    if (updatedRows === 0) {
      return res.status(404).json({ status: "Product not found or no changes made" });
    }

    const updatedProduct = await Product.findByPk(id);

    return res.status(200).json({
      status: "Product updated successfully",
      product: updatedProduct.toJSON()
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal server error" });
  }
};




const deleteProd = async(req,res)=> {
    try{

        const id=req.params.id;

         await Product.destroy({ where: { id: id} });

    }catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal server error" });
  }
}

module.exports={
    getById,
    get,
    add,
    update,
    deleteProd

}