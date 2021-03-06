
var DIRECTION = { up: "up", down: "down", left: "left", right: "right" };



class Snake {
    constructor(len, maxX=null,maxY=null, minX=null, minY=null) {
        this.len = len;
        this.head = { direction: DIRECTION.right, x: 0, y: 0 };
        this.body = [];
        this.maxX = maxX;
        this.maxY = maxY;
        this.minX=minX;
        this.minY=minY;
        for(let i in range(len))
        {
            this.grow();
        }

    }
    
    isTickPossible()
    {
        let nextHead = {x : this.head.x +  this.directionToOffset(this.head.direction).x,
        y: this.head.y + this.directionToOffset(this.head.direction).y};

        if(this.maxX!=null && nextHead.x>=this.maxX) return false;
        if(this.maxY!=null && nextHead.y>=this.maxY) return false;
        if(this.minY!=null && nextHead.y<this.minY) return false;
        if(this.minX!=null && nextHead.x<this.minX) return false;

        for(let i=0; i<this.body.length; i++ )
        {
            let el = this.body[i];
            if(el.x==nextHead.x && el.y==nextHead.y)
            {
                console.log("collision");
                return false;
            }
        }
        return true;
    }



    turnLeft(){if(this.head.direction!=DIRECTION.right) this.head.direction=DIRECTION.left;}
    turnRight(){if(this.head.direction!=DIRECTION.left)this.head.direction=DIRECTION.right;}
    turnUp(){if(this.head.direction!=DIRECTION.downt)this.head.direction=DIRECTION.up;}
    turnDown(){if(this.head.direction!=DIRECTION.up)this.head.direction=DIRECTION.down;}

    tick()
    {

        if(!this.isTickPossible()) return false;

        this.head.x += this.directionToOffset(this.head.direction).x;       
        this.head.y += this.directionToOffset(this.head.direction).y;

        // first body el inherits from head, rest from previous
        
        for(let i=this.body.length-1; i >= 0; i--)
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
        return true;
    }
    grow() {
        if (this.body.length == 0) {
            this.body.push({
                direction: this.head.direction,
                x: this.head.x - this.directionToOffset(this.head.direction).x,
                y: this.head.y - this.directionToOffset(this.head.direction).y
            }
            );
        }
        else {
            this.body.push({
                direction: this.body.slice(-1)[0].direction,
                x: this.body.slice(-1)[0].x - this.directionToOffset(this.body.slice(-1)[0].direction).x,
                y: this.body.slice(-1)[0].y - this.directionToOffset(this.body.slice(-1)[0].direction).y
            }
            );

        }
    }
    directionToOffset(dir) {
        switch (dir) {
            case DIRECTION.up:
                return { x: 0, y: -1 };
            case DIRECTION.down:
                return { x: 0, y: +1 };
            case DIRECTION.right:
                return { x: 1, y: 0 };
            case DIRECTION.left:
                return { x: -1, y: 0 };
            default:
                console.log("directionToOffset bad argument: " + toString(dir));
        }
    }

}

