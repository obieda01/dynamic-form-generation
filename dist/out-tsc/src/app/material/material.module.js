import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatAutocompleteModule, } from "@angular/material";
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib_1.__decorate([
        NgModule({
            exports: [
                FormsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatGridListModule,
                MatInputModule,
                MatListModule,
                MatRadioModule,
                MatSelectModule,
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
export { MaterialModule };
//# sourceMappingURL=material.module.js.map