import currency ,{ Options , } from 'currency.js'
import { pito  , } from 'pito'

/*
 * Pito : moment, datetime
 * moment, date
 */
export type CurrencyExtra = {$option? : Options ,}
export type CurrencyOption = Record<string ,unknown>
export type CurrencySchema = {type: 'string'}
export type PitoCurrency = pito<string ,currency ,CurrencySchema ,CurrencyOption ,CurrencyExtra>
export const PitoCurrency = (option?: Options ,): PitoCurrency => {
    return {
        type   : 'string' ,
        $option: option , 
        $wrap(data ,) {
            return data.format(this.$option ,)
        } ,
        $unwrap(raw ,) { return currency(raw ,this.$option ,) } ,
        $strict() { return {type: 'string' ,} } ,
        $bypass() { return false } ,
        $typeof     : 'class' ,
        $constructor: currency ,
    }
}
// Moment, time

export const Plugin  = {
    Currency: PitoCurrency ,
}

export default Plugin
