import { range } from "./utils.js"

var DIRECTION = { up: "up", down: "down", left: "left", right: "right" };

class Snake {
    constructor(len) {
        this.len = len;
        this.head = { direction: DIRECTION.right, x: 0, y: 0 };
        this.body = [];
        for(i in range(len))
        {
            this.grow();
        }

    }
    tick()
    {
        this.head.x += this.directionToOffset(this.head.direction).x;       
        this.head.y += this.directionToOffset(this.head.direction).y;

        // first body el inherits from head, rest from previous
        for(let i=0; i < this.body.length; i++)
        {
            if(i==0)
            {
                this.body[i].x += this.directionToOffset(this.body[i].direction).x;
                this.body[i].y += this.directionToOffset(this.body[i].direction).y;
                this.body[i].direction = this.head.direction;
            }
            else
            {
                this.body[i].x += this.directionToOffset(this.body[i].direction).x;
                this.body[i].y += this.directionToOffset(this.body[i].direction).y;
                this.body[i].direction = this.body[i-1].direction;
            }
        }
    }
    grow() {
        if (this.body.length == 0) {
            this.body.push({
                direction: this.head.direction,
                x: this.head.x - directionToOffset(this.head.direction).x,
                y: this.head.y - directionToOffset(this.head.direction).y
            }
            );
        }
        else {
            this.body.push({
                direction: this.body.slice(-1)[0].direction,
                x: this.head.x - directionToOffset(this.body.slice(-1)[0].direction).x,
                y: this.head.y - directionToOffset(this.body.slice(-1)[0].direction).y
            }
            );

        }
    }
    directionToOffset(dir) {
        switch (dir) {
            case up:
                return { x: 0, y: 1 };
            case down:
                return { x: 0, y: -1 };
            case right:
                return { x: 1, y: 0 };
            case left:
                return { x: -1, y: 0 };
            default:
                console.log("directionToOffset bad argument: " + toString(dir));
        }
    }

}