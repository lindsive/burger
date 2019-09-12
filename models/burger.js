var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    insertOne: function(columns, values, cb) {
        orm.insertOne("burgers", columns, values, function(res) {
            cb(res);
        });
    },
    updateOne: function(columnValues, condition, cb) {
        orm.updateOne("burgers", columnValues, condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;