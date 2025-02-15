import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidatorPlacaVehicular(): ValidatorFn{
    return(control : AbstractControl): ValidationErrors | null =>{
        const regex = /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}/
        const valid = regex.test(control.value)
        return valid ? null : { formatoInvalido : {value: control.value}} 
    }
}