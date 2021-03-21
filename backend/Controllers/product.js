const Products = require('../Models/product')
const Category = require('../Models/category')
const User = require('../Models/user')
const Admin = require('../Models/admin')

exports.addCategory = (req, res) => {
    const username = req.body.username;
    Admin.find({username:username})
    .then(response=>{
            console.log(response[0])
            if(response){
                const categoryObj = new Category(
                    {
                        Name : req.body.name,
                        image : req.body.image,
                        description : req.body.description
                    }
                ) 
                categoryObj.save()
                .then(resp => { res.status(200).json({ message: 'Category Added Successfully', products: resp }) })
                .catch(err => console.log(err))
            }
            
        }        
    )    
}

exports.manageCategory = (req, res) => {
    const username = req.body.username;
    Admin.find({username:username})
    .then(response=>{
            console.log(response[0])
            if(response){
                Category.updateOne({Name:req.body.name},{
                    Name : req.body.name,
                    image : req.body.image,
                    description : req.body.description
                })
                .then(resp => { res.status(200).json({ message: 'Category updated Successfully', products: resp }) })
                .catch(err => console.log(err))
            }
           
        }        
    )    
}

exports.addProduct = (req,res) => {
    const username = req.body.username;
    User.find({username:username})
    .then(response=>{
            console.log(response[0])
            if(response[0]){
                const d =Date.now();
                const b =new Date(d)

                const productObj = new Products({
                    Name : req.body.Name,
                    MRP : req.body.mrp,
                    Model_No : req.body.modelNo,
                    Company: req.body.Company,
                    Barcode:req.body.Barcode,
                    Category:req.body.Category,
                    img : req.body.img,
                    product_desc : req.body.product_desc,
                    adminBoughtOn: b,
                })

                productObj.save()
                .then(resp => { res.status(200).json({ message: 'Product Added Successfully', products: resp }) })
                .catch(err => console.log(err))
            }
            
        }        
    ) 
}

exports.manageProduct = (req, res) => {
    const username = req.body.username;
    const barcode = req.body.Barcode;
    const agentNamePurchased = req.body.agentNamePurchased;
    const agentPurchasedDate = req.body.agentPurchasedDate;
    const agentSoldDate = req.body.agentSoldDate;
    payload = {}
    User.find({username:username})
    .then(response=>{
            console.log(response[0])
            if(response[0].userType=="Admin"){
                if(barcode){
                    payload = {barcode:barcode}
                }
                if(agentNamePurchased && agentPurchasedDate){
                    payload = {agentPurchasedDate:agentPurchasedDate, agentNamePurchased:agentNamePurchased}
                }
                if(agentSoldDate){
                    payload = {agentSoldDate:agentSoldDate}
                }

                Products.updateOne({Name:req.body.Name},payload)
                .then(resp => { res.status(200).json({ message: 'Product updated Successfully', products: resp }) })
                .catch(err => console.log(err))
            }
            else if(response[0].userType=="Agent"){
                if(agentSoldDate){
                    payload = {agentSoldDate:agentSoldDate}
                }
                Products.updateOne({Name:req.body.Name},payload)
                .then(resp => { res.status(200).json({ message: 'Product updated Successfully', products: resp }) })
                .catch(err => console.log(err))

            }
        }        
    )    
}



exports.getCategories = (req,res) => {
    const username = req.body.username;
    User.find({username:username})
    .then(response=>{
            console.log(response)
            if(response.length!=0){
                Category.find({Name:{$in:response[0].categories}})
                .then(resp => {console.log(resp); { res.status(200).json({ message: 'Categories Found Successfully', categories: resp, length:response.length }) }})
                .catch(err => console.log(err))
            }
            else{
                Category.find()
                .then(resp => { res.status(200).json({ message: 'Categories Found Successfully', categories: resp , length:response.length }) })
                .catch(err => console.log(err))
            }
        }        
    )
}



exports.getProductByCategory = (req, res) => {
    const category = req.body.category;
    console.log(category)
    Products.find({Category:category})
        .then(response => { res.status(200).json({ message: 'Products Found Successfully', products: response, length:response.length }) })
        .catch(err => console.log(err))
}

exports.getProductByName = (req, res) => {
    console.log("Hello")
    const fname = req.params.name;
    const name = fname.replace('%20',' ')
    Products.find({Name:name})
        .then(response => { res.status(200).json({ message: 'Products Found Successfully', products: response }) })
        .catch(err => console.log(err))
}

exports.getProductStockWithUser = (req,res) => {
    const username = req.body.username;
    User.find({username:username})
    .then(response=>{
            console.log(response)
            if(response[0].userType=="Agent"){
                Products.find({agentNamePurchased:response[0].username})
                .then(resp => {console.log(resp); { res.status(200).json({ message: 'Products Found Successfully', products: resp }) }})
                .catch(err => console.log(err))
            }
            
        }        
    ) 
}

exports.requestProduct = (req,res) => {
    const username = req.body.username;
    const product = req.body.name
    const quantity = req.body.quantity;
    Products.find({Name:product,agentNamePurchased:null}).limit(quantity)
    .then(resp=>{
        const d = Date.now();
        const b = new Date(d);
        console.log(resp)
        var t=1;
        for(let i=0;i<resp.length;i++){
            var id = resp[i]._id;
            Products.updateOne({_id:id},{agentNamePurchased:req.body.username,agentPurchasedDate:b})
            .then(ress=>{if(ress){t=1}}
            )
            .catch(err=>{if(err){t=0}})
        }
        if(t==1){
            res.status(200).json({message:`Products Succesfully Added to Agent ${username}'s Inventory`})
        }
    })
    


}

exports.getAdminStock = (req,res) => {
    const username = req.body.username;
    const sold = req.body.sold;
    Admin.find({username:username})
    .then(response=>{
            console.log(response)
            if(sold=="Sold"){
                Products.find({adminBoughtOn:{$ne:null},agentPurchasedDate:{$ne:null} })
                .then(resp => { res.status(200).json({ message: 'Products Found Successfully', products: resp, length:resp.length }) })
                .catch(err => console.log(err))
            }
            else if(sold=="Unsold"){
                Products.find({agentNamePurchased:null })
                .then(resp => { res.status(200).json({ message: 'Products Found Successfully', products: resp, length:resp.length }) })
                .catch(err => console.log(err))
            }
            else{
                Products.find({adminBoughtOn:{$ne:null}})
                .then(resp => { res.status(200).json({ message: 'Products Found Successfully', products: resp, length:resp.length }) })
                .catch(err => console.log(err))
            }
        }    
    ) 
}

exports.manageUser = (req,res) => {
    const username = req.body.username;
    const updateUserName = req.body.updateUserName;
    const categories = req.body.categories;

    User.find({username:username})
    .then(response=>{
            console.log(response[0])
            if(response[0].userType=="Admin"){
                
                User.updateOne({username:updateUserName},{userType:"Admin",categories:categories})
                .then(resp => { res.status(200).json({ message: 'Agent Added Successfully', products: resp }) })
                .catch(err => console.log(err))
            }
            else if(response[0].userType=="Agent"){
                res.status(401).json({ message: 'Not Allowed', products: resp }) 
            }
        }        
    ) 
}


exports.getProducts = (req,res) => {
    const username = req.body.username;
    User.find({username:username})
    .then(response=>{
            console.log(response)
            if(response.length!=0){
                Products.aggregate([
                    {"$match":{Category:{$in:response[0].categories}}},
                    {"$group":{_id:"$Name", products:{$push:"$_id"} , count: { $sum: 1 }}}
                 ])
                .then(resp => {
                    eok = []
                    for(let i=0;i<resp.length;i++){
                        if(resp[i].count<=3){
                            eok.push(resp[i])
                        }
                    }
                    res.status(200).json({ message: 'Products Found Successfully', products: resp, eok:eok }) })
                .catch(err => console.log(err))
            }
            else{
                Products.aggregate([
                    {"$group":{_id:"$Name", count: { $sum: 1 }}}
                    ])
                .then(resp => { 
                    eok = []
                    for(let i=0;i<resp.length;i++){
                        if(resp[i].count<=3){
                            eok.push(resp[i])
                        }
                    }
                    res.status(200).json({ message: 'Products Found Successfully', products: resp, eok:eok })
                    })
                .catch(err => console.log(err))
            }
        }        
    )
}

exports.getTodaysSale = (req,res) => {
    const username = req.body.username;
    const date = req.body.date;
    User.find({username:username})
    .then(response=>{
            console.log(response)
            if(response[0].userType=="Admin"){
                Products.find({agentPurchasedDate:{$ne:null},})
                .then(resp => { res.status(200).json({ message: 'Products Found Successfully', products: resp }) })
                .catch(err => console.log(err))
            }
            else if(response[0].userType=="Agent"){
                Products.find({agentNamePurchased:response[0].username,agentPurchasedDate:date})
                .then(resp => {console.log(resp); { res.status(200).json({ message: 'Products Found Successfully', products: resp }) }})
                .catch(err => console.log(err))
            }
        }        
    ) 
}

exports.getTotalSale = (req,res) => {
    const username = req.body.username;
    User.find({username:username})
    .then(response=>{
            console.log(response)
            if(response[0]){
                Products.find({agentNamePurchased:response[0].username})
                .then(resp => {console.log(resp); { res.status(200).json({ message: 'Products Found Successfully', products: resp }) }})
                .catch(err => console.log(err))
            }
            else{
                Products.find({agentPurchasedDate:{$ne:null},})
                .then(resp => { res.status(200).json({ message: 'Products Found Successfully', products: resp }) })
                .catch(err => console.log(err))
                
            }
        }        
    ) 
}

    


exports.getWeeklySale = (req,res) => {
    
    const d = Date.now();
    const b = new Date(d);
    console.log(b);
    let w = b
    w.setDate(w.getDate() - 7);
    console.log(w)
   

    const username = req.body.username;
    User.find({username:username})
    .then(response=>{
            if(response[0].userType=="Admin"){
                Products.find({agentPurchasedDate:{$ne:null},adminBoughtOn:{$gt:b,$lt:w}})
                .then(resp => { res.status(200).json({ message: 'Products Found Successfully', products: resp }) })
                .catch(err => console.log(err))
            }
            else if(response[0].userType=="Agent"){
                Products.find({agentNamePurchased:response[0].username,agentPurchasedDate:{$lt:b,$gt:w}})
                .then(resp => {console.log(resp); { res.status(200).json({ message: 'Products Found Successfully', products: resp }) }})
                .catch(err => console.log(err))
            }
        }        
    ) 
}

