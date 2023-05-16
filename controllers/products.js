const products =require('../models/product')

const getproducts= async(req,res)=>{
    const { featured, company, name, sort, fields, numericFilters } =req.query
    const queryobject={}
    if(featured){
        queryobject.featured =featured==='true'?true:false
    }
    if(company){
        queryobject.company =company
    }
    if(name){
        queryobject.name =name
    }


    let result =products.find(queryobject)
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
      } else {
        result = result.sort('rating')
      }
    

    const product =await result
    res.status(200).json({product})
   
}
const getproductsstatic= async(req,res)=>{
    const {featured,} =req.query
    const queryobject={}
    if(featured){
        queryobject.featured =featured==='true'?true:false
    }
    const product =await products.find({queryobject})
    res.status(200).json({product,nbHits:products.length})
}

module.exports={getproducts,getproductsstatic}