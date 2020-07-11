class Board
{
	constructor(canvas, width, height)
    {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
					
		this.floodHeads = [];
		this.colors = [];
					
        this.units = [];

        //this is so we can find units quickly when a TTV user sends an action
        this.unitsByTwitchName = {};

        for (var i = 0; i < 250; i++)
        {
            var unit = new Unit(
                i.toString(),
                Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10)
            );

            unit.x = this.width / 2;
            unit.y = this.height / 2;

            unit.targetDestination.x = Math.floor(Math.random() * this.width);
            unit.targetDestination.y = Math.floor(Math.random() * this.height);

            this.addUnit(unit);
        }
    }

    addUnit(unit) {
        this.units.push(unit);
        this.unitsByTwitchName[unit.twitchName] = unit;
    }
				
	onTick()
    {
        var units = this.units;
        for (var i = 0; i < units.length; i++) {
            var unit = units[i];

            if (Math.abs(unit.x - unit.targetDestination.x) < 2 && Math.abs(unit.y - unit.targetDestination.y) < 2) {
                unit.targetDestination.x = Math.floor(Math.random() * this.width);
                unit.targetDestination.y = Math.floor(Math.random() * this.height);
            }

            unit.velocity.x = Math.ceil((unit.targetDestination.x - unit.x) / 2);
            unit.velocity.y = Math.ceil((unit.targetDestination.y - unit.y) / 2);

            unit.velocity.x = Math.sign(unit.velocity.x) * Math.min(1, Math.abs(unit.velocity.x));
            unit.velocity.y = Math.sign(unit.velocity.y) * Math.min(1, Math.abs(unit.velocity.y));

            unit.x += unit.velocity.x;
            unit.y += unit.velocity.y;

            if (unit.x < 0) {
                unit.x = 0;
                unit.velocity.x = -unit.velocity.x;
            }
            else if (unit.x >= this.width) {
                unit.x = this.width - 1;
                unit.velocity.x = -unit.velocity.x;
            }

            if (unit.y < 0) {
                unit.y = 0;
                unit.velocity.y = -unit.velocity.y;
            }
            else if (unit.y >= this.height) {
                unit.y = this.height - 1;
                unit.velocity.y = -unit.velocity.y;
            }
        }

        this.draw();
    }

    draw()
    {
        var that = this;
        var units = that.units;
        var context = that.canvas.getContext("2d");

        context.clearRect(0, 0, that.width, that.height);

        for (var i = 0; i < units.length; i++)
        {
            var unit = units[i];
            context.fillStyle = "#" + unit.color;
            context.fillRect(unit.x, unit.y, unit.size, unit.size);

            context.font = '24px serif';
            context.textAlign = 'center';
            context.textBaseline = 'bottom';
            context.fillText(unit.twitchName, unit.x + unit.size / 2, unit.y);
        }
    }
}