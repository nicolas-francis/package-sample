import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hidden',
    pure: false
})
export class FilterHiddenPipe implements PipeTransform {
    transform(items: any[], filter: string[]): any {
        if (!items || !filter || items.length === 0) {
            return items;
        }
        return items.filter(item => (!item.hideable || filter.indexOf(item.prop) === -1));
    }
}
