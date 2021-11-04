describe('pick2get', function() {
    it('Image should be displayed', function() {
      browser.get('http://localhost:8000/');
      var prd = element.all(by.repeater('pdt in products'));
      expect(prd.count()).toEqual(3)
      prd = (element.all(by.tagName("img"))).getAttribute("ng-src");
      expect(prd).toEqual(["img/cycle.jpg","img/shoes.jpg","img/shirt.jpg"]);
    });
  });