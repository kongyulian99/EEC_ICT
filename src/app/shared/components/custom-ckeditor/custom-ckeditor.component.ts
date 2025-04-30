import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import {
  ClassicEditor,
  AccessibilityHelp,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight,
  ImageBlock,
  ImageCaption,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  Paragraph,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  SimpleUploadAdapter,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  Undo,
  type EditorConfig,
  BalloonEditor,
  InlineEditor,
} from 'ckeditor5';

import translations from './vi.js';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-custom-ckeditor',
  templateUrl: './custom-ckeditor.component.html',
  styleUrls: ['./custom-ckeditor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomCkEditorComponent {
  @Input() placeholder = 'Input here...';
  @Input() isValidate = false;
  @Input() message = '';
  constructor(private changeDetector: ChangeDetectorRef) {}

  public isLayoutReady = false;
  // public Editor = ClassicEditor;
  public Editor = InlineEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'selectAll',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'superscript',
          'code',
          'removeFormat',
          '|',
          'specialCharacters',
          'link',
          'insertImage',
          'insertTable',
          'highlight',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          '|',
          'accessibilityHelp',
        ],
        shouldNotGroupWhenFull: true,
      },
      plugins: [
        AccessibilityHelp,
        AutoImage,
        Autosave,
        SimpleUploadAdapter,
        Bold,
        Code,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Highlight,
        ImageBlock,
        ImageCaption,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Italic,
        Link,
        List,
        Paragraph,
        RemoveFormat,
        SelectAll,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TodoList,
        Underline,
        Undo,
      ],
      fontFamily: {
        options: [
          'default',
          'Arial, Helvetica, sans-serif',
          'Courier New, Courier, monospace',
          'Georgia, serif',
          'Lucida Sans Unicode, Lucida Grande, sans-serif',
          'Tahoma, Geneva, sans-serif',
          'Times New Roman, Times, serif',
          'Trebuchet MS, Helvetica, sans-serif',
          'Verdana, Geneva, sans-serif',
        ],
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: `${environment.apiUrl}/api/files/ckeditor-images`,
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:alignBlockLeft',
          'imageStyle:block',
          'imageStyle:alignBlockRight',
          '|',
          'resizeImage',
        ],
        styles: {
          options: ['alignBlockLeft', 'block', 'alignBlockRight'],
        },
      },
      initialData: '',
      language: 'vi',
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      placeholder: this.placeholder,
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
      },
      translations: [translations],
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  private _Content: string = '';
  @Input() set Content(value: string) {
    this._Content = value;
    this.change.emit(value);
  }
  get Content() {
    return this._Content;
  }

  @Output('ContentChange') change = new EventEmitter<string>();
}
