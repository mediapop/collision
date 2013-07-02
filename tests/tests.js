var assert = require("assert");
var collision = require('../collision');

describe('BoundingBox', function(){
    describe('intersects', function(){
        it('should be true when top left & bottom right corner intersect.', function(){
            /* 11
             * 1o2
             *  22
             * */
            var box1 = new collision.BoundingBox(0,0,1,1);
            var box2 = new collision.BoundingBox(1,1,2,2);
            assert.equal(box1.intersects(box2), true);
            assert.equal(box2.intersects(box1), true);
        });
        it('should be true when top right & bottom left corner intersect.', function(){
            /*  11
             * 2o1
             * 22
             * */
            var box1 = new collision.BoundingBox(1,0,2,1);
            var box2 = new collision.BoundingBox(0,1,1,2);
            assert.equal(box1.intersects(box2), true);
            assert.equal(box2.intersects(box1), true);
        });
        it('should be true when a smaller box is lodged in between on the x-axis', function(){
            /* 1111
             * 1oo1
             *  22
             * */
            var box1 = new collision.BoundingBox(0,0,3,1);
            var box2 = new collision.BoundingBox(1,1,2,2);
            assert.equal(box1.intersects(box2), true);
            assert.equal(box2.intersects(box1), true);
        });
        it('should be true when a smaller box is lodged in between on the y-axis', function(){
            /* 11
             * 1o2
             * 1o2
             * 11
             * */
            var box1 = new collision.BoundingBox(0,0,1,3);
            var box2 = new collision.BoundingBox(1,1,2,2);
            assert.equal(box1.intersects(box2), true);
            assert.equal(box2.intersects(box1), true);
        });
        it('should be true when one box is ungulfed by another', function(){
            /* 1111
             * 1221
             * 1221
             * 1111
             * */
            var box1 = new collision.BoundingBox(0,0,3,3);
            var box2 = new collision.BoundingBox(1,1,2,2);
            assert.equal(box1.intersects(box2), true);
            assert.equal(box2.intersects(box1), true);
        });
        it('should be false when they are x-axis neighbours but not intersecting', function(){
            /* 1122
             * 1122
             * */
            var box1 = new collision.BoundingBox(0,0,1,1);
            var box2 = new collision.BoundingBox(2,0,3,1);
            assert.equal(box1.intersects(box2), false);
            assert.equal(box2.intersects(box1), false);
        });
        it('should be false when they are y-axis neighbours but not intersecting', function(){
            /* 11
             * 11
             * 22
             * 22
             * */
            var box1 = new collision.BoundingBox(0,0,1,1);
            var box2 = new collision.BoundingBox(0,2,1,3);
            assert.equal(box1.intersects(box2), false);
            assert.equal(box2.intersects(box1), false);
        });
        it('should be false when not intersecting on any axis', function(){
            /* 11
             * 11
             *   22
             *   22
             * */
            var box1 = new collision.BoundingBox(0,0,1,1);
            var box2 = new collision.BoundingBox(2,2,3,3);
            assert.equal(box1.intersects(box2), false);
            assert.equal(box2.intersects(box1), false);
        });
    });
});