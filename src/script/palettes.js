/**
 *  Palette handler
 */
 import { PortVisibility, PortConstraints } from '@syncfusion/ej2-diagrams';
 import { NodeConstraints } from '@syncfusion/ej2-diagrams';
 

 export class Palettes {
     constructor() {
       
         this.expandMode = 'Multiple';
         this.symbolPreview = { height: 50, width: 50 };
         this.symbolMargin = { left: 10, right: 5, top: 10, bottom: 10 };
         this.palettes = [
             { id: 'bpmnshapes', expanded: true, symbols: this.getBPMNShapes(), title: 'BPMN Shapes'},
         ];
     }
     getSymbolInfo(symbol) {
        return {  tooltip: symbol.id.replace('_',' ')};;
     }
     //To set Node default values in Symbol palette
     setPaletteNodeDefaults(node) {
        //  node.width = 35;
        //  node.height = 55;
         node.ports = [
             { offset: { x: 0, y: 0.5 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
             { offset: { x: 0.5, y: 0 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
             { offset: { x: 1, y: 0.5 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw },
             { offset: { x: 0.5, y: 1 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Draw }
         ];
        //  node.style.strokeColor = '#3A3A3A';
     }
     //To set connector default values in Symbol palette
     setPaletteConnectorDefaults(connector) {
        // connector.width = 30;
        // connector.height = 50;
        connector.style.strokeColor = '#3A3A3A';
    }
    // To get BPMN Shapes
    getBPMNShapes()
     {
         const symbols =[
            {
                id: 'Task', width: 35, height: 30, 
                shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'Task',
                    },
                },
            },
            {
                id: 'Gateway', width: 30, height: 30, 
                shape: { type: 'Bpmn', shape: 'Gateway',}
            },
            {
                id: 'Intermediate_Event', width: 30, height: 30, shape: {
                    type: 'Bpmn', shape: 'Event',
                    event: { event: 'Intermediate' }
                },
            },
            {
                id: 'End_Event', width: 30, height: 30,  shape: {
                    type: 'Bpmn', shape: 'Event',
                    event: { event: 'End' }
                },
            },
            {
                id: 'Start_Event', width: 30, height: 30, shape: {
                    type: 'Bpmn', shape: 'Event',
                    event: { event: 'Start' }
                },
            },
            {
                id:'Collapsed_Sub-process', width:35,height:30,shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess', subProcess: { collapsed: true, boundary: 'Default' }
                    },
                },
            },
             {
                id: 'Expanded_Sub-Process', width: 35, height: 30, 
                constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
                shape: {
                    shape: 'Activity', type: 'Bpmn',
                    activity: {
                        activity: 'SubProcess', subProcess: {
                            type: 'Transaction', collapsed: false,
                            processes: [], transaction: {
                                cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                            }
                        }
                    }
                },
            },
            {
                id:'Sequence_Flow',
                sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
                type: 'Straight',targetDecorator:{shape:'Arrow',style:{fill:'black'}},
                shape: { type: 'Bpmn', flow: 'Sequence',sequence: 'Normal'
                },
            },
            {
                id:'Association_Flow',
                sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 35 },
                type: 'Straight',style:{strokeDashArray:"2 2"},
                targetDecorator:{shape:'None'},sourceDecorator:{shape:'None'},
                shape: { type: 'Bpmn', flow: 'Association',association:'Default'}, 
            },
            {
                id:'Message_Flow',
                sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 22 },type: 'Straight',
                sourceDecorator:{shape:'None'},targetDecorator:{shape:'Arrow',style:{fill:'white'}},
                style:{strokeDashArray:'4 4'}
            },
            {
                id: 'Message', width: 35,height: 26, 
                shape: { type: 'Bpmn', shape: 'Message',},
              },
                {
                id:'Data_Source', width:30,height:28, shape: {
                    type: 'Bpmn', shape: 'DataSource',  
                }
            },
            {
                id: 'Data_Object', width: 30, height: 35, 
                shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } },
            },
        
           
        ]
        return symbols;
     }
   
 }