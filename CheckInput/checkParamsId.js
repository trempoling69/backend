exports.checkParamsId = (req, res, callback) => {
    idMap = new Map([])
    id = parseInt(req.params.id)
    if(isNaN(id)){
        res.send("STOPPPPPPOCNVVJKDSVNVNJKQS")
    }else{
        idMap.set("id", id)
        callback(idMap)
    }
}