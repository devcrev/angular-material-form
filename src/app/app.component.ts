import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators, AbstractControl}
    from "@angular/forms";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent{
    // For synchronous
    // name = new FormControl(
    //     null,
    //     [Validators.required, this.checkForbiddenName]
    // );
    // For asynchronous
    name = new FormControl(
        null,
        Validators.required,
        this.checkForbiddenNameAsync
    );
    email = new FormControl(null, [Validators.required, Validators.email]);
    status = new FormControl(null);

    projectForm = new FormGroup({
        name: this.name,
        email: this.email,
        status: this.status
    });

    submitForm (): void {
        console.log("Submission: ", this.projectForm);
    }

    getEmailErrorMessage (): string {
        if (this.email.hasError("required")) {
            return "You must enter a value.";
        } else if (this.email.hasError("email")) {
            return "This is not a valid email format.";
        }
        return "";
    }

    getNameErrorMessage (): string {
        if (this.name.hasError("required")) {
            return "You must enter a value.";
        } else if (this.name.hasError("nameIsForbidden")) {
            return "The name you entered is forbidden.";
        }
        return "";
    }

    // Synchronous
    // checkForbiddenName (control: FormControl):
    //     {nameIsForbidden: boolean} | null {
    //     // -----------------------------------
    //     if (control.value === "Test") {
    //         return {nameIsForbidden: true};
    //     }
    //     return null;
    // }

    // Asynchronous
    checkForbiddenNameAsync (control: AbstractControl):
        Promise<{nameIsForbidden: boolean} | null> {
        // --------------------------------------------
        const promise =
            new Promise<{nameIsForbidden: boolean} | null> (
                (resolve, _reject) => {
                    setTimeout(
                        () => {
                            if (control.value === "Test") {
                                resolve({nameIsForbidden: true});
                            } else {
                                resolve(null);
                            }
                        },
                        3000
                    );
                }
            );
        return promise;
    }
}
