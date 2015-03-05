var Hal = function(object) {
    if (!object) {
        throw new Error('JSON object cannot be null');
    }

    this.json = object;
    this.json._links = [];
};

Hal.prototype.addLink = function(rel, value) {
    this.json._links[rel] = { href: value };
};

module.exports = Hal;