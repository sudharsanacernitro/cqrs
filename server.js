const express=require('express');
const app=express();

const productRoutes=require('./routes/productRoutes');

const {sequelize} = require('./config/mysql');

require('./config/kafka'); // To start kafka

const {initRedis,shutdownRedis}=require('./config/redis');

const port=5000;


app.use(express.json());
app.use("/prod",productRoutes)


async function init()
{
    await initRedis();
    
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL');

    await sequelize.sync(); 

    app.listen(port,() => {
         console.log(`Server is running on port :${port}`);
    });
}


init();