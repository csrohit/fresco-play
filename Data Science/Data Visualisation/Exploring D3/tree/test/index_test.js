describe('D3 JS:', function() {
  var c;
   beforeEach(function() {
     document.body.innerHTML='<div id="testDiv">\
                               <div id = "tree"></div>\
                              </div>';
    c = getTree();
    c.render();

   });
   afterEach(function() {
        document.body.removeChild(document.getElementById('testDiv'));
        d3.selectAll('svg').remove()
    });

    describe('Unit Testing:', function() {
      it('svg should be created', function() {
        expect(getSvg()[0].length).toBeGreaterThan(0);
      });
      it('svg should have the correct height', function() {
        expect(getSvg().attr('width')).toBe('500');
      });

      it('svg should have the correct width', function() {
        expect(getSvg().attr('height')).toBe('500');
      });
      it('tree to be defined ', function() {
        expect(d3.selectAll('path')[0]).toBeDefined();
      });
    });

    function getSvg() {
    return d3.selectAll('svg');
  }
});
