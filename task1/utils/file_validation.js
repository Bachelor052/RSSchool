const fs = require('fs')

exports.file_valid = function (path) {
    try{
        if(fs.existsSync(path)) return true
    }catch (err) {
    }
}
// exports.file_valid = function (path, write = false) {
//     fs.access(path, fs.constants.R_OK, (err,ads)=>{
//         console.log(err, ads)
//     })
//     if(write){
//         try {
//             fs.access(path, fs.constants.R_OK | fs.constants.W_OK) 
//             return true
//         } catch (error) {
//             if(error.errno == -4048){
//                 return -4048
//             } else if(error.errno == -4058){
//                 return false
//             }
//         }
//     } else {
//         try {
//             fs.access(path, fs.constants.R_OK) 
//             return true
//         } catch (error) {
//             return false
//         }
//     }

//     // try{
//     //     if(fs.existsSync(path)){
           
//     //     } 
//     // }catch (err) {
//     //     console.log(err.errno)
//     //     return false
//     // }
// }