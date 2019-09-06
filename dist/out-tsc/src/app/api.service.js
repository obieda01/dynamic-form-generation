import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        //https://pengwinning.boldpenguin.com/api/naics/search?q=XXX
        this.questionsUrl = 'https://pengwinning.boldpenguin.com/api/questions';
        this.searchUrl = 'https://pengwinning.boldpenguin.com/api/naics/search';
    }
    ApiService.prototype.getQuestions = function () {
        // return this.http.get('assets/helper.jason');
        return this.http.get(this.questionsUrl, httpOptions);
    };
    ApiService.prototype.getssQuestions = function () {
        // return this.http.get('assets/helper.jason');
        return this.http.get(this.searchUrl, httpOptions);
    };
    ApiService.prototype.search = function (query) {
        return this.http
            .get(this.searchUrl, {
            observe: 'response',
            headers: new HttpHeaders({ 'Authorization': 'Bearer ' + 'e60ce72ecdebc37631b0cc1de13a2f15' }),
            params: {
                q: query,
                sort: 'stars',
                order: 'desc'
            }
        })
            .pipe(map(function (res) {
            return res.body;
        }));
    };
    ApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
var httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer e60ce72ecdebc37631b0cc1de13a2f15'
    })
};
//# sourceMappingURL=api.service.js.map