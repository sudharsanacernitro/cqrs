const express=require('express');
const app=express();

const productRoutes=require('./routes/productRoutes');

const {sequelize} = require('./config/mysql');

const {initKafka}=require('./config/kafka');
const {initRedis}=require('./config/redis');

const port=5000;


app.use(express.json());
app.use("/prod",productRoutes)


async function init()
{
    await initKafka();
    await initRedis();
    
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL');

    await sequelize.sync(); 

    app.listen(port,() => {
         console.log(`Server is running on port :${port}`);
    });
}

init();