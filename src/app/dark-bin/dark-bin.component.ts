import { Component, NgZone, OnInit } from '@angular/core';
import { languages } from 'monaco-editor';

// Uh... that's dirty
// Basically in our dark-bin.module we're importing MonacoEditorModule.
// And this module loads monaco to window object.
declare const monaco: any;

@Component({
  selector: 'app-dark-bin',
  templateUrl: './dark-bin.component.html',
  styleUrls: ['./dark-bin.component.scss']
})
export class DarkBinComponent implements OnInit {

  loading = true;
  editorOptions = {theme: 'vs-dark', language: 'plaintext'};
  code = '';
  availableLanguages: languages.ILanguageExtensionPoint[] = [];
  editor?: any;

  constructor(private zone: NgZone) { }

  changeLanguage() {
    monaco.editor.setModelLanguage(this.editor.getModel(), this.editorOptions.language);
  }

  monacoLoaded(editor: any) {
    this.editor = editor;

    // For some reason ngx-monaco-editor onInit event doesn't trigger change detection
    // So I must run this in NgZone
    this.zone.run(() => {
      this.loading = false;
      this.availableLanguages = monaco.languages.getLanguages();
    });
  }

  ngOnInit(): void {
  }

}
