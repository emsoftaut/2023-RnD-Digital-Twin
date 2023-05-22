const dbStructure = {
    database: "factory_io",
    table: "machines",
    getPath: function() {return this.database + "/" + this.table + "/";}
}

module.exports = dbStructure;