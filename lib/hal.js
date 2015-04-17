var Hal = function(object) {
    if (!object) {
        throw new Error('JSON object cannot be null');
    }

    this.json = object;
    this.json._links = new Object();
};

Hal.prototype.addLink = function(rel, value) {
    this.json._links[rel] = value;
};

module.exports = Hal;