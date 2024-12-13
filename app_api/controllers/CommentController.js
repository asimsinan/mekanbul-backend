var mongoose=require("mongoose");
var Venue=mongoose.model("venue");

const createResponse=function(res,status,content){
    res.status(status).json(content);
}

const addComment=function(req,res){
    createResponse(res,"200",{"status":"Success"});
}

const deleteComment=function(req,res){
    createResponse(res,"200",{"status":"Success"});
}

const updateComment=function(req,res){
    createResponse(res,"200",{"status":"Success"});
}

const getComment = async function (req, res) {
    try {
        await Venue.findById(req.params.venueid)
            .select("name comments").exec().then(function (venue) {
                var response, comment;

                if (!venue) {
                    createResponse(res, "404", "Mekanid yanlış");
                } else if (venue.comments.id(req.params.commentid)) {
                    comment = venue.comments.id(req.params.commentid);
                    response = {
                        venue: {
                            name: venue.name,
                            id: req.params.id,
                        },
                        comment: comment,
                    };
                    createResponse(res, "200", response);
                } else {
                    createResponse(res, "404", "Yorum id yanlış");
                }
            });
    } catch (error) {
        createResponse(res, "404", "Mekan bulunamadı");
    }
};


module.exports={
    getComment,
    addComment,
    updateComment,
    deleteComment
}