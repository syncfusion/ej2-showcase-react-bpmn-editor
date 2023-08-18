import { Node, Connector, ShapeAnnotation, PathAnnotation,SelectorConstraints } from '@syncfusion/ej2-diagrams';


export class DiagramClientSideEvents {
    
    constructor(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }

    handles = [
        {
            name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',tooltip:{content:'Clone'},
            visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
        },
        {
            name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',tooltip:{content:'Delete'},
            visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
        },
        {
            name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',tooltip:{content:'Draw'},
            visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
        },
    ];
    
    //Method for Selection Change event
    selectionChange(args) {
        
        if (args.state === 'Changed') {
            const diagram = this.selectedItem.selectedDiagram;
            var multiSelect;
            var toolbarEditor = document.getElementById("toolbarEditor").ej2_instances[0];
                let selectedItems = diagram.selectedItems.nodes;
                selectedItems = selectedItems.concat(this.selectedItem.selectedDiagram.selectedItems.connectors);
                this.enableToolbarItems(selectedItems);
                var nodeContainer = document.getElementById('nodePropertyContainer');
                nodeContainer.classList.remove('multiple');
                nodeContainer.classList.remove('connector');
                if (selectedItems.length > 1) {
                    multiSelect = true;
                    for(var i =7;i<=26;i++){
                        toolbarEditor.items[i].visible = true;
                    }
                    this.multipleSelectionSettings(selectedItems);
                    toolbarEditor.items[8].tooltipText = 'Group';
                    toolbarEditor.items[8].prefixIcon = 'sf-icon-group';
                }
                else if (selectedItems.length === 1) {
                    multiSelect = false;
                    for(var i=7;i<=26;i++){
                        if(i<=17)
                        {
                            toolbarEditor.items[i].visible = false;
                        }
                        else{
                            toolbarEditor.items[i].visible = true;
    
                        }
                    }
                    if(selectedItems[0].children && selectedItems[0].children.length>0)
                    {
                        toolbarEditor.items[8].tooltipText = 'UnGroup';
                        toolbarEditor.items[8].prefixIcon = 'sf-icon-ungroup';
                        toolbarEditor.items[8].visible = true;
                    }
                    this.singleSelectionSettings(selectedItems[0]);
                }
                else {
                    this.selectedItem.utilityMethods.objectTypeChange('diagram');//diagram
                    for(var i =7;i<=26;i++){
                        toolbarEditor.items[i].visible = false;
                    } 
                }
                if(args.newValue.length>0 && (args.newValue[0]).type === undefined){
                    diagram.selectedItems = { constraints: SelectorConstraints.All|SelectorConstraints.UserHandle, userHandles: this.handles};
                    if(diagram.selectedItems.nodes.length>0){
                        this.drawingNode = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length-1];
                    }
                }
                else{
                diagram.selectedItems = { constraints:SelectorConstraints.All&~SelectorConstraints.UserHandle };
                }

        }
    }

    //To enable the Toolbar items
    enableToolbarItems(selectedItems) {
        const toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        let toolbarClassName = 'db-toolbar-container';
        if (toolbarContainer.classList.contains('db-undo')) {
            toolbarClassName += ' db-undo';
        }
        if (toolbarContainer.classList.contains('db-redo')) {
            toolbarClassName += ' db-redo';
        }
        toolbarContainer.className = toolbarClassName;
        if (selectedItems.length === 1) {
            toolbarContainer.className = toolbarContainer.className + ' db-select';
            if (selectedItems[0] instanceof Node) {
                if (selectedItems[0].children) {
                    if (selectedItems[0].children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                    }
                    else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                    }
                }
                else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        }
        else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        }
        else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            // let isNodeExist: boolean = false;
            for (const item of selectedItems) {
                if (item instanceof Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    }
    
    //Triggers while dragging the elements in diagram
    nodePositionChange(args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.offsetX.value = (Math.round(args.newValue.offsetX * 100) / 100);
        this.selectedItem.nodeProperties.offsetY.value = (Math.round(args.newValue.offsetY * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }
     //Triggers when a node is resized
    nodeSizeChange(args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.width.value = (Math.round(args.newValue.width * 100) / 100);
        this.selectedItem.nodeProperties.height.value = (Math.round(args.newValue.height * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }
    //Triggers when the diagram is zoomed or panned
    scrollChange(args) {
        this.selectedItem.scrollSettings.currentZoom = (args.newValue.CurrentZoom * 100).toFixed() + '%';
    }
    //Triggers when the diagram elements are rotated
    nodeRotationChange(args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.rotateAngle.value = (Math.round(args.newValue.rotateAngle * 100) / 100);
        this.selectedItem.preventPropertyChange = false;
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
        }
    }
    userHandleClick = function(args)
    {
        var diagram = document.getElementById("diagram").ej2_instances[0];
        switch(args.element.name)
        {
            case 'Delete':
                diagram.remove();
                break;
            case 'Clone':
               diagram.paste(diagram.selectedItems.selectedObjects);
               break;
            case 'Draw':
                if(diagram.drawingObject !== undefined){
                diagram.drawingObject.shape = {};
                diagram.drawingObject.type = diagram.drawingObject.type?diagram.drawingObject.type:'Orthogonal';
                diagram.drawingObject.sourceID = this.drawingNode.id;
                diagram.dataBind();
                }
                else{
                    diagram.drawingObject = {type:'Orthogonal', sourceID: this.drawingNode.id,shape:{type:'Bpmn',sequence:'Normal'}};
                }
                break;
        }
    }
    //Triggers when a symbol is dragged into diagram from symbol palette
    dragEnter(args) {
        const obj = args.element;
        const ratio = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
        if(args.element.type === 'Straight')
            {
                if(args.element.sourceDecorator && args.element.style.strokeDashArray === '4 4'){
                    args.element.shape = {
                        type: 'Bpmn',
                        flow: 'Message',
                        message: 'Default'
                            }
                }  
            }
            else if(args.element.shape.shape === 'Activity')
            {
                if(args.element.shape.activity.activity === 'Task')
                {
                    args.element.width = 96; args.element.height = 72;
                }
                else if(args.element.shape.activity.activity === 'SubProcess')
                {
                    if(args.element.shape.activity.subProcess.collapsed)
                    {
                    args.element.width = 96; args.element.height = 72;
                    }
                    else{
                    args.element.width = 576; args.element.height = 384;
                    }
                }
            }
            else if(args.element.shape.shape === 'Event')
            {
                args.element.width = 50; args.element.height = 50;
            }
            else if(args.element.shape.shape === 'Gateway')
            {
                args.element.width = 60; args.element.height = 60;
            }
            else if(args.element.shape.shape === 'Message')
            {
                args.element.width = 72; args.element.height = 48;
            }
            else if(args.element.shape.shape === 'DataObject')
            {
                args.element.width = 48; args.element.height = 63;
            }
            else if(args.element.shape.shape === 'DataSource')
            {
                args.element.width = 96; args.element.height = 72;
            }
    }
    //To enable or disable undo/redo options in toolbar
    historyChange(args) {
        var diagram = document.getElementById("diagram").ej2_instances[0];
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
        if (this.selectedItem) {
            this.selectedItem.utilityMethods.viewSelectionChange(diagram);
        }
        }      
    // To update the property panels and Tool bar for multiple selected items in the diagram.
    multipleSelectionSettings(selectedItems) {
        this.selectedItem.utilityMethods.objectTypeChange('None');
        let showConnectorPanel = false;
        let showNodePanel = false;
        let showTextPanel = false;
        let showConTextPanel = false;
        const nodeContainer = document.getElementById('nodePropertyContainer');
        for (const item of selectedItems) {
            const object = item;
            if (object instanceof Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
            else if (object instanceof Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        const selectItem1 = this.selectedItem.selectedDiagram.selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.selectedItem.utilityMethods.bindNodeProperties(selectItem1.nodes[0], this.selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            this.selectedItem.utilityMethods.bindConnectorProperties(selectItem1.connectors[0], this.selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            }
            else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                    // this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                }
                else {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                    // this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                }
                this.ddlTextPosition.dataBind();
            }
        }
    }
    // To update the property panels and Tool bar for single selected items in the diagram.
    singleSelectionSettings(selectedObject) {
        let object = null;
        if (selectedObject instanceof Node) {
            this.selectedItem.utilityMethods.objectTypeChange('node');
            object = selectedObject;
            this.selectedItem.utilityMethods.bindNodeProperties(object, this.selectedItem);
        }
        else if (selectedObject instanceof Connector) {
            this.selectedItem.utilityMethods.objectTypeChange('connector');
            object = selectedObject;
            this.selectedItem.utilityMethods.bindConnectorProperties(object, this.selectedItem);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            this.selectedItem.utilityMethods.bindTextProperties(object.style, this.selectedItem);
        }
        else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            let annotation;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            this.selectedItem.utilityMethods.bindTextProperties(object.annotations[0].style, this.selectedItem);
            this.selectedItem.utilityMethods.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ShapeAnnotation) {
                annotation = object.annotations[0];
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = this.selectedItem.utilityMethods.getPosition(annotation.offset);
                this.ddlTextPosition.dataBind();
            }
            else if (object.annotations[0] instanceof PathAnnotation) {
                annotation = object.annotations[0];
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = annotation.alignment;
                this.ddlTextPosition.dataBind();
            }
        }
    }
    //To customize and control the items displayed in the context menu based on the selected diagram elements.
    contextMenuOpen(args){
        let diagram = this.selectedItem.selectedDiagram;
        this.selectedItem.utilityMethods.updateContextMenuSelection(false, args, diagram);
        let hiddenId = [];
        if (args.element.className !== 'e-menu-parent e-ul ') {
            hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundary', 'DataObject',
                'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay','Copy','Paste','Cut','SelectAll','Delete',
            'Association','Sequence','MessageFlow','Condition type','Direction','MessageType','TextAnnotation'];
        }
        for (var i = 0; i < args.items.length; i++) {
            if(args.items[i].text === 'Paste')
            {
                if(diagram.commandHandler.clipboardData.pasteIndex !== undefined
                    && diagram.commandHandler.clipboardData.clipObject !==undefined){
                        hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);
                        
                    }
            }
            if(args.items[i].text === 'Select All')
            {
                if((diagram.nodes.length || diagram.connectors.length))
                {
                    hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);
                }
            }
            var canAllow = false;
            if(diagram.selectedItems.nodes.length && diagram.selectedItems.nodes[0].shape.shape !== 'TextAnnotation'){
                if(diagram.selectedItems.nodes[0].children === undefined ){
                    canAllow = true;
                }
                else{
                    var item = args.items[i];
                    if(item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete')
                        {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        } 
                }
            }
            if( diagram.selectedItems.connectors.length && !(diagram.selectedItems.connectors[0].targetID.includes('newAnnotation'))){
                canAllow = true;
            }
            var selectedObjects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
            if ((diagram.selectedItems.nodes.length || diagram.selectedItems.connectors.length) && canAllow && selectedObjects.length === 1) {
                
                    var item = args.items[i];
                    if(diagram.selectedItems.nodes.length< 1 && diagram.selectedItems.connectors.length)
                    {
                        if(diagram.selectedItems.connectors[0].shape && diagram.selectedItems.connectors[0].shape.type === 'Bpmn')
                        {
                            if(item.text === 'Association' && diagram.selectedItems.connectors[0].shape.flow === 'Association')
                            {
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('Direction'), 1);
                            }
                            else if(item.text === 'Sequence' && diagram.selectedItems.connectors[0].shape.flow === 'Sequence')
                            {
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                                hiddenId.splice(hiddenId.indexOf('Condition type'), 1);
                            }
                            else if(item.text === 'Message Flow' && diagram.selectedItems.connectors[0].shape.flow === 'Message')
                            {
                                hiddenId.splice(hiddenId.indexOf('Association'), 1);
                                hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                                hiddenId.splice(hiddenId.indexOf('MessageType'), 1);
                            }
                        }
                    }
                    
                    if(item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete')
                        {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }    
    
                    if(diagram.selectedItems.nodes.length){
                    var bpmnShape = diagram.selectedItems.nodes[0].shape;
                    if(bpmnShape.type !== 'Text'){
                    if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
                        if (item.text === 'Ad-Hoc') {
                            if (bpmnShape.activity.activity === 'SubProcess') {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Loop' || item.text === 'Compensation') {
                            if (bpmnShape.shape === 'Activity') {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Activity-Type') {
                            if (bpmnShape.shape === 'Activity' && (bpmnShape.activity.activity === 'Task' || (bpmnShape.activity.activity === 'SubProcess' && bpmnShape.activity.subProcess.collapsed))) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Boundary') {
                            if ((bpmnShape.activity.activity === 'SubProcess')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                    }
                    if(item.text === 'Add Text Annotation'){
                        if(diagram.selectedItems.nodes.length && diagram.selectedItems.nodes[0].shape.shape !== 'Message' && diagram.selectedItems.nodes[0].shape.shape !== 'DataSource'){
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Data Object') {
                        if ((bpmnShape.shape === 'DataObject')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Collection') {
                        if ((bpmnShape.shape === 'DataObject')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Task Call') {
                        if ((bpmnShape.shape === 'Activity') &&
                            (bpmnShape.activity.activity === 'Task')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Trigger Result') {
                        if ((bpmnShape.shape === 'Event')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Event Type') {
                        if ((bpmnShape.shape === 'Event')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'Task Type') {
                        if ((bpmnShape.shape === 'Activity') &&
                            (bpmnShape.activity.activity === 'Task')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                    if (item.text === 'GateWay') {
                        if ((bpmnShape.shape === 'Gateway')) {
                            hiddenId.splice(hiddenId.indexOf(item.id), 1);
                        }
                    }
                }
            }
            }
            else if(selectedObjects.length>1){
                let item = args.items[i];
                if(item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete')
                {
                    if(hiddenId.indexOf(item.id)>-1)
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
        }
        this.selectedItem.utilityMethods.updateContextMenuSelection(true, args, diagram);
        args.hiddenItems = hiddenId;
        diagram.dataBind();
    };
    //Performs the action based on the selected context menu option
    contextMenuClick(args){
        let diagram = this.selectedItem.selectedDiagram;
        if (diagram.selectedItems.nodes.length > 0) {
            let bpmnShape = diagram.selectedItems.nodes[0].shape ;
            if (args.item.iconCss) {
                if (args.item.iconCss.indexOf('e-adhocs') > -1) {
                    bpmnShape.activity.subProcess.adhoc = args.item.id === 'AdhocNone' ? false : true;
                }
                if (args.item.iconCss.indexOf('e-event') > -1) {
                    bpmnShape.event.event = args.item.id;
                }
                if (args.item.iconCss.indexOf('e-trigger') > -1) {
                    bpmnShape.event.trigger = args.item.text;
                }
                if (args.item.iconCss.indexOf('e-loop') > -1) {
                    let loop = (args.item.id === 'LoopNone') ? 'None' : args.item.id;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.loop = loop ;
                    }
                    if (bpmnShape.activity.activity === 'SubProcess') {
                        bpmnShape.activity.subProcess.loop = loop;
                    }
                }
                if (args.item.iconCss.indexOf('e-compensation') > -1) {
                    let compensation= (args.item.id === 'CompensationNone') ? false : true;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.compensation = compensation;
                    }
                    if (bpmnShape.activity.activity === 'SubProcess') {
                        bpmnShape.activity.subProcess.compensation = compensation;
                    }
                }
                if (args.item.iconCss.indexOf('e-call') > -1) {
                    let compensation = (args.item.id === 'CallNone') ? false : true;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.call = compensation;
                    }
                }
      
                if (args.item.iconCss.indexOf('e-boundry') > -1) {
                    let call= args.item.id;
                    if (args.item.id !== 'Default') {
                        call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                    }
                    bpmnShape.activity.subProcess.boundary = call;
                }
                if (args.item.iconCss.indexOf('e-data') > -1) {
                    let call = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
                    bpmnShape.dataObject.type = call;
                }
                if (args.item.iconCss.indexOf('e-collection') > -1) {
                    let call= (args.item.id === 'Collectioncollection') ? true : false;
                    bpmnShape.dataObject.collection = call;
                }
                if (args.item.iconCss.indexOf('e-task') > -1) {
                    let task = args.item.id === 'TaskNone' ? 'None' : args.item.id;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.type = task;
                    }
                }
                if (args.item.iconCss.indexOf('e-gate') > -1) {
                    let task = args.item.id.replace('Gateway', '');
                    if (bpmnShape.shape === 'Gateway') {
                        bpmnShape.gateway.type = task;
                    }
                }
            }
            if (args.item.id === 'CollapsedSubProcess' || args.item.id === 'ExpandedSubProcess') {
                if (args.item.id === 'ExpandedSubProcess') {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = false;
                } else {
                    bpmnShape.activity.activity = 'SubProcess';
                    bpmnShape.activity.subProcess.collapsed = true;
                }
            }
            
            diagram.dataBind();
        }
        if (args.item.id === 'Paste') {
          diagram.paste();
        }
        if (args.item.id === 'SelectAll'){
          diagram.selectAll();
        }
        if (diagram.selectedItems.connectors.length && (diagram.selectedItems.connectors[0].shape)) {
            if (args.item.id === 'Association') {
                ((diagram.selectedItems.connectors[0].shape)).flow = 'Association';
            }
            if (args.item.id === 'Sequence') {
                (diagram.selectedItems.connectors[0].shape).flow = 'Sequence';
            }
            if (args.item.id === 'MessageFlow') {
                (diagram.selectedItems.connectors[0].shape).flow = 'Message';
            }
            if (args.item.id === 'None') {
                (diagram.selectedItems.connectors[0].shape).flow === 'Sequence' ?
                    (diagram.selectedItems.connectors[0].shape).sequence = 'Default' :
                    (diagram.selectedItems.connectors[0].shape).flow === 'Association' ?
                        (diagram.selectedItems.connectors[0].shape).association = 'Default' :
                        (diagram.selectedItems.connectors[0].shape).message = 'Default';
            }
            if (args.item.id === 'Directional' || args.item.id === 'BiDirectional') {
                args.item.id === 'Directional' ?
                    (diagram.selectedItems.connectors[0].shape).association = 'Directional' :
                    (diagram.selectedItems.connectors[0].shape).association = 'BiDirectional';
            }
            if (args.item.id === 'Conditional Flow' || args.item.id === 'Normal Flow') {
                args.item.id === 'Conditional Flow' ?
                    (diagram.selectedItems.connectors[0].shape).sequence = 'Conditional' :
                    (diagram.selectedItems.connectors[0].shape).sequence = 'Normal';
            }
            if (args.item.id === 'InitiatingMessage' || args.item.id === 'NonInitiatingMessage') {
                args.item.id === 'InitiatingMessage' ?
                    (diagram.selectedItems.connectors[0].shape).message = 'InitiatingMessage' :
                    (diagram.selectedItems.connectors[0].shape).message = 'NonInitiatingMessage';
            }
            diagram.dataBind();
        }
        if (args.item.id === 'Cut') {
            diagram.cut();
        }if (args.item.id === 'Copy') {
            diagram.copy();
        }
        if (args.item.id === 'Delete'){
          diagram.remove();
        }
        if(args.item.id === 'TextAnnotation'){
            diagram.addTextAnnotation({ id: 'newAnnotation', text: 'Text', length: 150, angle: 290 }, diagram.selectedItems.nodes[0])
        }
        diagram.dataBind();
      
    }
    //Triggers when a node/connector is added/removed to/from the diagram.
    collectionChange(args){
        if (args.state === 'Changed') {
            this.selectedItem.isModified = true;
        }
    }
}
export class DiagramPropertyBinding {
    constructor(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }
    //To update Page breaks in the diagram
    pageBreaksChange(args) {
        if (args.event) {
            this.selectedItem.pageSettings.pageBreaks = args.checked;
            this.selectedItem.selectedDiagram.pageSettings.showPageBreaks = args.checked;
        }
    }
    //To update the Page  based on Dimension and Orientation of the diagram
    paperListChange(args) {
        if (args.element) {
            const diagram = this.selectedItem.selectedDiagram;
            document.getElementById('pageDimension').style.display = 'none';
            document.getElementById('pageOrientation').style.display = '';
            var value = args.value || args.item.value;
            const paperSize = this.selectedItem.utilityMethods.getPaperSize(value);
            let pageWidth = paperSize.pageWidth;
            let pageHeight = paperSize.pageHeight;
            if (pageWidth && pageHeight) {
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
                diagram.pageSettings.width = pageWidth;
                diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
            else {
                document.getElementById('pageOrientation').style.display = 'none';
                document.getElementById('pageDimension').style.display = '';
                diagram.pageSettings.width = 1460;
                diagram.pageSettings.height = 600;
            }
            let designContextMenu = document.getElementById('designContextMenu').ej2_instances[0];
            this.updatePaperSelection(designContextMenu.items[1], args.value);
            diagram.dataBind();
        }
    }
    //To update the selected paper size icon based on the current value in a list of items.
    updatePaperSelection(items, value) {
        for (var i = 0; i < items.items.length; i++) {
            if (value === items.items[i].value) {
                items.items[i].iconCss = 'sf-icon-check-tick';
            }
            else {
                items.items[i].iconCss = '';
            }
        }
    };
    // update the selection icon based on check and uncheck values of the Menubar Items.
    updateSelection(item) {
        for (var i = 0; i < item.parentObj.items.length; i++) {
            if (item.text === item.parentObj.items[i].text) {
                item.parentObj.items[i].iconCss = 'sf-icon-check-tick';
            }
            else {
                item.parentObj.items[i].iconCss = '';
            }
        }
    };
    //To update the Height and Width of the Diagram
    pageDimensionChange(args) {
        if (args.event) {
            let pageWidth = Number(this.selectedItem.pageSettings.pageWidth);
            let pageHeight = Number(this.selectedItem.pageSettings.pageHeight);
            let target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            const diagram = this.selectedItem.selectedDiagram;
            if (target.id === 'pageWidth') {
                pageWidth = Number(target.value);
            }
            else {
                pageHeight = Number(target.value);
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                }
                else {
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                }
                this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
                this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    }
    //To update the Orientation of the Diagram
    pageOrientationChange(args) {
        if (args) {
            const target = args.currentTarget;
            var designContextMenu = document.getElementById('designContextMenu').ej2_instances[0];
            var items = designContextMenu.items;
            const diagram = this.selectedItem.selectedDiagram;
            // eslint-disable-next-line
            switch (target.id) {
                case 'pagePortrait':
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                    items[0].items[0].iconCss = '';
                    items[0].items[1].iconCss = 'sf-icon-check-tick';
                    document.getElementById('pageLandscape').classList.remove('e-active');
                    break;
                case 'pageLandscape':
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    items[0].items[0].iconCss = 'sf-icon-check-tick';
                    items[0].items[1].iconCss = '';
                    diagram.pageSettings.orientation = 'Landscape';
                    document.getElementById('pagePortrait').classList.remove('e-active');
                    break;
            }
            diagram.dataBind();
            this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width;
            this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height;
        }
    }
    //To update the Page Background color
    pageBackgroundChange1(args) {
        if (args.currentValue) {
            // const target: HTMLInputElement = args.targetHTMLInputElement; 
            const diagram = this.selectedItem.selectedDiagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    }
    //To update position in the text Properties
    textPositionChange(args) {
        if (args.value !== null) {
            this.textPropertyChange('textPosition', args.value);
        }
    }
    //To update style of the Text
    toolbarTextStyleChange(args) {
        this.textPropertyChange(args.item.tooltipText, false);
    }
    //To align Paragraph Texts
    toolbarTextSubAlignChange(args) {
        const propertyName = args.item.tooltipText.replace(/[' ']/g, '');
        this.textPropertyChange(propertyName, propertyName);
    }
    //To align Position of the Text
    toolbarTextAlignChange(args) {
        const propertyName = args.item.tooltipText.replace('Align ', '');
        this.textPropertyChange(propertyName, propertyName);
    }
    //To update the Text Positoin Properties of the annotation in Node/Connector
    textPropertyChange(propertyName, propertyValue) {
        if (!this.selectedItem.preventPropertyChange) {
            const diagram = this.selectedItem.selectedDiagram;
            let selectedObjects = diagram.selectedItems.nodes;
            selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (const item of selectedObjects) {
                    const node = item;
                    if (node instanceof Node || node instanceof Connector) {
                        if (node.annotations.length > 0) {
                            for (const value of node.annotations) {
                                let annotation = null;
                                if (value instanceof ShapeAnnotation) {
                                    annotation = value;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = this.selectedItem.utilityMethods.getOffset(propertyValue);
                                    }
                                }
                                else if (value instanceof PathAnnotation) {
                                    annotation = value;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = this.selectedItem.textProperties.textPosition;
                                    }
                                }
                                if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                                    annotation.horizontalAlignment = propertyValue;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'top' || propertyName === 'bottom') {
                                    annotation.verticalAlignment = propertyValue;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'middle') {
                                    annotation.verticalAlignment = 'Center';
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else {
                                    this.updateTextProperties(propertyName, propertyValue, annotation.style);
                                }
                            }
                        }
                        else if (node.shape && node.shape.type === 'Text') {
                            this.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    }
    //To update the Text Style and Alignment Properties of the annotation in Node/Connector
    updateTextProperties(propertyName, propertyValue, annotation) {
        // eslint-disable-next-line
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
                this.selectedItem.textProperties.textDecoration = !this.selectedItem.textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                this.updateToolbarState('toolbarTextStyle', this.selectedItem.textProperties.textDecoration, 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '');
                this.selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    }
    //To update Toolbar selection state
    updateToolbarState(toolbarName, isSelected, index) {
        let toolbarTextStyle = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            const cssClass = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
    }
}


    
    