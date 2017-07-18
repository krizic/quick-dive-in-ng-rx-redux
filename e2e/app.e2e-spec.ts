import { QuickDivePage } from './app.po';

describe('quick-dive App', () => {
  let page: QuickDivePage;

  beforeEach(() => {
    page = new QuickDivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
