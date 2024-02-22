const mongoose = require('mongoose');

const product = new mongoose.Schema({

    productId: {
        type : Number,
        require : true,
        unique: [true, 'This product id is already exists.']
    },
    productName : {
        type : String,
        require:  true
    },
    qty : {
        type : Number,
        require : true
    },
    description : {
        type : String
    },
    productImage : {
        type : String,
        require : true
    },
    price:{
        type : Number,
        require : true
    }, 
},{
    timestamps: true,
  }
);

module.exports = mongoose.model("product", product);