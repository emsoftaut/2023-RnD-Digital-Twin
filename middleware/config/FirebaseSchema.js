const dbStructure = {
    database: "factory_io",
    table: "data",
    getPath: function() {return this.database + "/" + this.table + "/";}
}

module.exports = dbStructure;