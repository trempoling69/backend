exports.checkInputToggleDispo = (req, res, callback) => {
    valeursPossibleDispo = ["InStock", "OutStock"]
    toggleDispoInfo = new Map([])
    dispo = req.body.dispo.replace(/[<>]/g, "")
    id = parseInt(req.body.id)
    if(!valeursPossibleDispo.includes(dispo) || isNaN(id)){
        res.send("STOPPPPPPOCNVVJKDSVNVNJKQS")
    }else{
        toggleDispoInfo.set("id", id)
        toggleDispoInfo.set("dispo", dispo)
        callback(toggleDispoInfo)
    }

//     dispo: {
//         type: "string",
//         length: "20",
//         valeurs: ["InStock", "OutStock"],
//       }
}