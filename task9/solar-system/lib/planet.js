const Planet = function()
{
    this.name = null;
    this.planetName = null;
    this.planetDescription = null;
    this.points = [];
    this.facts = [];

    this.addPoint = (top, left, text) => {
        this.points.push({top: `${top}%`, left: `${left}%`, text: text});
    }

    this.addFact = (name, value, nameColor, valueColor) => {
        this.facts.push({name: name, value: value, nameColor: nameColor, valueColor: valueColor});
    }
}

module.exports = Planet;