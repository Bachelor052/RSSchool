var cf = require("./config_validation.js")
var fv = require("./file_validation.js") 
 
module.exports = function get_args(args) {
    var error=[];
    args.replaceAllOccurrences("--config", "-c")
    args.replaceAllOccurrences("--input", "-i")
    args.replaceAllOccurrences("--output", "-o")
    var config, input, output

    if(args.includes("-c")){
        if(args.getDuplicates("-c").length > 1){
            var duplicated_config_index = args.getDuplicates("-c")
            var duplicated_config_error = []

            duplicated_config_index.forEach(i => {
                duplicated_config_error.push(args[i] +" "+ args[i + 1])
            });
            error.push("Config duplication: " + duplicated_config_error.join(" and "))
            config = false
        } else {
            if(!cf.config_valid(args[args.indexOf("-c") + 1])){
                error.push("Incorrect config params: '" + args[args.indexOf("-c")] + " " + args[args.indexOf("-c") + 1] + "'")
                config = false
            } else {
                config = args[args.indexOf("-c") + 1]
            }
        }
    }else{
        error.push("No config found.")
        config = false
    }
    
    if(args.includes("-i")){
        if(args.getDuplicates("-i").length > 1){
            var duplicated_input_index = args.getDuplicates("-i")
            var duplicated_input_error = []
            duplicated_input_index.forEach(i => {
                duplicated_input_error.push("'" + args[i] +" "+ args[i + 1] + "'")
            });
            error.push("Input file duplication: " + duplicated_input_error.join(" and "))
            input = false;
        } else {
            if(fv.file_valid(args[args.indexOf("-i")+1])){
                input = args[args.indexOf("-i")+1]
            } else {
                error.push("Input file doesn't exist: '" + args[args.indexOf("-i")] + " " + args[args.indexOf("-i") + 1] + "'")
                input = false
            }
        }
    } else {
        input = false
    }

    if(args.includes("-o")){
        if(args.getDuplicates("-o").length > 1){
            var duplicated_output_index = args.getDuplicates("-o")
            var duplicated_output_error = []
            duplicated_output_index.forEach(i => {
                duplicated_output_error.push("'" + args[i] +" "+ args[i + 1] + "'")
            });
            error.push("Output file duplication: " + duplicated_output_error.join(" and "))
            output = false
        } else {
            if(fv.file_valid(args[args.indexOf("-o")+1])){
                output = args[args.indexOf("-o")+1]
            } else {
                error.push("Output file doesn't exist: '" + args[args.indexOf("-o")] + " " + args[args.indexOf("-o") + 1] + "'")
                output = false
            }
            // var output_file_validation = fv.file_valid(args[args.indexOf("-o")+1], true)
            // if(output_file_validation){
            //     output = args[args.indexOf("-o")+1]
            // } else if (output_file_validation == -4058) {
            //     error.push("Output file doesn't exist: '" + args[args.indexOf("-o")] + " " + args[args.indexOf("-o") + 1] + "'")
            //     output = false
            // } else if (output_file_validation == -4048) {
            //     error.push("No permission to write to Output file: '" + args[args.indexOf("-o")] + " " + args[args.indexOf("-o") + 1] + "'")
            //     output = false
            // } else if (output_file_validation < 0) {
            //     error.push("Unknown error while trying to access the Output file: '" + args[args.indexOf("-o")] + " " + args[args.indexOf("-o") + 1] + "' with error code " + output_file_validation)
            // }
        }
    } else {
        output = false
    }
    

    
    return {config, input, output, error}
}

Array.prototype.replaceAllOccurrences = function(old_val, new_val){
    for (var i = 0; i < this.length; i++) {
        if(this[i] == old_val) {
            this[i] = new_val;
        }
    }
}

Array.prototype.getDuplicates = function (dup_val) { 
    var duplicates = [];
    for (var i = 0; i < this.length; i++) {
        if(this[i] == dup_val) {
            duplicates.push(i);
        }
    }
    return duplicates;
};