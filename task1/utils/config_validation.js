exports.config_valid = function(config){
    return containsOnly(["C0", "C1", "A", "R0", "R1"], config.split("-"));
}
//edit config validation
function containsOnly(array1, array2){ //taken from stackoverflow
    return array2.every(elem => array1.includes(elem))
}