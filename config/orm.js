var connection = require("../config/connection.js");

// For SQL query - make array of question marks and convert into a string
var questionMarkArr = (num) => {
    var arr = [];

    for (var i=0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
};

// Convert object key/value paris to SQL syntax
var toSQL = (ob) => {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
    };

    return arr.toString();
};

// Object containing SQL statement functions
var orm = {
    selectAll: function(input, cb) {
        var queryString = "SELECT * FROM " + input + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    },
    insertOne: function(tableName, columns, values, cb) {
        var queryString = "INSERT INTO " + tableName;

        queryString += " ("
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarkArr(values.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, values, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result)
        })
    },
    updateOne: function(tableName, columnValues, condition, cb) {
        var queryString = "UPDATE" + tableName;

        queryString += " SET ";
        queryString += toSQL(columnValues);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;
