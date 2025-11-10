export namespace log {
    export function debug(...data: any[]): void {
        console.debug(...data)
    }
    export function info(...data: any[]): void {
        console.info(...data)
    }
    export function warn(...data: any[]): void {
        console.warn(...data)
    }
    export function error(...data: any[]): void {
        console.error(...data)
    }
}