import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { QuestionAbstract }  from '../models/question-abstract';
import { of } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy };
let apiService: ApiService;

describe('ApiService getQuestions', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(<any> httpClientSpy);
  });
  
  it('should return expected Questions (HttpClient called once)', () => {
    const expectedQuestions: QuestionAbstract[] =
      [{"value":"33","multiple":false, "id":1,"text":"What is the policy holder's first name?","type":"input","required":true,"min":2}];
  
    httpClientSpy.get.and.returnValue(of(expectedQuestions));
    apiService.getQuestions().subscribe(
      heroes => expect(heroes).toEqual(expectedQuestions, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  
  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue(of(errorResponse));
  
    apiService.getQuestions()
      error  => expect(error.toString).toContain('test 404 error')
  });
  
});



describe('ApiService search', () => {
  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(<any> httpClientSpy);
  });
  
  it('should return expected Questions (HttpClient called once)', () => {
    const expectedSearch=
    [{"code":"111110","description":"Soybean Farming"}];
  
    httpClientSpy.get.and.returnValue( of (expectedSearch));
    apiService.search('a');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  
  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue( of(errorResponse));
  
    apiService.search('a');  
    
      error  => expect(error.toString).toContain('test 404 error');
  });
  
});


describe('ApiService postAnswers', () => {
  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(<any> httpClientSpy);
  });
  
  it('should return expected Questions (HttpClient called once)', () => {
    const expectedSearch=
    [{"code":"111110","description":"Soybean Farming"}];
  
    httpClientSpy.get.and.returnValue( of (expectedSearch));
    apiService.search('a');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  
  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue( of(errorResponse));
  
    apiService.search('a');  
    
      error  => expect(error.toString).toContain('test 404 error');
  });
  
});


describe('ApiService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ ApiService ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    apiService = TestBed.get(ApiService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// ApiService method tests begin ///
  describe('getQuestions', () => {
    let expectedQuestions: QuestionAbstract[];

    beforeEach(() => {
      apiService = TestBed.get(ApiService);
      expectedQuestions =    [
        {"value":"33","multiple":false, "id":1,"text":"What is the policy holder's first name?","type":"input","required":true,"min":2}
      ] as QuestionAbstract[];
    });

    it('should return expected Questions (called once)', () => {
      apiService.getQuestions().subscribe(
        questions => expect(questions).toEqual(expectedQuestions, 'should return expected Questions'),
        fail
      );

      // ApiService should have made one request to GET Questions from expected URL
      const req = httpTestingController.expectOne(apiService.questionsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock Questions
      req.flush(expectedQuestions);
    });

    it('should be OK returning no Questions', () => {
      apiService.getQuestions().subscribe(
        questions => expect(expectedQuestions.length).toEqual(1, 'should have empty heroes array'),
        fail
      );

      const req = httpTestingController.expectOne(apiService.questionsUrl);
      req.flush([]); // Respond with no questions
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      apiService.getQuestions().subscribe(
        questions => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(apiService.questionsUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected questions (called multiple times)', () => {
      apiService.getQuestions().subscribe();
      apiService.getQuestions().subscribe();
      apiService.getQuestions().subscribe(
        questions => expect(questions).toEqual(expectedQuestions, 'should return expected questions'),
        fail
      );

      const requests = httpTestingController.match(apiService.questionsUrl);
      expect(requests.length).toEqual(3, 'calls to getquestions()');

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{"value":"343","multiple":false, "id":3,"text":"What is the policy holder's first name?","type":"input","required":true,"min":2}]);
      requests[2].flush(expectedQuestions);
    });
  });

  describe('search', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (q: string) => `${apiService.searchUrl}/?q=${q}`;
    const expectedSearch=
    [{"code":"238310","description":"Drywall and Insulation Contractors"}];
    it('should return it', () => {

      apiService.search('dryss').subscribe(
        data => expect(data).toEqual(expectedSearch, 'should return the NAICS'),
        fail
      );
    });
  });

});


interface Data {
  name: string;
}
const testUrl = '/data';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  /// Tests begin ///
  it('can test HttpClient.get', () => {
    const testData: Data = {name: 'Test Data'};

    // Make an HTTP GET request
    httpClient.get<Data>(testUrl)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('/data');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
  it('can test HttpClient.get with matching header', () => {
    const testData: Data = {name: 'Test Data'};

    // Make an HTTP GET request with specific header
    httpClient.get<Data>(testUrl, {
        headers: new HttpHeaders({'Authorization': 'my-auth-token'})
      })
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

      // Find request with a predicate function.
    // Expect one request with an authorization header
    const req = httpTestingController.expectOne(
      req => req.headers.has('Authorization')
    );
    req.flush(testData);
  });

  it('can test multiple requests', () => {
    let testData: Data[] = [
      { name: 'bob' }, { name: 'carol' },
      { name: 'ted' }, { name: 'alice' }
    ];

    // Make three requests in a row
    httpClient.get<Data[]>(testUrl)
      .subscribe(d => expect(d.length).toEqual(0, 'should have no data'));

    httpClient.get<Data[]>(testUrl)
      .subscribe(d => expect(d).toEqual([testData[0]], 'should be one element array'));

    httpClient.get<Data[]>(testUrl)
      .subscribe(d => expect(d).toEqual(testData, 'should be expected data'));

    // get all pending requests that match the given URL
    const requests = httpTestingController.match(testUrl);
    expect(requests.length).toEqual(3);

    // Respond to each request with different results
    requests[0].flush([]);
    requests[1].flush([testData[0]]);
    requests[2].flush(testData);
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';

    httpClient.get<Data[]>(testUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('can test for network error', () => {
    const emsg = 'simulated network error';

    httpClient.get<Data[]>(testUrl).subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
      // The rest of this is optional and not used.
      // Just showing that you could provide this too.
      filename: 'HeroService.ts',
      lineno: 42,
      colno: 21
    });

    // Respond with mock error
    req.error(mockError);
  });

  it('httpTestingController.verify should fail if HTTP response not simulated', () => {
    // Sends request
    httpClient.get('some/api').subscribe();

    // verify() should fail because haven't handled the pending request.
    expect(() => httpTestingController.verify()).toThrow();

    // Now get and flush the request so that afterEach() doesn't fail
    const req = httpTestingController.expectOne('some/api');
    req.flush(null);
  });
});





