import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SplitAreaDirective, SplitComponent } from 'angular-split';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'json-visualizer';
  data = {
    'simple key': 'simple value',
    numbers: 1234567,
    'simple list': ['value1', 22222, 'value3'],
    'special value': undefined,
    owner: null,
    'simple object': {
      'simple key': 'simple value',
      numbers: 1234567,
      'simple list': ['value1', 22222, 'value3'],
      'simple object': {
        key1: 'value1',
        key2: 22222,
        key3: 'value3',
      },
    },
  };

  @ViewChild('split') split: SplitComponent | undefined;
  @ViewChild('area1') area1: SplitAreaDirective | undefined;
  @ViewChild('area2') area2: SplitAreaDirective | undefined;

  direction = 'horizontal';
  sizes = {
    percent: {
      area1: 30,
      area2: 70,
    },
    pixel: {
      area1: 120,
      area2: '*',
      area3: 160,
    },
  };

  constructor() {
    setTimeout(() => {
      console.log('>>> split > ', this.split);
      console.log('>>> area1 > ', this.area1);
      console.log('>>> area2 > ', this.area2);
    }, 1000);
  }

  dragEnd(unit: string, { sizes }: any) {
    if (unit === 'percent') {
      this.sizes.percent.area1 = sizes[0];
      this.sizes.percent.area2 = sizes[1];
    } else if (unit === 'pixel') {
      this.sizes.pixel.area1 = sizes[0];
      this.sizes.pixel.area2 = sizes[1];
      this.sizes.pixel.area3 = sizes[2];
    }
  }

  testChangeDetectorRun(): void {
    console.log(`${new Date()} > Change detection just ran!`);
  }

  // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: false,
    },
    tabSize: 2,
    formatOnPaste: true,
    wordWrap: 'off',
    originalEditable: true, // for left pane
  };

  onCodeChanged(value: any) {
    console.log('CODE', value);
  }
}
