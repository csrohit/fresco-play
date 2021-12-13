describe('D3 JS:', function() {
   beforeEach(function() {
     document.body.innerHTML='<ul id="myUL" class = "items">\
                              <li> Item 1</li>\
                              <li> Item 2</li>\
                              <li> Item 3</li>\
                              <li> Item 4</li>\
                              <li> Item 5</li>\
                             </ul>';
      d3update();
   });
   afterEach(function() {
       document.body.removeChild(document.getElementById('myUL'));
    });

    describe('Unit Testing:', function() {
        it('li[2] text to be Hello World', function() {
          expect(document.getElementsByTagName("li")[2].innerHTML).toBe('Hello World');
        });
        it('li[2] style to be blue', function() {
          expect(document.getElementsByTagName("li")[2].style.color).toBe('blue');
        });
        it('li[2] should have class big', function() {
          expect(document.getElementsByTagName("li")[2].classList[0]).toBe("big");
        });
    });
});
