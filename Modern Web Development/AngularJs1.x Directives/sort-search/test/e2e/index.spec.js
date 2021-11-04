describe('Testing Sort and Search Products app', function () {

  it('Product list should be filtered based on the search field', function () {
    browser.get('http://localhost:8000');
    var searchKeywordByid = element(by.id('search'));
    var brand_name = element.all(by.className('brdName'));
    var prd = element.all(by.id('product-list'));
    searchKeywordByid.sendKeys('Wheels');
    expect(prd.count()).toEqual(1);
    expect(brand_name.getText()).toEqual(["Wheels"]);
    searchKeywordByid.clear();
    searchKeywordByid.sendKeys("D");
    expect(prd.count()).toEqual(2);
    expect(brand_name.getText()).toEqual(['Super Hero', 'Feel Good']);
    searchKeywordByid.clear();
    searchKeywordByid.sendKeys("Super Hero");
    expect(prd.count()).toEqual(1);
    expect(brand_name.getText()).toEqual(['Super Hero']);
  });

  it('Should filter the product list based on the selected brand', function () {
    browser.get('http://localhost:8000');
     var brand_name = element.all(by.className('brdName'));
 
    element(by.id('brandSelection')).all(by.tagName('option')).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text === 'Wheels';
      });
    }).first().click();
    expect(brand_name.getText()).toEqual(["Wheels"]);

    element(by.id('brandSelection')).all(by.tagName('option')).filter(function(elem, index) {
      return elem.getText().then(function(text) {
        return text === 'Super Hero';
      });
    }).first().click();
    expect(brand_name.getText()).toEqual(["Super Hero"]);

    
  });
  
  it('Products should be sorted in Low Price to High', function () {
    browser.get('http://localhost:8000');
    var prdPrice = element.all(by.className('prdPrice'));
    var priceFilter = element(by.model('priceFilter'));
    priceFilter.sendKeys=false;
    expect(prdPrice.getText()).toEqual(['500','1000','2500']);
  });
  it('Products should be sorted in High Price to Low', function () {
    browser.get('http://localhost:8000');
    var prdPrice = element.all(by.className('prdPrice'));
   element(by.model('selectedPriceFilter')).all(by.tagName('option')).filter(function(elem, index) {
    return elem.getText().then(function(text) {
      return text === 'High Price to Low';
    });
  }).first().click();
  expect(prdPrice.getText()).toEqual(['2500','1000','500']);
  });
 
});

