import { AppPage } from './app.po';
import { browser, logging } from 'protractor';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('when user browses to our app he should see the form screen - title = "Bold Penguin', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Bold Penguin');
  });
  
  it('when user browses to our app he should see in the inner card title "Your custom quote starts here."', () => {
    page.navigateTo();
    expect(page.getSubCardTitleText()).toEqual('Your custom quote starts here.');
  });

  it('when user browses to our app he should see "This is going to be amazing!"', () => {
    page.navigateTo();
    expect(page.getSubCardSubTitleText()).toEqual('This is going to be amazing!');
  });

  it('when user browses to our app and click Submit with at least one field in not filled an error message "This field is required"', () => {
    page.navigateTo();
    page.fillNullInput();
    expect(page.getErrorMessage()).toEqual('This field is required');
  });

  it('when user browses to our app and click Cancle with at least one field in  filled an empty error message ', () => {
    page.navigateTo();
    page.clickCancle();
    expect(page.getErrorMessage()).toEqual('');
  });


  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});


