import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { startWith, map, debounceTime, switchMap, catchError } from 'rxjs/operators';
/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
export { MyErrorStateMatcher };
var AppComponent = /** @class */ (function () {
    function AppComponent(api) {
        this.api = api;
        /** Error when invalid control is dirty, touched, or submitted. */
        this.inputFormControl = new FormControl('', [
            Validators.required,
        ]);
        this.matcher = new MyErrorStateMatcher();
        this.naicsAutoComplete$ = null;
        this.autoCompleteControl = new FormControl();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showQuestions();
        this.getssQuestions();
        this.naicsAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(startWith(''), 
        // delay emits
        debounceTime(300), 
        // use switch map so as to cancel previous subscribed events, before creating new once
        switchMap(function (value) {
            if (value !== '') {
                // lookup from github
                return _this.lookup(value);
            }
            else {
                // if no value is pressent, return null
                return of(null);
            }
        }));
    };
    AppComponent.prototype.getssQuestions = function () {
        var _this = this;
        this.api.getssQuestions()
            .subscribe(function (data) {
            _this.ss = data;
        });
    };
    AppComponent.prototype.lookup = function (value) {
        return this.api.search(value.toLowerCase()).pipe(
        // map the item property of the github results as our return object
        map(function (results) { return results.items; }), 
        // catch errors
        catchError(function (_) {
            return of(null);
        }));
    };
    AppComponent.prototype.showQuestions = function () {
        var _this = this;
        this.api.getQuestions()
            .subscribe(function (data) {
            _this.questions = data;
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map