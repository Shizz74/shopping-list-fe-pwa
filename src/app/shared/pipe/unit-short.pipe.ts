import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitShort',
})
export class UnitShortPipe implements PipeTransform {
  private readonly unitMap: Record<string, string> = {
    sztuk: 'szt',
    gram: 'g',
    ml: 'ml',
  };

  transform(value: string): string {
    if (!value) return '';
    const normalized = value.toLowerCase().trim();
    return this.unitMap[normalized] || value;
  }
}
