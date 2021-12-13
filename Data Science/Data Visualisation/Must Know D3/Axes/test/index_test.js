describe('D3 JS:', function() {
  var c;
   beforeEach(function() {
     document.body.innerHTML='<div id="testDiv">\
                               <h1> Creating static Bar Chart</h1>\
                               <div id = "chart"></div>\
                              </div>';
    c = barChart();
    c.render();

   });
   afterEach(function() {
       document.body.removeChild(document.getElementById('testDiv'));
       d3.selectAll('svg').remove();
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
    it('should have rect', function() {
      expect(d3.selectAll('rect')[0].length).toEqual(6);
    });
    it('should have data in rect', function() {
      expect(d3.selectAll('rect').data()).toBeDefined();
    });

    });
    function getSvg() {
    return d3.select('svg');
  }
});
