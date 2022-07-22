import currency, {Options} from 'currency.js'
import { pito, plugin } from 'pito'

// moment, datetime
// moment, date
export type CurrencyExtra = {
    $option? : Options,
}
export type CurrencyOption = {}
export type CurrencySchema = {type: 'string'}
export type PitoCurrency = pito<string, currency, CurrencySchema, CurrencyOption, CurrencyExtra>
export const PitoCurrency = (option?: Options): PitoCurrency => {
    return {
        type: 'string',
        $option:option, 
        $wrap(data) {
            return data.format(this.$option)
        },
        $unwrap(raw) { return currency(raw, this.$option) },
        $strict() {return {type: 'string'}},
        $bypass() { return false },
        $typeof : "class",
        $constructor : currency,
    }
}
// moment, time
Object.defineProperty(plugin, 'Currency', { value: PitoCurrency, configurable: false, writable: false })
declare module 'pito' {
    interface PitoPlugin {
        Currency: typeof PitoCurrency
    }
    namespace pito {
        type Currency = PitoCurrency
    }
}