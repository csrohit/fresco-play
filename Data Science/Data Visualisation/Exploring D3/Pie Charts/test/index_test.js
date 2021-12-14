describe('D3 JS:', function() {
  var c;
   beforeEach(function() {
     document.body.innerHTML='<div id="testDiv">\
                               <h1> Creating Pie Chart</h1>\
                               <div id = "pieChart"></div>\
                              </div>';
    c = barChart();
    c.render();

   });
   afterEach(function() {
        //document.body.removeChild(document.getElementById('testDiv'));
        //d3.selectAll('svg').remove()
    });

    describe('Unit Testing:', function() {
      it('svg should be created', function() {
        expect(getSvg()[0].length).toBeGreaterThan(0);
      });
      it('should have the correct height', function() {
        expect(getSvg().attr('width')).toBe('500');
      });

      it('should have the correct width', function() {
        expect(getSvg().attr('height')).toBe('500');
      });
      it('should have arc/pie with 5 sections(elements)', function() {
        expect(d3.selectAll('.arc')[0].length).toBe(5);
      });
      it('should have pie', function() {
        expect(d3.layout.pie()).toBeDefined();
      });
      it('should have data', function() {
        expect(d3.selectAll('svg').data()).toBeDefined();
      });
    });
    function getSvg() {
    return d3.selectAll('svg');
  }
});
