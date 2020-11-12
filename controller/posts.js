const db = require("../db");
const fs = require("fs");

// exports.createPost = (req, res, next) => {
//   if (req.method == "POST") {
//     let content = req.body.content;
//     let user_id = req.body.user_id;
//     if(req.file) {
//         var imageUrl = `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`;
//     } else {
//         var imageUrl = "";
//     }
//     // let id = res.locals.id

//     let reqCreatePost = "INSERT INTO Posts (content, imageUrl, post_create, user_id) VALUES ('" +content + "', '" + imageUrl + "', NOW(), '" + user_id + "')";
//     db.query(reqCreatePost, function(err, result) {
//       if (result) {
//         res.status(200).json({ result });
//       } else {
//         res.status(403).json({ err });
//       }
//     });
//   }
// };
