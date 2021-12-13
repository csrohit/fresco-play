describe('D3 JS:', function() {
  var c;
   beforeEach(function() {
     document.body.innerHTML='<div id="testDiv">\
                              <ul class = "list_items">\
                                  <li>This is an Item</li>\
                                  <li>This is an Item</li>\
                                  <li>This is an Item</li>\
                                  <li>This is an Item</li>\
                                  <li>This is an Item</li>\
                              </ul>\
                             </div>';
      d3update();

   });
   afterEach(function() {
       document.body.removeChild(document.getElementById('testDiv'));
         d3.selectAll('svg').remove();
    });

    describe('Unit Testing:', function() {
        
        it('.list_items li[0] fontSize to be 10px' , function() {
          expect(document.querySelectorAll("ul.list_items li")[0].style.fontSize).toBe('10px');
        });
        it('.list_items li[1] fontSize to be 20px' , function() {
          expect(document.querySelectorAll("ul.list_items li")[1].style.fontSize).toBe('20px');
        });
        it('.list_items li[2] fontSize to be 30px' , function() {
          expect(document.querySelectorAll("ul.list_items li")[2].style.fontSize).toBe('30px');
        });
        it('.list_items li[3] fontSize to be 40px' , function() {
          expect(document.querySelectorAll("ul.list_items li")[3].style.fontSize).toBe('40px');
        });
        it('.list_items li[4] fontSize to be 50px' , function() {
          expect(document.querySelectorAll("ul.list_items li")[4].style.fontSize).toBe('50px');
        });

    });
    function getSvg() {
    return d3.select('svg');
  }
});
