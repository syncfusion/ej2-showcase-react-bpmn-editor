import { createElement, closest, formatUnit } from "@syncfusion/ej2-base";
import { DiagramComponent, SymbolPaletteComponent, DiagramAction, DiagramTools, NodeConstraints, ConnectorConstraints, UndoRedo, DiagramContextMenu, Snapping, DataBinding, PrintAndExport, BpmnDiagrams, ConnectorBridging, LayoutAnimation, SymbolPalette } from "@syncfusion/ej2-react-diagrams";
import { Diagram, SnapConstraints, ControlPointsVisibility, BezierSmoothness } from "@syncfusion/ej2-react-diagrams";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { DiagramClientSideEvents } from "./script/events";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ToolbarComponent, ItemsDirective, ItemDirective, ContextMenuComponent, ContextMenuSettingsModel } from '@syncfusion/ej2-react-navigations';
import * as React from 'react';
import { NumericTextBoxComponent, ColorPickerComponent, SliderComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Uploader } from '@syncfusion/ej2-react-inputs';
import { RadioButtonComponent, ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { Palettes } from "./script/palettes";
import { DropDownDataSources } from './script/dropdowndatasource';
import { DiagramPropertyBinding } from './script/events';
import { SelectorViewModel } from "./script/selector";
import { UtilityMethods } from "./script/utilitymethods";
Diagram.Inject(UndoRedo, DiagramContextMenu, Snapping, DataBinding);
Diagram.Inject(PrintAndExport, BpmnDiagrams, ConnectorBridging, LayoutAnimation);
SymbolPalette.Inject(BpmnDiagrams);


export class PaperSize {
}
export let diagramName;
export let beforItem;
export let loadDiagram;
export let beforeOpen;
export let designContextMenuOpen;
export let editContextMenuOpen;
export let toolContextMenuOpen;
export let beforeClose;
export let menuclick;
export let tooledit;
export let zoomTemplate;
export let zoomchange;
export let connectorTool;
export let connectorToolChange;
export let propertyPanel;
export let footTemplate;
export let printTemplateChange;
export let hyperLinkTemplate;
export let offsetXChange;
export let offsetYchange;
export let nodeWidthChange;
export let nodeHeightChange;
export let rotationChange;
export let nodeFillColor;
export let gradientDirectionChange;
export let gradientColorChange;
export let opacityChange;
export let lineTypeChange;
export let lineColorChange;
export let lineStyleChange;
export let lineWidthChange;
export let sourceTypeChange;
export let targetTypeChange;
export let sourceSizeChange;
export let targetSizeChange;
export let bridgeChange;
export let bridgeSizeChange;
export let connectorOpacityChange;
export let fontFamilyChange;
export let fontSizeChange;
export let fontColorChange;
export let strokeColorChange;
export let aspectRatioClick;
export let nodeBorderChange;
export let strokeWidthChange;
export let fontOpacityChange;
export let btnHyperLink;
export let hyperlinkInsert;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.animationSettings = { effect: 'None' };
    this.dropdownListFields = { text: 'text', value: 'value' };
    this.drawingNode = "";
    this.pageSettings = {
      background: { color: '#FFFFFF' }, width: 600, height: 1500, margin: { left: 5, top: 5 },
      orientation: 'Landscape', showPageBreaks: false, multiplePage: false
    };
    this.nodes = [
      {
        id: 'Start1', offsetX: 100, offsetY: 300, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Start' }
        },
      },
      {
        id: 'Task1', width: 120, height: 75, offsetX: 250, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Receive Book lending Request' }]
      },
      {
        id: 'Task2', width: 120, height: 75, offsetX: 420, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Service' }
          },
        },
        annotations: [{ content: 'Get the Book Status', offset: { x: 0.5, y: 0.6 } }]
      },
      {
        id: 'Gateway1', width: 70, height: 60, offsetX: 570, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway', },
      },
      {
        id: 'Task3', width: 120, height: 75, offsetX: 780, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Send' }
          },
        },
        annotations: [{ content: 'On loan Reply' }]
      },
      {
        id: 'Gateway2', width: 70, height: 60, offsetX: 920, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'EventBased' } },
      },
      {
        id: 'Intermediate1', offsetX: 1050, offsetY: 300, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'Decline Hold', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Task4', width: 120, height: 75, offsetX: 1200, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Cancel Request' }]
      },
      {
        id: 'End1', offsetX: 1400, offsetY: 300, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'End', },
        },
      },
      {
        id: 'Intermediate2', offsetX: 1050, offsetY: 200, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'Hold Book', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Intermediate3', offsetX: 1050, offsetY: 400, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'One Week', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Intermediate4', offsetX: 900, offsetY: 60, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'Two Weeks', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Task5', width: 120, height: 75, offsetX: 780, offsetY: 550,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'User' }
          },
        },
        annotations: [{ content: 'Checkout the Book' }]
      },
      {
        id: 'Task6', width: 120, height: 75, offsetX: 1050, offsetY: 550,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Checkout Reply' }]
      },
      {
        id: 'Task7', width: 120, height: 75, offsetX: 1200, offsetY: 200,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Service' }
          },
        },
        annotations: [{ content: 'Request Hold' }]
      },
      {
        id: 'Task8', width: 120, height: 75, offsetX: 1400, offsetY: 200,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Hold Reply' }]
      },
    ];
    this.connectors =
      [
        {
          id: 'connector1', sourceID: 'Start1', targetID: 'Task1', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector2', sourceID: 'Task1', targetID: 'Task2', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector3', sourceID: 'Task2', targetID: 'Gateway1', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector4', sourceID: 'Gateway1', targetID: 'Task3', annotations: [{ content: 'Book is on Loan' }], type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector5', sourceID: 'Task3', targetID: 'Gateway2', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector6', sourceID: 'Gateway2', targetID: 'Intermediate1', sourcePortID: 'right', targetPortID: 'left', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector7', sourceID: 'Intermediate1', targetID: 'Task4', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector8', sourceID: 'Task4', targetID: 'End1', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector9', sourceID: 'Gateway2', targetID: 'Intermediate2', sourcePortID: 'top', targetPortID: 'left', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector10', sourceID: 'Gateway2', targetID: 'Intermediate3', sourcePortID: 'bottom', targetPortID: 'left', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector11', sourceID: 'Intermediate2', targetID: 'Task7', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector12', sourceID: 'Intermediate3', targetID: 'Task4', sourcePortID: 'right', targetPortID: 'bottom', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector13', sourceID: 'Task7', targetID: 'Task8', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector14', sourceID: 'Task8', targetID: 'Intermediate4', sourcePortID: 'top', targetPortID: 'right', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector15', sourceID: 'Intermediate4', targetID: 'Task2', sourcePortID: 'left', targetPortID: 'top', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector16', sourceID: 'Gateway1', targetID: 'Task5', sourcePortID: 'bottom', targetPortID: 'left',
          annotations: [{ content: 'Book is Avaliable' }], type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector17', sourceID: 'Task5', targetID: 'Task6', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector18', sourceID: 'Task6', targetID: 'End1', sourcePortID: 'right', targetPortID: 'bottom', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
      ];
    this.contextMenu = {
      show: true,
      items: [
        {
          text: 'Copy', id: 'Copy', target: '.e-diagramcontent', iconCss: 'sf-icon-copy'
        },
        {
          text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'sf-icon-cut'
        },
        {
          text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'sf-icon-paste'
        },
        {
          text: 'Delete', id: 'Delete', target: '.e-diagramcontent', iconCss: 'sf-icon-delete'
        },
        {
          text: 'Select All', id: 'SelectAll', target: '.e-diagramcontent', iconCss: 'e-menu-icon'
        },
        {
          text: 'Association', id: 'Association', iconCss: 'e-bpmn-icons'
        },
        {
          text: 'Sequence', id: 'Sequence', iconCss: 'e-bpmn-icons'
        },
        {
          text: 'Message Flow', id: 'MessageFlow', iconCss: 'e-bpmn-icons'
        },
        {
          text: 'Condition type', id: 'Condition type', items: [
            { text: 'Default', id: 'None', iconCss: 'e-bpmn-icons' }, { text: 'Conditional', id: 'Conditional Flow', iconCss: 'e-bpmn-icons' },
            { text: 'Normal', id: 'Normal Flow', iconCss: 'e-bpmn-icons' },
          ]
        },
        {
          text: 'Direction', id: 'Direction', items: [
            { text: 'Default', id: 'None', iconCss: 'e-bpmn-icons' }, { text: 'Directional', id: 'Directional', iconCss: 'e-bpmn-icons' },
            { text: 'Bi-Directional', id: 'BiDirectional', iconCss: 'e-bpmn-icons' },
          ]
        },
        {
          text: 'Ad-Hoc', id: 'Adhoc',
          iconCss: 'e-adhocs e-bpmn-icons e-adhoc',
        }, {
          text: 'Loop', id: 'Loop',
          items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
          { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
          { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
          { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
        }, {
          text: 'Compensation', id: 'taskCompensation',
          iconCss: 'e-compensation e-bpmn-icons e-Compensation',
        }, {
          text: 'Activity-Type', id: 'Activity-Type',
          items: [{ iconCss: 'e-bpmn-icons e-Task', text: 'Task', id: 'Task' }
            , { text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'SubProcess' },
          ]
        }, {
          text: 'Boundary', id: 'Boundary',
          items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
          { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
          { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' },]
        }, {
          text: 'Data Object', id: 'DataObject',
          items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
          { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
          { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
        }, {
          text: 'Collection', id: 'collection',
          iconCss: 'e-collection e-bpmn-icons e-ParallelMI',
        }, {
          text: 'Task Call', id: 'DeftCall',
          iconCss: 'e-call e-bpmn-icons e-CallActivity',
        }, {
          text: 'Trigger Result', id: 'TriggerResult',
          items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
          { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
          { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
          { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
          { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
          { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
          { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
          { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
          { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
          { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
          { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
          { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
          { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
          ]
        },
        {
          text: 'Event Type', id: 'EventType',
          items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
          { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
          { text: 'Non-Interrupting Start', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
          { text: 'Throwing Intermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
          {
            text: 'Non-Interrupting Intermediate', id: 'NonInterruptingIntermediate',
            iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
          },
          { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
        }, {
          text: 'Task Type', id: 'TaskType',
          items: [
            { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
            { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
            { text: 'Business Rule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
            { text: 'Instantiating Receive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
            { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
            { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
            { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
            { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-InMessage' },
            { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
          ]
        }, {
          text: 'GateWay', id: 'GateWay',
          iconCss: 'e-bpmn-icons e-Gateway', items: [
            { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None sf-icon-check-tick' },
            { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
            { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
            { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
            { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
            { text: 'Event Based', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
            { text: 'Exclusive Event Based', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
            { text: 'Parallel Event Based', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
          ]
        },
        {
          text: 'Message Type', id: 'MessageType', items: [
            { text: 'Default', id: 'None', iconCss: 'e-bpmn-icons' }, { text: 'Initiating Message', id: 'InitiatingMessage', iconCss: 'e-bpmn-icons' },
            { text: 'Non-Initiating Message', id: 'NonInitiatingMessage', iconCss: 'e-bpmn-icons' },
          ]
        },
        {
          text: 'Add Text Annotation', id: 'TextAnnotation', iconCss: 'e-bpmn-icons e-TextAnnotation'
        }
      ],
      showCustomMenuOnly: true
    }
    this.drawingObject = { type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' } };
    this.scrollSettings = { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 };
    this.rulerSettings = {
      showRulers: true, dynamicGrid: true, horizontalRuler: { interval: 10, segmentWidth: 100, thickness: 25, markerColor: '#0078d4' },
      verticalRuler: { interval: 10, segmentWidth: 100, thickness: 25, markerColor: '#0078d4' }
    }
    this.selectedItem = new SelectorViewModel();
    this.dropDownDataSources = new DropDownDataSources();
    this.palettes = new Palettes();
    this.diagramEvents = new DiagramClientSideEvents(this.selectedItem, this.page);
    this.UtilityMethods = new UtilityMethods();
    this.diagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem, this.page);
    this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
    this.dlgTarget = document.body;
    this.dialogVisibility = false;
    this.isModalDialog = false;
    this.dialogAnimationSettings = { effect: 'None' };
    this.exportingButtons = this.getDialogButtons('export');
    this.printingButtons = this.getDialogButtons('print');
    this.hyperlinkButtons = this.getDialogButtons('hyperlink');

    loadDiagram = this.loadDiagram.bind(this);
    beforItem = this.beforeItemRender.bind(this);
    designContextMenuOpen = this.designContextMenuOpen.bind(this);
    editContextMenuOpen = this.editContextMenuOpen.bind(this);
    toolContextMenuOpen = this.toolContextMenuOpen.bind(this);
    beforeOpen = this.arrangeMenuBeforeOpen.bind(this);
    beforeClose = this.arrangeMenuBeforeClose.bind(this);
    menuclick = this.menuClick.bind(this);
    tooledit = this.toolbarEditorClick.bind(this);
    propertyPanel = this.propertyPanel.bind(this)
    zoomTemplate = this.zoomTemplate.bind(this);
    zoomchange = this.zoomChange.bind(this);
    connectorTool = this.connectorTool.bind(this);
    connectorToolChange = this.connectorToolChange.bind(this);
    footTemplate = this.footerTemplate.bind(this);
    printTemplateChange = this.printTemplate.bind(this);
    diagramName = this.diagramNameChange.bind(this);
    hyperLinkTemplate = this.hyperlinkTemplate.bind(this);
    btnHyperLink = this.btnHyperLink.bind(this);
    hyperlinkInsert = this.hyperlinkInsert.bind(this);
    offsetXChange = this.offsetX.bind(this);
    offsetYchange = this.offsetY.bind(this);
    nodeWidthChange = this.nodeWidth.bind(this);
    nodeHeightChange = this.nodeHeight.bind(this);
    rotationChange = this.nodeRotationChange.bind(this);
    nodeFillColor = this.nodeFillColorChange.bind(this);
    gradientDirectionChange = this.gradientDropDownChange.bind(this);
    gradientColorChange = this.nodeGradientColorChange.bind(this);
    opacityChange = this.nodeOpacityChange.bind(this);
    fontFamilyChange = this.nodeFontFamilyChange.bind(this);
    fontSizeChange = this.nodeFontSizeChange.bind(this);
    fontColorChange = this.nodeFontColor.bind(this);
    strokeWidthChange = this.nodeStrokeWidthChange.bind(this);
    nodeBorderChange = this.nodeBoderStyleChange.bind(this);
    strokeColorChange = this.nodeStrokeColorChange.bind(this);
    fontOpacityChange = this.fontOpacityChangeEvent.bind(this);
    lineTypeChange = this.connectorTypeChange.bind(this);
    lineColorChange = this.connectorColorChange.bind(this);
    lineStyleChange = this.ConnectorLineStyle.bind(this);
    lineWidthChange = this.ConnectorLineWidthChnage.bind(this);
    sourceTypeChange = this.connectorSourceType.bind(this);
    targetTypeChange = this.connectorTargetType.bind(this);
    sourceSizeChange = this.connectorSourceSize.bind(this);
    targetSizeChange = this.connectorTargetSize.bind(this);
    bridgeChange = this.connectorBridgeChange.bind(this);
    bridgeSizeChange = this.connectorBridgeSize.bind(this);
    connectorOpacityChange = this.ConnectorOpacityChange.bind(this);
    aspectRatioClick = this.aspectRatioClick.bind(this);

  }
  componentDidMount() {
    this.generateDiagram();
    this.uploader();
    document.onmouseover = this.menumouseover.bind(this);
    this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
    const context = this;
    setTimeout(() => { context.loadPage(); }, 20);
  }
  render() {
    return (<div>
      <input type="file" id="fileupload" name="UploadFiles"></input>
      <ContextMenuComponent id='designContextMenu' ref={arrangeContextMenu => (this.arrangeContextMenu) = arrangeContextMenu} animationSettings={this.animationSettings} items={this.dropDownDataSources.designMenuItems} onOpen={designContextMenuOpen} cssClass="designMenu" beforeItemRender={beforItem} select={menuclick} beforeClose={() => this.arrangeMenuBeforeClose} />
      <ContextMenuComponent id='editContextMenu' ref={editContextMenu => (this.editContextMenu) = editContextMenu} animationSettings={this.animationSettings} onOpen={editContextMenuOpen} beforeItemRender={beforItem} select={menuclick} items={this.dropDownDataSources.editMenuItems} cssClass="editMenu" beforeClose={() => this.arrangeMenuBeforeClose} />
      <ContextMenuComponent id='toolsContextMenu' ref={toolContextMenu => (this.toolContextMenu) = toolContextMenu} animationSettings={this.animationSettings} onOpen={toolContextMenuOpen} beforeItemRender={beforItem} select={menuclick} items={this.dropDownDataSources.toolsMenuItems} cssClass="toolMenu" beforeClose={() => this.arrangeMenuBeforeClose} />
      <div className='diagrambuilder-container' >
        <div className='header navbar'>
          <div className="db-header-container">
            <div className="db-diagram-name-container">
              <span id='diagramName' className="db-diagram-name" onClick={this.renameDiagram}>
                Untitled Diagram
              </span>
              <input id='diagramEditable' type="text" className="db-diagram-name" onKeyDown={this.diagramNameKeyDown} onBlur={this.diagramNameChange} />
              <span id='diagramreport' className="db-diagram-name db-save-text" style={{ float: "right" }} />
            </div>
            <div className='db-menu-container'>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnFileMenu" cssClass={"db-dropdown-menu"} content="File" items={this.dropDownDataSources.fileMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                < DropDownButtonComponent id="btnEditMenu" cssClass={"db-dropdown-menu"} content="Edit"
                  items={this.dropDownDataSources.editMenuItems} select={menuclick} target='.e-contextmenu-wrapper.editMenu'
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnDesignMenu" cssClass={"db-dropdown-menu"} content="Design" target='.e-contextmenu-wrapper.designMenu' items={this.dropDownDataSources.designMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnSelectMenu" cssClass={"db-dropdown-menu"} content="Select" items={this.dropDownDataSources.selectMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnToolsMenu" cssClass={"db-dropdown-menu"} content="Tools" target='.e-contextmenu-wrapper.toolMenu' items={this.dropDownDataSources.toolsMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnViewMenu" cssClass={"db-dropdown-menu"} content="View" items={this.dropDownDataSources.viewMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />

              </div>
            </div>
          </div>
          <div className='db-toolbar-editor' >
            <div className='db-toolbar-container'>
              <ToolbarComponent ref={toolbar => (this.toolbarEditor) = toolbar} id='toolbarEditor' overflowMode='Scrollable' clicked={tooledit} >
                <ItemsDirective>

                  <ItemDirective prefixIcon='sf-icon-undo tb-icons' tooltipText='Undo' cssClass='tb-item-start tb-item-undo' />
                  <ItemDirective prefixIcon="sf-icon-redo tb-icons" tooltipText="Redo" cssClass="tb-item-end tb-item-redo" />
                  <ItemDirective type="Separator" />
                  <ItemDirective prefixIcon='sf-icon-pan' tooltipText='Pan Tool' cssClass='tb-item-start' />
                  <ItemDirective prefixIcon='sf-icon-pointer' tooltipText='Select Tool' cssClass='tb-item-middle tb-item-selected' />
                  <ItemDirective prefixIcon='sf-icon-orthogonal_line' tooltipText='Connector Tool' template={connectorTool} />
                  <ItemDirective prefixIcon='sf-icon-text tb-icons' tooltipText='Text Tool' cssClass='tb-item-end' />
                  <ItemDirective type="Separator" visible={false} />
                  <ItemDirective prefixIcon='sf-icon-group tb-icons' visible={false} tooltipText='Group' cssClass='tb-item-start' align='Center' />
                  <ItemDirective type="Separator" visible={false} align='Center' />
                  <ItemDirective prefixIcon='sf-icon-align_left' visible={false} tooltipText='AlignLeft' cssClass='tb-item-start' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-align_center' visible={false} tooltipText='AlignCenter' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-align_right' visible={false} tooltipText='AlignRight' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-align_top' visible={false} tooltipText='AlignTop' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-align_middle' visible={false} tooltipText='AlignMiddle' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-align_bottom' visible={false} tooltipText='AlignBottom' cssClass='tb-item-end' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-distribute_vertical' visible={false} tooltipText='Distribute Vertically' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-distribute_horizontal' visible={false} tooltipText='Distribute Horizontally' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective type="Separator" visible={false} align='Center' />
                  <ItemDirective prefixIcon='sf-icon-send-to-back' visible={false} tooltipText='Send To Back' cssClass='tb-item-start' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-bring-to-front' visible={false} tooltipText='Bring To Front' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-send-backward' visible={false} tooltipText='Send Backward' cssClass='tb-item-middle' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-bring-forward' visible={false} tooltipText='Bring Forward' cssClass='tb-item-end' align='Center' />
                  <ItemDirective type="Separator" visible={false} align='Center' />
                  <ItemDirective prefixIcon='sf-icon-lock' visible={false} tooltipText='Lock' cssClass='tb-item-start' align='Center' />
                  <ItemDirective prefixIcon='sf-icon-delete' visible={false} tooltipText='Delete' cssClass='tb-item-end' align='Center' />
                  <ItemDirective type="Separator" />
                  <ItemDirective cssClass="tb-item-end tb-zoom-dropdown-btn" template={zoomTemplate} align='Right' />

                </ItemsDirective>
              </ToolbarComponent>
            </div>
            <div className="db-toolbar-hide-btn">
              <ButtonComponent id="hideProperty" isPrimary="true" iconCss='sf-icon-properties' title="Hide/Show Properties" onClick={propertyPanel} />
            </div>
          </div>
        </div>
        <div className='row content'>
          <div className='sidebar show-overview'>
            <div className="db-palette-parent">
              <SymbolPaletteComponent ref={symbolpalette => (this.symbolpalette) = symbolpalette} id="symbolpalette" width="100%" height="100%"
                expandMode={this.palettes.expandMode}
                palettes={this.palettes.palettes}
                enableSearch='true'
                getNodeDefaults={this.palettes.setPaletteNodeDefaults}
                getConnectorDefaults={this.palettes.setPaletteConnectorDefaults}
                symbolPreview={this.palettes.symbolPreview} symbolMargin={this.palettes.symbolMargin}
                getSymbolInfo={this.palettes.getSymbolInfo}
              />
            </div>
          </div>
          <div className='main-content' role='main'>
            <div className="db-diagram-container">
              <div id="diagramContainerDiv" className='db-current-diagram-container'>
                <DiagramComponent ref={diagram => (this.diagram = diagram)} id="diagram"
                  width={"100%"}
                  height={"100%"}
                  drawingObject={this.drawingObject}
                  scrollSettings={this.scrollSettings}
                  selectedItems={this.selectedItems}
                  rulerSettings={this.rulerSettings}
                  pageSettings={this.pageSettings}
                  nodes={this.nodes}
                  connectors={this.connectors}
                  backgroundColor="transparent"
                  selectionChange={this.diagramEvents.selectionChange.bind(this.diagramEvents)}
                  positionChange={this.diagramEvents.nodePositionChange.bind(this.diagramEvents)}
                  historyChange={this.diagramEvents.historyChange.bind(this.diagramEvents)}
                  created={this.created.bind(this)}
                  sizeChange={this.diagramEvents.nodeSizeChange.bind(this.diagramEvents)}
                  rotateChange={this.diagramEvents.nodeRotationChange.bind(this.diagramEvents)}
                  scrollChange={this.scrollChange.bind(this)}
                  getNodeDefaults={this.getNodeDefaults.bind(this)}
                  getConnectorDefaults={this.getConnectorDefaults.bind(this)}
                  contextMenuSettings={this.contextMenu}
                  collectionChange={this.diagramEvents.collectionChange.bind(this.diagramEvents)}
                  contextMenuClick={this.diagramEvents.contextMenuClick.bind(this)}
                  contextMenuOpen={this.diagramEvents.contextMenuOpen.bind(this)}
                  dragEnter={this.diagramEvents.dragEnter.bind(this)}
                  onUserHandleMouseDown={this.diagramEvents.userHandleClick.bind(this)}
                />
              </div>

            </div>
            <div className='db-property-editor-container' style={{ overflow: "auto" }}>
              <div id="generalDiagramContainer" className="db-general-diagram-prop-container">
                <div id='diagramPropertyContainer' className="db-diagram-prop-container">
                  <div className="row db-prop-header-text">
                    Page Settings
                    <ButtonComponent id="hide-properties" style={{ float: 'right', marginTop: "-5px" }} iconCss="sf-icon-close" cssClass="e-flat" onClick={propertyPanel} />
                  </div>
                  <div className="row db-prop-row">
                    <div className="row db-prop-header-text" style={{ paddingTop: '10px', paddingBottom: "5px" }}>Format</div>
                    <DropDownListComponent id='pageformat' ref={dropdown => this.ddlTextPosition = dropdown} dataSource={this.dropDownDataSources.paperList} change={this.diagramPropertyBinding.paperListChange.bind(this.diagramPropertyBinding)} fields={this.dropdownListFields} value={this.selectedItem.pageSettings.paperSize} />
                  </div>
                  <div className="row db-prop-header-text" style={{ paddingTop: '10px' }}>Orientation</div>
                  <div className="row db-prop-row" id="pageOrientation" >
                    <div className="col-xs-6 db-prop-col-style" style={{ marginRight: "0px", paddingTop: '10px' }}>
                      <ButtonComponent id="pagePortrait" isPrimary='true' isToggle="true" name='pageSettings' style={{ fontSize: '12px' }} iconCss="sf-icon-portrait" cssClass="e-flat e-primary" onClick={this.diagramPropertyBinding.pageOrientationChange.bind(this.diagramPropertyBinding)} content="Portrait" />
                    </div>
                    <div className="col-xs-6 db-prop-col-style" style={{ paddingTop: '10px' }}>
                      <ButtonComponent id="pageLandscape" isPrimary='true' isToggle="true" name="pageSettings" style={{ fontSize: '12px' }} iconCss="sf-icon-landscape" cssClass="e-flat e-primary e-active" onClick={this.diagramPropertyBinding.pageOrientationChange.bind(this.diagramPropertyBinding)} content="Landscape" />
                    </div>
                  </div>
                  <div className="row db-prop-row" id='pageDimension' style={{ display: "none" }}>
                    <div className="col-xs-6 db-col-left">
                      <div className="db-text-container">
                        <div className="db-text">
                          <span>W</span>
                        </div>
                        <div className="db-text-input">
                          <NumericTextBoxComponent id="pageWidth" min={100} format={"n0"} value={this.selectedItem.pageSettings.pageWidth} change={this.diagramPropertyBinding.pageDimensionChange.bind(this.diagramPropertyBinding)} />
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-6 db-col-right">
                      <div className="db-text-container">
                        <div className="db-text">
                          <span>H</span>
                        </div>
                        <div className="db-text-input">
                          <NumericTextBoxComponent id="pageHeight" min={100} format={"n0"} value={this.selectedItem.pageSettings.pageHeight} change={this.diagramPropertyBinding.pageDimensionChange.bind(this.diagramPropertyBinding)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row" id="backgroundcolor" style={{ paddingTop: '10px' }}>
                    <div className="row db-prop-header-text">Background</div>
                    <div className="col-xs-6 db-col-left">
                      <div className="db-color-container" style={{ paddingTop: '10px' }}>
                        <div className="db-color-input">
                          <ColorPickerComponent ref={colorPicker => this.colorPicker = colorPicker} showButtons="" mode="Palette" value={this.selectedItem.pageSettings.backgroundColor} change={this.diagramPropertyBinding.pageBackgroundChange1.bind(this.diagramPropertyBinding)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <CheckBoxComponent id='showPageBreaks' label="Page Breaks" checked={this.selectedItem.pageSettings.pageBreaks} change={this.diagramPropertyBinding.pageBreaksChange.bind(this.diagramPropertyBinding)} />
                  </div>
                </div>
                <div id='nodePropertyContainer' className="db-node-prop-container" style={{ display: "none" }}>
                  <div className="db-node-behaviour-prop">
                    <div className="row db-prop-header-text">
                      Properties
                      <ButtonComponent id="hide-properties" style={{ float: 'right', marginTop: "-5px" }} iconCss="sf-icon-close" cssClass="e-flat" onClick={propertyPanel} />
                    </div>
                    <div className="db-prop-separator" style={{ backgroundColor: "#b5b5b5", marginBottom: "15px" }}></div>
                    <div className="row db-prop-header-text">
                      Dimensions
                    </div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left" style={{ width: "97px", paddingRight: '5px' }}>
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>X</span>
                          </div>
                          <div className="db-text-input" style={{ paddingRight: '0px', paddingTop: '0px' }}>
                            <NumericTextBoxComponent style={{ width: "72px" }} ref={nodeOffsetX => (this.nodeOffsetX = nodeOffsetX)} id="nodeOffsetX" format="n0"
                              // value={this.selectedItem.nodeProperties.offsetX}
                              change={offsetXChange} />
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-6 db-col-right" style={{ width: "97px" }}>
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>Y</span>
                          </div>
                          <div className="db-text-input" style={{ paddingRight: '0px', paddingTop: '0px' }}>
                            <NumericTextBoxComponent style={{ width: "72px" }} ref={nodeOffsetY => (this.nodeOffsetY = nodeOffsetY)} id="nodeOffsetY" format="n0"
                              // value={this.selectedItem.nodeProperties.offsetY}
                              change={offsetYchange} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left" style={{ width: "97px", paddingRight: '5px' }}>
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>W</span>
                          </div>
                          <div className="db-text-input" style={{ paddingRight: '0px', paddingTop: '0px' }}>
                            <NumericTextBoxComponent style={{ width: "72px" }} ref={width => (this.width = width)} id="nodeWidth" min={1} format="n0"
                              // value={this.selectedItem.nodeProperties.width}
                              change={nodeWidthChange} />
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-6 db-col-right" style={{ width: "97px" }}>
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>H</span>
                          </div>
                          <div className="db-text-input" style={{ paddingRight: '0px', paddingTop: '0px' }}>
                            <NumericTextBoxComponent style={{ width: "72px" }} ref={height => (this.height = height)} id="nodeHeight" min={1} format="n0"
                              // value={this.selectedItem.nodeProperties.height}
                              change={nodeHeightChange} />
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-2 db-col-left" style={{ width: "20px", paddingLeft: "7px" }}>
                        <ButtonComponent style={{ height: '26px', width: '26px', backgroundColor: '#ffff' }} ref={aspectRatio => (this.aspectRatio = aspectRatio)} onClick={aspectRatioClick}
                          id='aspectRatioBtn' iconCss="sf-icon-unlock" isToggle={true} cssClass="e-flat"/>
                      </div>
                    </div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left">
                        <span className="db-prop-header-text">Rotate</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6 db-col-left">
                        <div className="db-text-container">
                          <div className="db-text" style={{ marginTop: '0px' }}>
                            <ButtonComponent iconCss='sf-icon-rotate tb-icons' />
                          </div>
                          <div className="db-text-input" style={{ paddingRight: '0px', paddingTop: '0px' }}>
                            <NumericTextBoxComponent ref={rotate => (this.rotate = rotate)} id="nodeRotateAngle" format="n0"
                              // value={this.selectedItem.nodeProperties.rotateAngle}
                              change={rotationChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="db-prop-separator" style={{ backgroundColor: '#b5b5b5', marginBottom: '15px' }} />
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left">
                        <ButtonComponent ref={nodeInsert => (this.nodeInsert = nodeInsert)} style={{ fontSize: '10px' }} id='insertHyperlink' content="Insert Link" onClick={hyperlinkInsert} cssClass="e-outline" isPrimary="true" />

                      </div>
                    </div>
                    <div className="db-prop-separator" />
                  </div>
                  <div id='nodeStyleProperties' className="db-node-style-prop">
                    <div className="row db-background-style">
                      <div className="row db-prop-header-text">
                        Background Type
                      </div>
                      <div className="row db-prop-row">
                        <div className="col-xs-12 db-col-left">
                          <DropDownListComponent id="backgroundTypeDropdown" ref={backgroundType => this.backgroundType = backgroundType} value={"Solid"} dataSource={this.dropDownDataSources.backgroundTypes} fields={this.dropdownListFields} popupHeight={"200px"}
                            select={this.selectedItem.backgroundTypeSelect} />
                        </div>
                      </div>
                      <div id='gradientStyle' className="row db-prop-row db-gradient-style-hide">
                        <div className="col-xs-5 db-col-left">
                          <div className="db-color-container">
                            <div className="db-color-input">
                              <ColorPickerComponent type="color" mode="Palette" showButtons='' ref={fillColor => this.fillColor = fillColor} value={this.selectedItem.nodeProperties.fillColor} change={nodeFillColor} />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-3 db-col-center">
                          <DropDownButtonComponent id="gradientDirection" iconCss='sf-icon-gradient-alignment' ref={gradientDirection => this.gradientDirection = gradientDirection} items={this.dropDownDataSources.gradientDirections}
                            fields={this.dropdownListFields} style={{ height: '26px', width: "48px" }} select={gradientDirectionChange} />
                        </div>
                        <div className="col-xs-4 db-col-right">
                          <div className="db-color-container">
                            <div className="db-color-input">
                              <ColorPickerComponent type="color" mode="Palette" showButtons='' ref={gradientColor => this.gradientColor = gradientColor} value={this.selectedItem.nodeProperties.gradientColor} id="nodeGradientColor" change={gradientColorChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row db-border-style">
                      <div className="row db-prop-header-text db-border-style-header">
                        Border/Line Styles
                        <ButtonComponent id="hide-properties" style={{ float: 'right', marginTop: "-5px" }} iconCss="sf-icon-close" cssClass="e-flat" onClick={propertyPanel} />
                      </div>
                      <div className="row db-prop-row">
                        <div className="col-xs-6 db-col-right">
                          <span className="db-prop-text-style">Border Type</span>
                        </div>
                        <div className="col-xs-2 db-col-left" style={{ marginLeft: '-15px' }}>
                          <span className="db-prop-text-style">Color</span>
                        </div>
                        <div className="col-xs-2 db-col-center" style={{ marginLeft: '16px' }}>
                          <span className="db-prop-text-style">Thickness</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-6 db-col-right" style={{ width: "90px" }}>
                          <DropDownListComponent ref={nodeBorder => this.nodeBorder = nodeBorder} id="nodeBorderStyle" value={this.selectedItem.nodeProperties.strokeStyle} dataSource={this.dropDownDataSources.borderStyles} popupWidth={"160px"} fields={this.dropdownListFields} change={nodeBorderChange} itemTemplate={this.lineItemTemplate} valueTemplate={this.lineValueTemplate} />
                        </div>
                        <div className="col-xs-2 db-col-center">
                          <div className="db-color-container" style={{ width: "55px", height: "26px", marginLeft: "0px" }}>
                            <div className="db-color-input">
                              <ColorPickerComponent id="nodeStrokeColor" ref={strokeColor => this.strokeColor = strokeColor} type="color" showButtons='' mode="Palette" value={this.selectedItem.nodeProperties.strokeColor} change={strokeColorChange} />
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-4 db-col-center" style={{ width: "70px", marginLeft: "25px" }}>
                          <div className="db-text-container" style={{ width: "70px" }}>
                            <div className="db-text-input">
                              <NumericTextBoxComponent ref={strokeWidth => this.strokeWidth = strokeWidth} style={{ width: "70px" }} id="nodeStrokeWidth" min={0} step={0.5} format={"n0"} value={this.selectedItem.nodeProperties.strokeWidth} change={strokeWidthChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row db-prop-row">
                        <div className="col-xs-2 db-col-right db-prop-text-style" style={{ marginRight: "15px", paddingTop: "6px" }}>
                          <span className="db-prop-text-style">Opacity</span>
                        </div>
                        <div className="col-xs-8 db-col-left" style={{ width: "130px", paddingRight: "10px" }}>
                          <SliderComponent ref={opacity => this.opacity = opacity}
                            // value={this.selectedItem.nodeProperties.opacity} 
                            min={0} max={100} step={10} type='MinRange' change={opacityChange} />
                        </div>
                        <div className="col-xs-2 db-col-right">
                          <input id='nodeOpacitySliderText' type="text" value={this.selectedItem.nodeProperties.opacityText} readOnly={true} className="db-readonly-input" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='connectorPropertyContainer' className="db-connector-prop-container" style={{ display: "none" }}>
                  <div className="row db-prop-header-text">
                    Connector Properties
                    <ButtonComponent id="hide-properties" style={{ float: 'right', marginTop: "-5px" }} iconCss="sf-icon-close" cssClass="e-flat" onClick={propertyPanel} />
                  </div>
                  <div className="db-prop-separator" style={{ backgroundColor: '#b5b5b5', marginBottom: '15px' }}></div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">Connector Type</span>
                    </div>
                    <div className="col-xs-4 db-col-left db-prop-text-style" style={{ marginLeft: "19px" }} >
                      <span className="db-prop-text-style">Color</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 db-col-left">
                      <DropDownListComponent ref={lineType => this.lineType = lineType} value={this.selectedItem.connectorProperties.lineType} dataSource={this.dropDownDataSources.lineTypes} fields={this.dropdownListFields} change={lineTypeChange} />
                    </div>
                    <div className="col-xs-4 db-col-left">
                      <div className="db-color-container" style={{ width: '77px', marginLeft: "18px" }}>
                        <div className="db-color-input">
                          <ColorPickerComponent ref={lineColor => this.lineColor = lineColor} showButtons="" mode="Palette" type="color" id="lineColor" value={this.selectedItem.connectorProperties.lineColor} change={lineColorChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">Stroke Style</span>
                    </div>
                    <div className="col-xs-4 db-col-right db-prop-text-style" style={{ marginLeft: "18px" }}>
                      <span className="db-prop-text-style">Thickness</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 db-col-left">
                      <DropDownListComponent popupWidth={'160px'} ref={lineStyle => this.lineStyle = lineStyle} id="lineStyle" value={this.selectedItem.connectorProperties.lineStyle} dataSource={this.dropDownDataSources.lineStyles} fields={this.dropdownListFields} itemTemplate={this.lineItemTemplate} valueTemplate={this.lineValueTemplate} change={lineStyleChange} />
                    </div>
                    <div className="col-xs-6 db-col-right">
                      <div className="db-text-container" style={{ width: "77px", marginLeft: "20px" }}>
                        <div className="db-text-input">
                          <NumericTextBoxComponent style={{ width: "74px" }} min={0.5} step={0.5} format={"n0"} ref={lineWidth => this.lineWidth = lineWidth} value={this.selectedItem.connectorProperties.lineWidth} change={lineWidthChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">Start Arrow</span>
                    </div>
                    <div className="col-xs-4 db-col-right db-prop-text-style" style={{ marginLeft: "19px" }}>
                      <span className="db-prop-text-style">Size</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 db-col-left">
                      <DropDownListComponent ref={sourceType => this.sourceType = sourceType} value={this.selectedItem.connectorProperties.sourceType} dataSource={this.dropDownDataSources.decoratorList} fields={this.dropdownListFields} change={sourceTypeChange} />
                    </div>
                    <div className="col-xs-6 db-col-right">
                      <div className="db-text-container" style={{ width: "77px", marginLeft: "20px" }}>
                        <div className="db-text-input">
                          <NumericTextBoxComponent style={{ width: "74px" }} format={"n0"} ref={sourceSize => this.sourceSize = sourceSize} min={1} step={1} value={this.selectedItem.connectorProperties.sourceSize} change={sourceSizeChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">End Arrow</span>
                    </div>
                    <div className="col-xs-4 db-col-right db-prop-text-style" style={{ marginLeft: "19px" }}>
                      <span className="db-prop-text-style">Size</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 db-col-left">
                      <DropDownListComponent ref={targetType => this.targetType = targetType} value={this.selectedItem.connectorProperties.targetType} dataSource={this.dropDownDataSources.decoratorList} fields={this.dropdownListFields} change={targetTypeChange} />
                    </div>
                    <div className="col-xs-6 db-col-right">
                      <div className="db-text-container" style={{ width: "77px", marginLeft: "20px" }}>
                        <div className="db-text-input">
                          <NumericTextBoxComponent style={{ width: "74px" }} format={"n0"} ref={targetSize => this.targetSize = targetSize} min={1} step={1} value={this.selectedItem.connectorProperties.targetSize} change={targetSizeChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left">
                      <CheckBoxComponent ref={bridge => this.bridge = bridge} id='lineJump' label="Bridging" checked={this.selectedItem.connectorProperties.lineJump} change={bridgeChange} />
                    </div>
                    <div className="col-xs-6 db-col-right" id="lineJumpSizeDiv" style={{ display: "none" }}>
                      <div className="db-text-container" style={{ width: "77px", marginLeft: "20px" }}>
                        <div className="db-text-input">
                          <NumericTextBoxComponent style={{ width: "74px" }} format={"n0"} ref={bridgeSize => this.bridgeSize = bridgeSize} min={1} step={1} value={this.selectedItem.connectorProperties.lineJumpSize} change={bridgeSizeChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                      <span className="db-prop-text-style">Opacity</span>
                    </div>
                    <div className="col-xs-8 db-col-left" style={{ paddingRight: "15px", paddingLeft: '15px' }}>
                      <SliderComponent id='default' ref={connectorOpacity => this.connectorOpacity = connectorOpacity} 
                      // value={this.selectedItem.connectorProperties.opacity} 
                      min={0} max={100} step={10} type='MinRange' change={connectorOpacityChange} />
                    </div>
                    <div className="col-xs-2 db-col-right">
                      <input id='connectorOpacitySliderText' value={this.selectedItem.connectorProperties.opacityText} readOnly={true}  type="text" className="db-readonly-input" />
                    </div>
                  </div>
                </div>
                <div id='textPropertyContainer' className="db-text-prop-container" style={{ display: "none" }}>
                  <div className="db-prop-separator" />
                  <div className="col-xs-8 db-col-left db-prop-text-style">
                    <span className="db-prop-text-style">Text</span>
                  </div>
                  <div className="col-xs-4 db-col-left db-prop-text-style">
                    <span className="db-prop-text-style">Size</span>
                  </div>
                  <div className="row db-prop-row" style={{ marginTop: '5px' }}>
                    <div className="col-xs-8 db-col-left" style={{ width: "140px" }}>
                      <DropDownListComponent style={{ height: '35px' }} ref={fontFamily => this.fontFamily = fontFamily} dataSource={this.dropDownDataSources.fontFamilyList} fields={this.dropdownListFields} change={fontFamilyChange} />
                    </div>
                    <div className="col-xs-4 db-col-right">
                      <div className="db-text-container">
                        <div className="db-text-input">
                          <NumericTextBoxComponent style={{ width: '75px' }} min={1} format={"n0"} ref={fontSize => this.fontSize = fontSize} step={1} value={this.selectedItem.textProperties.fontSize} change={fontSizeChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-8 db-col-left" id="textPositionDiv" style={{ width: '140px' }}>
                      <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} dataSource={this.selectedItem.textProperties.textPositionDataSource} index={3} fields={this.dropdownListFields} change={this.diagramPropertyBinding.textPositionChange.bind(this.diagramPropertyBinding)} />
                    </div>
                    <div className="col-xs-4 db-col-right" id="textColorDiv" style={{ width: '75px', }}>
                      <div className="db-color-container">
                        <div className="db-color-input">
                          <ColorPickerComponent ref={fontColor => this.fontColor = fontColor} showButtons='' mode="Palette" type="color" value={this.selectedItem.textProperties.fontColor} change={fontColorChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row" style={{ marginTop: '10px' }}>
                    <div className="col-xs-6 db-col-left">
                      <ToolbarComponent id='toolbarTextStyle' overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextStyleChange.bind(this.diagramPropertyBinding)}>
                        <ItemsDirective>
                          <ItemDirective prefixIcon="sf-icon-bold tb-icons" tooltipText="Bold" cssClass="tb-item-start" />
                          <ItemDirective prefixIcon="sf-icon-italic tb-icons" tooltipText="Italic" cssClass="tb-item-middle" />
                          <ItemDirective prefixIcon="sf-icon-underline tb-icons" tooltipText="Underline" cssClass="tb-item-end" />
                        </ItemsDirective>
                      </ToolbarComponent>
                    </div>
                    <div className="col-xs-6 db-col-right" >
                      <ToolbarComponent id='toolbarTextSubAlignment' overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextSubAlignChange.bind(this.diagramPropertyBinding)}>
                        <ItemsDirective>
                          <ItemDirective prefixIcon="sf-icon-align-left tb-icons" tooltipText="Align Text Left" cssClass="tb-item-start" />
                          <ItemDirective prefixIcon="sf-icon-align-center tb-icons" tooltipText="Align Text Center" cssClass="tb-item-middle" />
                          <ItemDirective prefixIcon="sf-icon-align-right tb-icons" tooltipText="Align Text Right" cssClass="tb-item-end" />
                        </ItemsDirective>
                      </ToolbarComponent>
                    </div>
                  </div>
                  <div className="row db-prop-row" id='toolbarTextAlignmentDiv' style={{ marginTop: '20px' }}>
                    <ToolbarComponent id='toolbarTextAlignment' ref={toolbarTextAlignment => toolbarTextAlignment = toolbarTextAlignment} overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextAlignChange.bind(this.diagramPropertyBinding)}>
                      <ItemsDirective>
                        <ItemDirective prefixIcon="sf-icon-align-text-left tb-icons" tooltipText="Align Right" cssClass="tb-item-start" />
                        <ItemDirective prefixIcon="sf-icon-align-text-horizontal-center tb-icons" tooltipText="Align Center" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-align-text-rignt tb-icons" tooltipText="Align Left" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-align-text-top tb-icons" tooltipText="Align Bottom" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-align-text-vertical-center tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-align-text-bottom tb-icons" tooltipText="Align Top" cssClass="tb-item-end" />
                      </ItemsDirective>
                    </ToolbarComponent>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-2 db-col-right db-prop-text-style" style={{ marginRight: '15px', paddingTop: "6px" }}>
                      <span className="db-prop-text-style">Opacity</span>
                    </div>
                    <div className="col-xs-8 db-col-left" style={{ width: '130px', paddingRight: "10px" }}>
                      <SliderComponent ref={fontOpacity => this.fontOpacity = fontOpacity} value={this.selectedItem.textProperties.opacity} min={0} max={100} step={10} type='MinRange' change={fontOpacityChange} />
                    </div>
                    <div className="col-xs-2 db-col-right">
                      <input id='textOpacityText' type="text" value={this.selectedItem.textProperties.opacityText} readOnly={true} className="db-readonly-input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogComponent ref={dialog => this.exportDialog = dialog} id="exportDialog" width={"400px"} header='Export Diagram' target={this.dlgTarget} isModal={true} animationSettings={this.dialogAnimationSettings} buttons={this.exportingButtons} showCloseIcon={true} content={footTemplate} visible={this.dialogVisibility} />
      <DialogComponent id="printDialog" ref={dialog => this.printDialog = dialog} width={"335px"} header='Print Diagram' target={this.dlgTarget} isModal={true} animationSettings={this.dialogAnimationSettings} buttons={this.printingButtons} content={printTemplateChange} visible={this.dialogVisibility} />
      <DialogComponent id="hyperlinkDialog" ref={dialog => this.hyperlinkDialog = dialog} width={"400px"} header='Insert Link' target={this.dlgTarget} isModal={true} visible={this.dialogVisibility} animationSettings={this.dialogAnimationSettings} showCloseIcon={true} buttons={this.hyperlinkButtons} content={hyperLinkTemplate} />
    </div>);
  }
  //To rename the title of the Diagram
  renameDiagram() {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    const element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
  }
  diagramNameKeyDown(args) {
    if (args.which === 13) {
      document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
  }
  diagramNameChange() {
    document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
    document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    // this.selectedItem.exportSettings.fileName = document.getElementById('diagramName').innerHTML;
  }
  generateDiagram() {
    this.selectedItem.selectedDiagram = this.diagram;
  }
  //To upload diagram data from the browser
  uploader() {
    let uploadObj = new Uploader({
      asyncSettings: {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
      },
      success: this.onUploadSuccess,
      showFileList: false
    });
    uploadObj.appendTo('#fileupload');
  }
  //to read the uploaded file to load diagram
  onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
  }

  //Load the diagraming object.
  loadDiagram(event) {
    let diagrm = document.getElementById('diagram').ej2_instances[0];
    diagrm.loadDiagram(event.target.result);
  }

  //To load the initial properities of the diagram objects to property panel
  loadPage() {
    document.getElementsByClassName('diagrambuilder-container')[0].style.display = '';
    this.selectedItem.selectedDiagram.updateViewPort();
    this.selectedItem.nodeProperties.offsetX = this.nodeOffsetX;
    this.selectedItem.nodeProperties.offsetY = this.nodeOffsetY;
    this.selectedItem.nodeProperties.width = this.width;
    this.selectedItem.nodeProperties.height = this.height;
    this.selectedItem.nodeProperties.aspectRatio = this.aspectRatio;
    this.selectedItem.nodeProperties.rotateAngle = this.rotate;
    this.selectedItem.nodeProperties.fillColor = this.fillColor;
    this.selectedItem.nodeProperties.gradientDirection = this.gradientDirection;
    this.selectedItem.nodeProperties.gradientColor = this.gradientColor;
    this.selectedItem.nodeProperties.strokeStyle = this.nodeBorder;
    this.selectedItem.nodeProperties.opacity = this.opacity;
    this.selectedItem.nodeProperties.strokeWidth = this.strokeWidth;
    this.selectedItem.nodeProperties.strokeColor = this.strokeColor;
    this.selectedItem.connectorProperties.lineType = this.lineType;
    this.selectedItem.connectorProperties.lineColor = this.lineColor;
    this.selectedItem.connectorProperties.lineStyle = this.lineStyle;
    this.selectedItem.connectorProperties.lineWidth = this.lineWidth;
    this.selectedItem.connectorProperties.sourceType = this.sourceType;
    this.selectedItem.connectorProperties.targetType = this.targetType;
    this.selectedItem.connectorProperties.sourceSize = this.sourceSize;
    this.selectedItem.connectorProperties.targetSize = this.targetSize;
    this.selectedItem.connectorProperties.lineJump = this.bridge;
    this.selectedItem.connectorProperties.lineJumpSize = this.bridgeSize;
    this.selectedItem.connectorProperties.opacity = this.connectorOpacity;
    this.selectedItem.textProperties.fontFamily = this.fontFamily;
    this.selectedItem.textProperties.fontSize = this.fontSize;
    this.selectedItem.textProperties.fontColor = this.fontColor;
    this.selectedItem.textProperties.opacity = this.fontOpacity;
    this.selectedItem.exportSettings.fileName = document.getElementById('diagramName').innerHTML;
  }
  //To add and arrange the menu bar objects before hovering of menu bar
  beforeItemRender(args) {
    const shortCutText = this.getShortCutKey(args.item.text);
    if (shortCutText) {
      const shortCutSpan = createElement('span');
      shortCutSpan.textContent = shortCutText;
      shortCutSpan.style.pointerEvents = 'none';
      args.element.appendChild(shortCutSpan);
      shortCutSpan.setAttribute('class', 'db-shortcut');
    }
    const status = this.UtilityMethods.enableMenuItems(args.item.text, this.selectedItem);
    if (status) {
      args.element.classList.add('e-disabled');
    }
    else {
      if (args.element.classList.contains('e-disabled')) {
        args.element.classList.remove('e-disabled');
      }
    }
  }
  // To define the behavior and options of the context menu for Design Memu tab
  designContextMenuOpen(args) {
    if (args.element.classList.contains('e-menu-parent')) {
      const popup = document.querySelector('#btnDesignMenu-popup');
      args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
      args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
  }
  //To customize the context menu behavior and options for specific nodes, connectors or the diagram for Edit Men tab
  editContextMenuOpen(args) {
    if (args.element.classList.contains('e-menu-parent')) {
      var popup = document.querySelector('#btnEditMenu-popup');
      args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
      args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
  }
  toolContextMenuOpen(args) {
    if (args.element.classList.contains('e-menu-parent')) {
      var popup = document.querySelector('#btnToolsMenu-popup');
      args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
      args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
  }
  //To set the connector line stroke style template
  lineItemTemplate(data) {
    return (<div className='db-ddl-template-style'><span className={data.className} /></div>);
  }
  // set the value to value template
  lineValueTemplate(data) {
    return (<div className='db-ddl-template-style'><span className={data.className} /></div>);
  }
  //Returns the HTML Template for the Export Dialog box
  footerTemplate() {
    return (<div id="exportDialogContent">
      <div className="row">
        <div className="row">
          File Name
        </div>
        <div className="row db-dialog-child-prop-row">
          <input type="text" id="exportfileName" />
        </div>
      </div>
      <div className="row db-dialog-prop-row">
        <div className="col-xs-6 db-col-left">
          <div className="row">
            Format
          </div>
          <div className="row db-dialog-child-prop-row">
            <DropDownListComponent id="exportFormat" ref={dropdown => this.ddlTextPosition = dropdown} value={this.selectedItem.exportSettings.format} dataSource={this.dropDownDataSources.fileFormats} fields={this.dropdownListFields} />

          </div>
        </div>
        <div className="col-xs-6 db-col-right">
          <div className="row">
            Region
          </div>
          <div className="row db-dialog-child-prop-row">
            <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} id="exportRegion" value={this.selectedItem.exportSettings.region} dataSource={this.dropDownDataSources.diagramRegions} fields={this.dropdownListFields} />
          </div>
        </div>
      </div>
    </div>);
  }
  //Returns the HTML Template for the Print Dialog box
  printTemplate() {
    return (<div id="printDialogContent">
      <div className="row">
        <div className="row">
          Region
        </div>
        <div className="row db-dialog-child-prop-row">
          <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} value={this.selectedItem.printSettings.region} dataSource={this.dropDownDataSources.diagramRegions} fields={this.dropdownListFields} />
        </div>
      </div>
      <div className="row db-dialog-prop-row">
        <div className="row">
          Print Settings
        </div>
        <div className="row db-dialog-child-prop-row">
          <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} dataSource={this.dropDownDataSources.paperList} fields={this.dropdownListFields} value={this.selectedItem.pageSettings.paperSize} />
        </div>
      </div>
      <div id="printCustomSize" className="row db-dialog-prop-row" style={{ display: "none", height: "28px" }}>
        <div className="col-xs-6 db-col-left">
          <div className="db-text-container">
            <div className="db-text">
              <span>W</span>
            </div>
            <div className="db-text-input">
              <NumericTextBoxComponent id="printPageWidth" min={100} step={1} format="n0" value={this.selectedItem.printSettings.pageWidth} />
            </div>
          </div>
        </div>
        <div className="col-xs-6 db-col-right">
          <div className="db-text-container">
            <div className="db-text">
              <span>H</span>
            </div>
            <div className="db-text-input">
              <NumericTextBoxComponent id="printPageHeight" min={100} step={1} format="n0" value={this.selectedItem.printSettings.pageHeight} />
            </div>
          </div>
        </div>
      </div>
      <div id="printOrientation" className="row db-dialog-prop-row" style={{ height: "28px", padding: "5px 0px" }}>
        <div className="col-xs-3 db-prop-col-style" style={{ marginRight: "8px" }}>
          <RadioButtonComponent id='printPortrait' label="Portrait" name="printSettings" checked={this.selectedItem.printSettings.isPortrait} />
        </div>
        <div className="col-xs-3 db-prop-col-style">
          <RadioButtonComponent id='printLandscape' label="Landscape" name="printSettings" checked={this.selectedItem.printSettings.isLandscape} />
        </div>
      </div>
      <div className="row db-dialog-prop-row" style={{ marginTop: "16px" }}>
        <CheckBoxComponent id='printMultiplePage' label="Scale to fit 1 page" checked={this.selectedItem.printSettings.multiplePage} />
      </div>
    </div>);
  }
  //Returns the HTML Template for the insert hyperlink Dialog box
  hyperlinkTemplate() {
    return (<div id="hyperlinkDialogContent">
      <div className="row">
        <div className="row">Enter URL</div>
        <div className="row db-dialog-child-prop-row">
          <input type="text" id="hyperlink" />
        </div>
      </div>
      <div className="row db-dialog-prop-row">
        <div className="row">Link Text (Optional)</div>
        <div className="row db-dialog-child-prop-row">
          <input type="text" id="hyperlinkText" />
        </div>
      </div>
    </div>);
  }
  //To get the required buttons for dialog box
  getDialogButtons(dialogType) {
    const buttons = [];
    // eslint-disable-next-line
    switch (dialogType) {
      case 'export':
        buttons.push({
          click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
        });
        break;
      case 'print':
        buttons.push({
          click: this.btnPrintClick.bind(this), buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
        });
        break;
      case 'hyperlink':
        buttons.push({
          click: this.btnHyperLink.bind(this), buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
        });
        break;
    }
    buttons.push({
      click: this.btnCancelClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
    });
    return buttons;
  }
  // Function to handle the export button click and initiate the export process.
  btnExportClick() {
    var diagram = this.selectedItem.selectedDiagram;
    var region = document.getElementById("exportRegion").ej2_instances[0];
    var format = document.getElementById("exportFormat").ej2_instances[0];
    // var fileName = document.getElementById("diagramEditable").ej2_instances[0];
    diagram.exportDiagram({
      fileName: document.getElementById('exportfileName').value,
      format: format.value,
      region: region.value,
      multiplePage: diagram.pageSettings.multiplePage
    });
    this.exportDialog.hide();
  }
  // Function to handle the print button click and initiate the print process.
  btnPrintClick() {
    let pageWidth = this.selectedItem.printSettings.pageWidth;
    let pageHeight = this.selectedItem.printSettings.pageHeight;
    const paperSize = this.UtilityMethods.getPaperSize(this.selectedItem.printSettings.paperSize);
    if (paperSize.pageHeight && paperSize.pageWidth) {
      pageWidth = paperSize.pageWidth;
      pageHeight = paperSize.pageHeight;
    }
    if (this.selectedItem.pageSettings.isPortrait) {
      if (pageWidth > pageHeight) {
        const temp = pageWidth;
        pageWidth = pageHeight;
        pageHeight = temp;
      }
    }
    else {
      if (pageHeight > pageWidth) {
        const temp = pageHeight;
        pageHeight = pageWidth;
        pageWidth = temp;
      }
    }
    const diagram = this.selectedItem.selectedDiagram;
    diagram.print({
      "region": this.selectedItem.printSettings.region,
      "pageHeight": pageHeight, "pageWidth": pageWidth,
      "multiplePage": !this.selectedItem.printSettings.multiplePage,
      "pageOrientation": this.selectedItem.printSettings.isPortrait ? 'Portrait' : 'Landscape'
    });
    this.printDialog.hide();
  }
  // Function to handle the insert hyperlink button click
  hyperlinkInsert() {
    const diagram = this.selectedItem.selectedDiagram;
    if (diagram.selectedItems.nodes.length > 0) {
      document.getElementById('hyperlink').value = '';
      document.getElementById('hyperlinkText').value = '';
      if (diagram.selectedItems.nodes[0].annotations.length > 0) {
        const annotation = diagram.selectedItems.nodes[0].annotations[0];
        if (annotation.hyperlink.link || annotation.content) {
          document.getElementById('hyperlink').value = annotation.hyperlink.link;
          document.getElementById('hyperlinkText').value = (annotation.hyperlink.content || annotation.content);
        }
      }
      this.hyperlinkDialog.show();
    }
  }
  //Function to add hyperlink to the selected Item
  btnHyperLink() {
    const node = this.selectedItem.selectedDiagram.selectedItems.nodes[0];
    if (node.annotations.length > 0) {
      node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
      node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
      this.selectedItem.selectedDiagram.dataBind();
    }
    else {
      const annotation = {
        hyperlink: {
          content: document.getElementById('hyperlinkText').value,
          link: document.getElementById('hyperlink').value
        }
      };
      this.selectedItem.selectedDiagram.addLabels(node, [annotation]);
      this.selectedItem.selectedDiagram.dataBind();
    }
    this.hyperlinkDialog.hide();
  }

  // Function for close button to close the diaglog box
  btnCancelClick(args) {
    const ss = args.target;
    const key = ss.offsetParent.id;
    // eslint-disable-next-line
    switch (key) {
      case 'exportDialog':
        this.exportDialog.hide();
        break;
      case 'printDialog':
        this.printDialog.hide();
        break;
      case 'hyperlinkDialog':
        this.hyperlinkDialog.hide();

    }
  }

  // Function to handle click events on the toolbar editor.
  toolbarEditorClick(args) {
    var diagram = this.selectedItem.selectedDiagram;
    var item = args.item.tooltipText;
    switch (item) {
      case 'Undo':
        diagram.undo();
        break;
      case 'Redo':
        diagram.redo();
        break;
      case 'Select Tool':
        diagram.clearSelection();
        diagram.tool = DiagramTools.Default;
        break;
      case 'Pan Tool':
        diagram.clearSelection()
        diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'Text Tool':
        diagram.clearSelection()
        diagram.selectedItems.userHandles = [];
        diagram.drawingObject = { shape: { type: 'Text' }, };
        diagram.tool = DiagramTools.ContinuousDraw;
        break;
      case 'Group':
        diagram.group();
        args.item.prefixIcon = 'sf-icon-ungroup';
        args.item.tooltipText = 'UnGroup';
        break;
      case 'UnGroup':
        diagram.unGroup();
        args.item.prefixIcon = 'sf-icon-group';
        args.item.tooltipText = 'Group';
        break;
      case 'AlignLeft':
        diagram.align('Left');
        break;
      case 'AlignRight':
        diagram.align('Right');
        break;
      case 'AlignCenter':
        diagram.align('Center');
        break;
      case 'AlignMiddle':
        diagram.align('Middle');
        break;
      case 'AlignTop':
        diagram.align('Top');
        break;
      case 'AlignBottom':
        diagram.align('Bottom');
        break;
      case 'Distribute Vertically':
        diagram.distribute('BottomToTop');
        break;
      case 'Distribute Horizontally':
        diagram.distribute('RightToLeft');
        break;
      case 'Send To Back':
        diagram.sendToBack();
        break;
      case 'Bring To Front':
        diagram.bringToFront();
        break;
      case 'Send Backward':
        diagram.sendBackward();
        break;
      case 'Bring Forward':
        diagram.moveForward();
        break;
      case 'Lock':
        this.lockObject(diagram);
        break;
      case 'Delete':
        diagram.remove();
        break;
    }
    if (item === 'Select Tool' || item === 'Pan Tool' || item === 'Text Tool') {
      if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
        this.removeSelectedToolbarItem();
        args.item.cssClass += ' tb-item-selected';
      }
    }
    diagram.dataBind();
  };

  //To remove the selected icon css on toolbar option selection change
  removeSelectedToolbarItem() {
    var toolbarEditor = document.getElementById("toolbarEditor").ej2_instances[0];
    for (var i = 0; i < toolbarEditor.items.length; i++) {
      var item = toolbarEditor.items[i];
      if (item.cssClass.indexOf('tb-item-selected') !== -1) {
        item.cssClass = item.cssClass.replace(' tb-item-selected', '');
      }
    }
    // toolbarEditor.dataBind();
    // document.getElementById('btnDrawConnector').classList.remove('tb-item-selected');
  };

  // Function to render the DropDown template for the zoom toolbar
  zoomTemplate() {
    return (<div id="template_toolbar">
      <DropDownButtonComponent id="btnZoomIncrement" items={this.dropDownDataSources.zoomMenuItems} content={Math.round(this.selectedItem.selectedDiagram.scrollSettings.currentZoom* 100)} select={zoomchange} />
    </div>);
  }
  //Method to change the values of zoom dropdown in toolbar

  zoomChange(args) {
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    var diagram = this.selectedItem.selectedDiagram;
    var currentZoom = diagram.scrollSettings.currentZoom;
    var zoom = {};
    switch (args.item.text) {
      case 'Zoom In':
        diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom Out':
        diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom to Fit':
        diagram.fitToPage({ mode: 'Page', region: 'Content' });
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
        break;
      case 'Zoom to 50%':
        if (currentZoom === 0.5) {
          currentZoom = 0;
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        } else {
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 100%':
        if (currentZoom === 1) {
          currentZoom = 0;
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        } else {
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 200%':
        if (currentZoom === 2) {
          currentZoom = 0;
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
    }

    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';

  }
  // Function to render the DropDown template for the draw connector button
  connectorTool() {
    return (<div id="template_toolbar">
      <DropDownButtonComponent id="btnDrawConnector" items={this.dropDownDataSources.drawConnectorsList} select={connectorToolChange} iconCss='sf-icon-orthogonal_line' />
    </div>);
  }
  //To hide or show the Property panel on button click
  propertyPanel() {
    this.selectedItem.utilityMethods.hideElements('hide-properties', this.selectedItem.selectedDiagram)
  }

  //function to enable draw connector tool
  connectorToolChange(args) {
    var diagram = this.selectedItem.selectedDiagram;
    let toolbarEditor = document.getElementById('toolbarEditor').ej2_instances[0];
    diagram.clearSelection();
    diagram.drawingObject.sourceID = '';
    diagram.drawingObject = { type: args.item.text };
    diagram.drawingObject.shape = { type: 'Bpmn', sequence: 'Normal' };
    diagram.tool = DiagramTools.ContinuousDraw;
    diagram.selectedItems.userHandles = [];
    diagram.dataBind();
    this.removeSelectedToolbarItem();
    // toolbarEditor.items[5].cssClass += ' tb-item-selected';
    setTimeout(() => {
      let con = document.getElementById('btnDrawConnector');
      con.classList.add('tb-item-selected');
    }, 100);
  }

  // Function to add keyboard shortcut key for a specific action 
  getShortCutKey(menuItem) {
    let shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
    // eslint-disable-next-line
    switch (menuItem) {
      case 'New':
        // eslint-disable-next-line
        shortCutKey = 'Shift' + '+N';
        break;
      case 'Open':
        shortCutKey = shortCutKey + '+O';
        break;
      case 'Save':
        shortCutKey = shortCutKey + '+S';
        break;
      case 'Undo':
        shortCutKey = shortCutKey + '+Z';
        break;
      case 'Redo':
        shortCutKey = shortCutKey + '+Y';
        break;
      case 'Cut':
        shortCutKey = shortCutKey + '+X';
        break;
      case 'Copy':
        shortCutKey = shortCutKey + '+C';
        break;
      case 'Paste':
        shortCutKey = shortCutKey + '+V';
        break;
      case 'Delete':
        shortCutKey = 'Delete';
        break;
      case 'Duplicate':
        shortCutKey = shortCutKey + '+D';
        break;
      case 'Select All':
        shortCutKey = shortCutKey + '+A';
        break;
      case 'Zoom In':
        shortCutKey = shortCutKey + '++';
        break;
      case 'Zoom Out':
        shortCutKey = shortCutKey + '+-';
        break;
      case 'Group':
        shortCutKey = shortCutKey + '+G';
        break;
      case 'Ungroup':
        shortCutKey = shortCutKey + '+U';
        break;
      case 'Send To Back':
        shortCutKey = shortCutKey + '+Shift+B';
        break;
      case 'Bring To Front':
        shortCutKey = shortCutKey + '+Shift+F';
        break;
      default:
        shortCutKey = '';
        break;
    }
    return shortCutKey;
  }
  //Triggers when diagram created event triggered
  created() {
    var diagram = this.selectedItem.selectedDiagram;
    diagram.fitToPage({ mode: 'Width' });
    var btnZoomIncrement = document.getElementById("btnZoomIncrement").ej2_instances[0];
    btnZoomIncrement.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';
    // var btnhide=(document.getElementById('hideProperty'));
    // btnhide.ej2_instances[0].isPrimary = true;
    // document.getElementById('btnDrawConnector').classList.add('tb-item-selected');
  }
  // Function to handle changes in the scroll state and update the zoom content when scrolling in the diagram.
  scrollChange(args) {
    var diagram = this.selectedItem.selectedDiagram;
    if (args.panState !== 'Start') {
      var btnZoomIncrement = document.getElementById("btnZoomIncrement").ej2_instances[0];
      btnZoomIncrement.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';
    }
  }
  // Function to define default properties for a nodes in the diagram.
  getNodeDefaults(obj) {
    obj.userHandles = [];
    obj.ports = this.getNodePorts(obj);
    return obj;
  }

  // Function to define default properties for a connector in the diagram.
  getConnectorDefaults(connector) {
    // connector.type = 'Orthogonal';
    connector.hitPadding = 10;
    connector.bezierSettings = {
      controlPointsVisibility: ControlPointsVisibility.Source | ControlPointsVisibility.Target
      , smoothness: BezierSmoothness.SymmetricDistance
    }
    if (connector.annotations.length > 0) {
      connector.annotations[0].style.fill = 'White'
    }
    return connector;
  };
  //function to define ports for node
  getNodePorts(obj) {
    var ports = [
      { id: 'left', shape: 'Circle', offset: { x: 0, y: 0.5 } },
      { id: 'bottom', shape: 'Circle', offset: { x: 0.5, y: 1 } },
      { id: 'right', shape: 'Circle', offset: { x: 1, y: 0.5 } },
      { id: 'top', shape: 'Circle', offset: { x: 0.5, y: 0 } }
    ];
    return ports;
  }
  // Function to Arrange Menu ITems before Opening the context Menu bar Items,
  arrangeMenuBeforeOpen(args) {
    for (var i = 0; i < args.element.children.length; i++) {
      args.element.children[i].style.display = 'block';
    }

    if (args.event && closest(args.event.target, '.e-dropdown-btn') !== null) {
      args.cancel = true;
    }
  }
  // Function to Arrange Menu ITems before closing the context Menu bar Items,

  arrangeMenuBeforeClose(args) {
    if (args.event && closest(args.event.target, '.e-dropdown-btn') !== null) {
      args.cancel = true;
    }
    if (!args.element) {
      args.cancel = true;
    }
  }
  // Function to handle click events on the menu items and execute corresponding actions in the diagram.
  menuClick(args) {
    const buttonElement = document.getElementsByClassName('e-btn-hover')[0];
    if (buttonElement) {
      buttonElement.classList.remove('e-btn-hover');
    }
    let toolbarEditor = document.getElementById('toolbarEditor').ej2_instances[0];
    const diagram = this.selectedItem.selectedDiagram;
    const commandType = args.item.text;
    switch (commandType) {
      case 'New':
        diagram.clear();
        DiagramClientSideEvents.prototype.historyChange();
        break;
      case 'Open':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
      case 'Save':
        this.selectedItem.exportSettings.fileName = document.getElementById('diagramName').innerHTML.value;
        this.download(diagram.saveDiagram());
        break;
      case 'Print':
        this.selectedItem.printSettings.pageHeight = this.selectedItem.pageSettings.pageHeight;
        this.selectedItem.printSettings.pageWidth = this.selectedItem.pageSettings.pageWidth;
        this.selectedItem.printSettings.paperSize = this.selectedItem.pageSettings.paperSize;
        this.selectedItem.printSettings.isPortrait = this.selectedItem.pageSettings.isPortrait;
        this.selectedItem.printSettings.isLandscape = !this.selectedItem.pageSettings.isPortrait;
        this.printDialog.show();
        break;
      case 'Export':
        var filename = this.UtilityMethods.fileName();
        document.getElementById('exportfileName').value = filename;
        this.exportDialog.show();
        break;
      case 'Open':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
      case 'Undo':
        diagram.undo();
        break;
      case 'Redo':
        diagram.redo();
        break;
      case 'Cut':
        diagram.cut();
        break;
      case 'Copy':
        diagram.copy();
        break;
      case 'Paste':
        diagram.paste();
        break;
      case 'Rotate Right 90':
        diagram.rotate(diagram.selectedItems, 90);
        break;
      case 'Rotate Left 90':
        diagram.rotate(diagram.selectedItems, -90);
        break;
      case 'Delete':
        diagram.remove();
        break;
      case 'Select All':
        diagram.clearSelection();
        diagram.selectAll();
        break;
      case 'Select All Nodes':
        diagram.clearSelection();
        diagram.select(diagram.nodes);
        break;
      case 'Select All Connectors':
        diagram.clearSelection();
        diagram.select(diagram.connectors);
        break;
      case 'Deselect All':
        diagram.clearSelection();
        break;
      case 'Selection Tool':
        diagram.tool = DiagramTools.Default;
        this.removeSelectedToolbarItem();
        break;
      case 'Pan Tool':
        diagram.clearSelection();
        diagram.tool = DiagramTools.ZoomPan;
        this.removeSelectedToolbarItem();
        break;
      case 'Orthogonal':
        diagram.clearSelection();
        this.connectorToolChange(args);
        break;
      case 'Straight':
        diagram.clearSelection();
        this.connectorToolChange(args);
        break;
      case 'Bezier':
        diagram.clearSelection();
        this.connectorToolChange(args);
        break;
      case 'Show Lines':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Snap To Grid':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Snap To Object':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Show Ruler':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
        break;
      case 'Show Page Breaks':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.pageSettings.showPageBreaks = !diagram.pageSettings.showPageBreaks;
        //showPageBreaks.checked = !showPageBreaks.checked;
        break;
      case 'Show Multiple page':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.pageSettings.multiplePage = !diagram.pageSettings.multiplePage;
        break;
      case 'Fit To Width':
        diagram.fitToPage({ mode: 'Width' });
        break;
      case 'Fit To Page':
        diagram.fitToPage({ mode: 'Page', region: 'Content' });
        break;
      case 'Landscape':
        args.item.parentObj.items[1].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Landscape';
        document.getElementById('pageLandscape').classList.add('e-active');
        document.getElementById('pagePortrait').classList.remove('e-active');
        break;
      case 'Portrait':
        args.item.parentObj.items[0].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Portrait';
        document.getElementById('pagePortrait').classList.add('e-active');
        document.getElementById('pageLandscape').classList.remove('e-active');
        break;
      case 'Letter (8.5 in x 11 in)':
      case 'Legal (8.5 in x 14 in)':
      case 'A3 (297 mm x 420 mm)':
      case 'A4 (210 mm x 297 mm)':
      case 'A5 (148 mm x 210 mm)':
      case 'A6 (105 mm x 148 mm)':
      case 'Tabloid (279 mm x 432 mm)':
        this.diagramPropertyBinding.paperListChange(args, diagram)
        this.diagramPropertyBinding.updateSelection(args.item);
        this.selectedItem.pageSettings.paperSize = args.item.value;
        var pageformat = document.getElementById('pageformat').ej2_instances[0];
        pageformat.element.value = args.item.text;
        break;
    }
    if (commandType === 'Pan Tool') {
      if (toolbarEditor.items[3].cssClass.indexOf('tb-item-selected') === -1) {
        toolbarEditor.items[3].cssClass += ' tb-item-selected';
      }
    }
    else if (commandType === 'Selection Tool') {
      if (toolbarEditor.items[4].cssClass.indexOf('tb-item-selected') === -1) {
        toolbarEditor.items[4].cssClass += ' tb-item-selected';
      }
    }
    // else if (commandType === 'Orthogonal' || commandType === 'Straight' || commandType === 'Bezier') {
    //   // toolbarEditor.items[5].cssClass += ' tb-item-selected';
    //   // toolbarEditor.dataBind();
    //   // document.getElementById('btnDrawConnector').classList.add('tb-item-selected');
    // }
    diagram.dataBind();
  }


  //Function To save the diagram
  download(data) {
    if (window.navigator.msSaveBlob) {
      var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      var a = document.createElement('a');
      a.href = dataStr;
      a.download = document.getElementById('diagramName').innerHTML + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
  // Function to handle mouseover events on the menu bar items and manage their behavior, including toggling dropdown menus and applying styles.
  menumouseover(args) {
    var target = args.target;
    var diagram = this.selectedItem.selectedDiagram;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
      target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
      if (this.buttonInstance && this.buttonInstance.id !== target.id) {
        if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
          this.buttonInstance.toggle();
          const buttonElement = document.getElementById(this.buttonInstance.element.id);
          buttonElement.classList.remove('e-btn-hover');
        }
      }
      var button1 = target.ej2_instances[0];
      this.buttonInstance = button1;
      if (button1.getPopUpElement().classList.contains('e-popup-close')) {
        button1.toggle();
        if (button1.element.id === 'btnEditMenu') {
          this.enableEditMenuItems(diagram);
        }
        const buttonElement = document.getElementById(this.buttonInstance.element.id);
        buttonElement.classList.add('e-btn-hover');
      }
    }
    else {
      if (closest(target, '.e-dropdown-popup') === null && closest(target, '.e-dropdown-btn') === null) {
        if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
          this.buttonInstance.toggle();
          const buttonElement = document.getElementById(this.buttonInstance.element.id);
          buttonElement.classList.remove('e-btn-hover');
        }
      }
    }
  }
  // Function to enable or disable specific items in the  Menu bar 
  enableEditMenuItems(diagram) {
    var contextInstance = document.getElementById('editContextMenu');
    var contextMenu = contextInstance.ej2_instances[0];
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    for (var i = 0; i < contextMenu.items.length; i++) {
      contextMenu.enableItems([contextMenu.items[i].text], false);
    }
    var objects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
    if (objects.length > 0) {
      contextMenu.enableItems(['Cut', 'Copy', 'Delete', 'Order Commands', 'Rotate']);
    }
    if (diagram.historyManager.undoStack.length > 0) {
      contextMenu.enableItems(['Undo']);
    }
    if (diagram.historyManager.redoStack.length > 0) {
      contextMenu.enableItems(['Redo']);
    }
    if ((diagram.commandHandler.clipboardData.pasteIndex !== undefined
      && diagram.commandHandler.clipboardData.clipObject !== undefined)) {
      contextMenu.enableItems(['Paste']);
    }
  }
  //To enable or diable interactions for selected node or connector
  lockObject(diagram) {
    for (let i = 0; i < (diagram).selectedItems.nodes.length; i++) {
      let node = diagram.selectedItems.nodes[i];
      if (node.constraints & NodeConstraints.Drag) {
        node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
      } else {
        node.constraints = NodeConstraints.Default;
      }
    }
    for (let i = 0; i < diagram.selectedItems.connectors.length; i++) {
      let connector = diagram.selectedItems.connectors[i];
      if (connector.constraints & ConnectorConstraints.Drag) {
        connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
      } else {
        connector.constraints = ConnectorConstraints.Default;
      }
    }
    diagram.dataBind();
  }
  //function to handle changes in the offsetX value of a node property
  offsetX(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.offsetX.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
    }
  }
  //function to handle changes in the offsetY value of a node property
  offsetY(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.offsetY.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
    }
  }
  //function to handle changes in the width of a node property
  nodeWidth(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.width.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'width', propertyValue: args });
    }
  }
  //function to handle changes in the height of a node property
  nodeHeight(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.height.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'height', propertyValue: args });
    }
  }
  // Function to handle changes in the rotation angle of a node when it is interactively adjusted.
  nodeRotationChange(args) {
    this.selectedItem.nodeProperties.rotateAngle.value = args.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
  }
  // Function to handle changes in the fill color of a node when it is interactively adjusted.
  nodeFillColorChange(args) {
    this.selectedItem.nodeProperties.fillColor.value = args.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'fillColor', propertyValue: args.currentValue.hex });
  }
  // To set gradient color direction in a node from the gradient dropdown menu.
  gradientDropDownChange(args) {
    this.selectedItem.nodeProperties.gradientDirection.value = args.item.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args });
    // this.selectedItem.nodeProperties.getGradient(this.selectedItem.diagram.selectedItems.nodes[0]);
  }
  // Function to handle changes in the gradient color of a node when it is interactively adjusted.
  nodeGradientColorChange(args) {
    this.selectedItem.nodeProperties.gradientColor.value = args.currentValue.hex;
    this.selectedItem.nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
  }
  //To change the opacity level of a node
  nodeOpacityChange(args) {
    this.selectedItem.nodeProperties.opacity.value = args.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
  //To change the connector type of selected connector
  connectorTypeChange(args) {
    this.selectedItem.connectorProperties.lineType.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
  }
  //To change the fill color of the connector
  connectorColorChange(args) {
    this.selectedItem.connectorProperties.lineColor.value = args.currentValue.hex;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
  }
  //To change the stroke style of the connector
  ConnectorLineStyle(args) {
    this.selectedItem.connectorProperties.lineStyle.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
  }
  //To change the stroke width of the connector
  ConnectorLineWidthChnage(args) {
    this.selectedItem.connectorProperties.lineWidth.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
  }
  //To change the sourceDecorator shape of the selected connector
  connectorSourceType(args) {
    this.selectedItem.connectorProperties.sourceType.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });
  }
  //To change the targetDecorator shape of the selected connector
  connectorTargetType(args) {
    this.selectedItem.connectorProperties.targetType.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
  }
  //To change the sourceDecorator shape size of the selected connector
  connectorSourceSize(args) {
    this.selectedItem.connectorProperties.sourceSize.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });
  }
  //To change the targetDecorator shape size of the selected connector
  connectorTargetSize(args) {
    this.selectedItem.connectorProperties.targetSize.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
  }
  //To change the connector constraints to enable or disable connector bridging
  connectorBridgeChange(args) {
    if (args.checked) {
      document.getElementById('lineJumpSizeDiv').style.display = '';
    }
    else {
      document.getElementById('lineJumpSizeDiv').style.display = 'none';
    }
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineJump', propertyValue: args });
  }
  //To change the brdiging line jumb size of the selected connector
  connectorBridgeSize(args) {
    this.selectedItem.connectorProperties.lineJumpSize.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineJumpSize', propertyValue: args });
  }
  //To change the opacity level of a connector
  ConnectorOpacityChange(args) {
    this.selectedItem.connectorProperties.opacity.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
  //To change the annotation font family of the selected node/connector
  nodeFontFamilyChange(args) {
    this.selectedItem.textProperties.fontFamily.value = args.value;
    this.selectedItem.textPropertyChange({ propertyName: 'fontFamily', propertyValue: args });
  }
  //To change the annotation font size of the selected node/connector
  nodeFontSizeChange(args) {
    this.selectedItem.textProperties.fontSize.value = args.value;
    this.selectedItem.textPropertyChange({ propertyName: 'fontSize', propertyValue: args });
  }
  //To change the annotation font color of the selected node/connector
  nodeFontColor(args) {
    this.selectedItem.textProperties.fontColor.value = args.currentValue.hex;
    this.selectedItem.textPropertyChange({ propertyName: 'fontColor', propertyValue: args });
  }
  //To change the annotation font opacity level of the selected node/connector
  fontOpacityChangeEvent(args) {
    this.selectedItem.textProperties.opacity.value = args.value;
    this.selectedItem.textPropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
  //To change the stroke line width of the connector of selected Item
  nodeStrokeWidthChange(args) {
    this.selectedItem.nodeProperties.strokeWidth.value = args.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
  }
  //To change the stroke line style of the connector of selected Item
  nodeBoderStyleChange(args) {
    this.selectedItem.nodeProperties.strokeStyle.value = args.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
  }
  //To change the stroke line color of the connector of selected Item
  nodeStrokeColorChange(args) {
    this.selectedItem.nodeProperties.strokeColor.value = args.currentValue.hex;
    this.selectedItem.nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
  }
  //set the aspect ratio constraints to the node
  aspectRatioClick(args) {
    let diagram = this.selectedItem.selectedDiagram;
    let node = diagram.selectedItems.nodes[0];
    var isAspect = true;
    let aspectRatioBtn = document.getElementById('aspectRatioBtn').ej2_instances[0];
    if (document.getElementById('aspectRatioBtn').classList.contains('e-active')) {
      isAspect = true;
      aspectRatioBtn.iconCss = 'sf-icon-lock'
    }
    else {
      isAspect = false;
      aspectRatioBtn.iconCss = 'sf-icon-unlock';
    }
    this.selectedItem.nodePropertyChange({ propertyName: 'aspectRatio', propertyValue: isAspect });
  };
}

export default App;
