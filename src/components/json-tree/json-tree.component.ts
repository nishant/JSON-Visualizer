import { Component, Input, OnChanges } from '@angular/core';
import { Scope } from '../../types/scope';

@Component({
  selector: 'json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss'],
})
export class JsonTreeComponent implements OnChanges {
  @Input() json: unknown;
  @Input() expanded = true;
  @Input() depth = -1;
  @Input() currentDepth = -1;

  scopes: Scope[] = [];

  ngOnChanges(): void {
    this.scopes = [];
    this.currentDepth++;

    if (typeof this.json === 'object') {
      const obj = this.json as object;
      Object.entries(obj).forEach(([key, value]: [string, unknown]) => {
        this.scopes.push(this.parseKeyValue(key, value));
      });
    } else {
      this.scopes.push(this.parseKeyValue(`(${typeof this.json})`, this.json));
    }

    const test = this.json;
    if (typeof test === 'object') {
      Object.entries(test as object);
    }
  }

  public isExpandable(scope: Scope): boolean {
    return scope.type === 'object' || scope.type === 'array';
  }

  public toggle(scope: Scope): void {
    if (this.isExpandable(scope)) {
      scope.expanded = !scope.expanded;
    }
  }

  private isExpanded(): boolean {
    return (
      this.expanded && !(this.depth > -1 && this.currentDepth >= this.depth)
    );
  }

  private parseKeyValue(key: string, value: any): Scope {
    const scope: Scope = {
      key: key,
      value: value,
      type: undefined,
      description: '' + value,
      expanded: this.isExpanded(),
    };

    switch (typeof scope.value) {
      case 'number': {
        scope.type = 'number';
        break;
      }
      case 'boolean': {
        scope.type = 'boolean';
        break;
      }
      case 'function': {
        scope.type = 'function';
        break;
      }
      case 'string': {
        scope.type = 'string';
        scope.description = `"${scope.value}"`;
        break;
      }
      case 'undefined': {
        scope.type = 'undefined';
        scope.description = 'undefined';
        break;
      }
      case 'object': {
        // yea, null is object
        if (scope.value === null) {
          scope.type = 'null';
          scope.description = 'null';
        } else if (Array.isArray(scope.value)) {
          scope.type = 'array';
          scope.description = `Array[${scope.value.length}] ${JSON.stringify(
            scope.value,
          )}`;
        } else if (scope.value instanceof Date) {
          scope.type = 'date';
        } else {
          scope.type = 'object';
          scope.description = `Object ${JSON.stringify(scope.value)}`;
        }
        break;
      }
    }

    return scope;
  }
}
