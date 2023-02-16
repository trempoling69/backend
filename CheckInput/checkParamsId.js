exports.checkParamsId = (req, res, callback) => {
    idPlante = new Map([])
    id = parseInt(req.params.id)
    if(isNaN(id)){
        res.send("STOPPPPPPOCNVVJKDSVNVNJKQS")
    }else{
        idPlante.set("id", id)
        callback(idPlante)
    }
}