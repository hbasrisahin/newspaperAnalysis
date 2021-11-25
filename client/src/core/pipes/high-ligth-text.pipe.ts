
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Pipe({
    name: 'highlight'
})

export class HighlightText implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(value: any, args: any): any {
        if (!args) {
            return value;
          }
          const specials = [
            // order matters for these
            "-"
            , "["
            , "]"
            // order doesn't matter for any of these
            , "/"
            , "{"
            , "}"
            , "("
            , ")"
            , "*"
            , "+"
            , "?"
            , "."
            , "\\"
            , "^"
            , "$"
            , "|"
          ];
      
          const rgxEscaper = RegExp('[' + specials.join('\\') + ']', 'g');
      
          args = args.replace(rgxEscaper, "\\$&");
      
          // Match in a case insensitive maneer
          const re = new RegExp(`\\\\?${args}` + `(?!([^<]+)?>)`, 'gi');
          // const match = value.match(re);
      
          // If there's no match, just return the original value.
          // if (!match) {
          //   return value;
          // }
          console.log(re);
          const replacedValue = args ? value.replace(re, (match:any) => `<mark>${match}</mark>`) : value;
          return replacedValue;
    }
}


