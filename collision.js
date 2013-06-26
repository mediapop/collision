(function(exports){
    function Collidables(){
        this.items = [];

        this.add = function(obj){
            obj.push(obj);
        };

        this.remove = function(obj){
            items.splice(items.indexOf(obj), 1);
        };

        this.collide = function(){
            var collisions = this.colliding();

            for(var i=0; i<collisions.length; ++i){
                collisions[i][1].trigger('collide', collisions[i][0]);
                collisions[i][0].trigger('collide', collisions[i][1]);
            }
        };

        this.colliding = function(){
            var collisions = [];

            for(var i=0; i<items.length; ++i){
                var colliding = items[i];
                for(var y=i+1; y<items.length; ++y){
                    var collidable = items[y];
                    if(colliding.bounds().intersects(collidable.bounds())){
                        collisions.push([colliding, collidable]);
                    }
                }
            }

            return collisions;
        };
    }

    function BoundingBox(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.intersects = function(bounds){
            return (
                    (x1 >= bounds.x1 && x1 <= bounds.x2) ||
                    (x2 >= bounds.x1 && x2 <= bounds.x2)
                ) && (
                    (y1 >= bounds.y1 && y1 <= bounds.y2) ||
                    (y2 >= bounds.y1 && y2 <= bounds.y2)
                ) || (
                    (bounds.x1 >= x1 && bounds.x1 <= x2) ||
                    (bounds.x2 >= x1 && bounds.x2 <= x2)
                ) && (
                    (bounds.y1 >= y1 && bounds.y1 <= y2) ||
                    (bounds.y2 >= y1 && bounds.y2 <= y1)
                )
        };
    }

    function Collidable(options){
        this.bounds = options && options.bounds;

        var eventsManager = new EventsManager(this);
        this.on = eventsManager.on;
        this.off = eventsManager.off;
        this.trigger = eventsManager.trigger;
    }

    exports.Collidables = Collidables;
    exports.BoundingBox = BoundingBox;
    exports.Collidable = Collidable;
})(typeof exports === 'undefined' ? this['mymodule'] = {} : exports);


