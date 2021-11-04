describe('New Customer', function () {

  it('"Create an Account" button should be disabled when inputs are empty', function () {
    browser.get('http://localhost:8000/signin.html');
    var btn = element(by.id('newCustomer'));
    btn.click();
    btn = element(by.id('reg_new_user'));
    expect(btn.isEnabled()).toBe(false);
  });

  it('"Create an Account" button when click should call registerUser()', function () {
    browser.get('http://localhost:8000/signin.html');

    var btn = element(by.id('newCustomer'));
    btn.click();
    btn = element(by.id('reg_new_user'));

    expect(btn.getAttribute("ng-click")).toBe("registerUser()");

  });


  it('"Create an Account" button should be enabled when inputs are valid', function () {
    browser.get('http://localhost:8000/signin.html');
    var btn = element(by.id('newCustomer'));
    btn.click();
    btn = element(by.id('reg_new_user'));


    var userid = element(by.model('userid'));
    userid.sendKeys('IamnewUSer');

    var emailid = element(by.model('emailid'));
    emailid.sendKeys('iamnewccer@newacc.com');

    var pswd = element(by.model('pswd'));
    pswd.sendKeys('welcomeNewpass123$');

    expect(btn.isEnabled()).toBe(true);

    pswd.clear();
    pswd.sendKeys('avascA23$mk@%#');
    expect(btn.isEnabled()).toBe(true);

  });

  it('"Create an Account" button should be disabled when inputs are invalid ', function () {
    browser.get('http://localhost:8000/signin.html');
    var btn = element(by.id('newCustomer'));
    btn.click();
    btn = element(by.id('reg_new_user'));
    var userid = element(by.model('userid'));
    var emailid = element(by.model('emailid'));
    var pswd = element(by.model('pswd'));

    userid.sendKeys('I');
    emailid.sendKeys('iamnewccer@newacc.com');
    pswd.sendKeys('welcomeNewpass123$');
    expect(btn.isEnabled()).toBe(false);

    pswd.clear();
    pswd.sendKeys('4444444444444444466');
    expect(btn.isEnabled()).toBe(false);

    pswd.clear();
    pswd.sendKeys('SSSSSSSFFVDWS');
    expect(btn.isEnabled()).toBe(false);


  });

});
