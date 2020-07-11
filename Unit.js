class Unit
{
    constructor(twitchName, color)
    {
        this.twitchName = twitchName;
        this.color = color;
        this.size = 10;

        this.x = 0;
        this.y = 0;
        this.velocity = {
            x: 0,
            y: 0
        };

        this.targetDestination = {
            x: 0,
            y: 0
        };
    }
}