const {log} = console

function assert(condition, message){
    if(condition !== true)
        log(message);
}

export default assert;