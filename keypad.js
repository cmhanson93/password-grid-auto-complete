javascript:(function() {
    window.password = {};

    password.challenge = document.getElementById('dialogueStr');
    password.input = document.getElementById('response');
    password.submit = document.getElementById('SubmitButton');

    password.key = [
    "HFE47N40H3",   
    "M57FP27T21",   
    "0Q88642WJE",   
    "97RNE27X58",   
    "D7800XPC9K"    
    ];

    password.keygrid = [];

    password.key.forEach(function(row){
        password.keygrid.push(row.split(''));
    });

    password.lookup = function(key) {
        key = key.split('');
        var j = key[1].charCodeAt(0) - "1".charCodeAt(0);
        var i = key[0].charCodeAt(0) - "A".charCodeAt(0);
        return password.keygrid[j][i];
    };

    password.tokenize = function(copypasta) {
        var tokens = copypasta.match(/\[.*?\]/g);
        return tokens.map(function(token){
            return token.substring(1,3);
        });
    };

    password.getPW = function(keys) {
        return keys.reduce(function(accumulator, key){
            return accumulator + password.lookup(key);
        }, '');
    };

    password.validateKey = function(key) {
        if (key.length != 5)
            return false;
        for (var i = 0; i < key.length; i++)
            if (key[i].length != 10)
                return false;
        return true;
    };

    if (password.validateKey(password.key)) {
        var challenge = password.challenge.textContent;
        var keys = password.tokenize(challenge);
        password.input.value = password.getPW(keys);
    } else {
        alert('Invalid key grid. Please fix the file, compress, and reload into the bookmark.');
    }

})();