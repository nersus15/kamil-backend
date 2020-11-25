const AkunModel = require('../models/akun');
const model = new AkunModel;
class AkunController{
    register(req, res){
        let posts = req.body;
        model.register(posts, (hasil)=> {res.send(hasil)}, (err) => res.send(err));
    }
    getAkun(req, res){
        let filter = req.query;
        console.log(filter);
        model.getAkun(filter, (hasil)=> {res.send(hasil)}, (err) => res.send(err));
    }
}
module.exports = AkunController