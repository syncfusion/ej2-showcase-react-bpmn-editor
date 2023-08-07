/**
 *  Home page handler
 */
 import { NodeConstraints, Node } from '@syncfusion/ej2-diagrams';
 import { Ajax } from '@syncfusion/ej2-base';

 export class PaperSize {
 }
 export class UtilityMethods {
     constructor() {
         this.fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
         this.borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];
         
     }
     //To update node properties for the selected Item
     bindNodeProperties(node, selectedItem) {
         selectedItem.preventPropertyChange = true;
         selectedItem.nodeProperties.offsetX.value = (Math.round(node.offsetX * 100) / 100);
         selectedItem.nodeProperties.offsetY.value = (Math.round(node.offsetY * 100) / 100);
         selectedItem.nodeProperties.width.value = node.width ? (Math.round(node.width * 100) / 100) : (Math.round(node.minWidth * 100) / 100);
         selectedItem.nodeProperties.height.value = node.height ? (Math.round(node.height * 100) / 100) : (Math.round(node.minHeight * 100) / 100);
         selectedItem.nodeProperties.rotateAngle.value = node.rotateAngle;
         selectedItem.nodeProperties.strokeColor.value = this.getHexColor(node.style.strokeColor);
         selectedItem.nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : 'None';
         selectedItem.nodeProperties.strokeWidth.value = node.style.strokeWidth;
         selectedItem.nodeProperties.fillColor.value = this.getHexColor(node.style.fill);
         selectedItem.nodeProperties.opacity.value = node.style.opacity * 100;
         selectedItem.nodeProperties.opacityText = selectedItem.nodeProperties.opacity.value + '%';
        //  selectedItem.nodeProperties.aspectRatio.checked = node.constraints & NodeConstraints.AspectRatio ? true : false;
         selectedItem.nodeProperties.gradient = node.style.gradient.type !== 'None' ? true : false;
         const gradientElement = document.getElementById('gradientStyle');
         if (selectedItem.nodeProperties.gradient) {
             gradientElement.className = 'row db-prop-row db-gradient-style-show';
             selectedItem.nodeProperties.gradientColor.value = node.style.gradient.stops[1].color;
             const gradient = node.style.gradient;
             if (gradient.x1) {
                 selectedItem.nodeProperties.gradientDirection.value = 'North';
             }
             else if (gradient.x2) {
                 selectedItem.nodeProperties.gradientDirection.value = 'East';
             }
             else if (gradient.y1) {
                 selectedItem.nodeProperties.gradientDirection.value = 'West';
             }
             else if (gradient.y2) {
                 selectedItem.nodeProperties.gradientDirection.value = 'South';
             }
         }
         else {
             gradientElement.className = 'row db-prop-row db-gradient-style-hide';
             selectedItem.nodeProperties.gradientColor.value = '#ffffff';
             selectedItem.nodeProperties.gradientDirection.value = 'South';
         }
         selectedItem.preventPropertyChange = false;
     }
     //To update Text properties for the selected Item
     bindTextProperties(text, selectedItem) {
         selectedItem.preventPropertyChange = true;
         selectedItem.textProperties.fontColor.value = this.getHexColor(text.color);
         selectedItem.textProperties.fontFamily.value = text.fontFamily;
         selectedItem.textProperties.fontSize.value = text.fontSize;
         selectedItem.textProperties.opacity.value = text.opacity * 100;
         selectedItem.textProperties.opacityText = selectedItem.textProperties.opacity + '%';
         let toolbarTextStyle = document.getElementById('toolbarTextStyle');
         if (toolbarTextStyle) {
             toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
         }
         if (toolbarTextStyle) {
             toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
             toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
             toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
         }
         this.updateTextAlign(text.textAlign);
         selectedItem.preventPropertyChange = false;
     }
     //To update Text align value of the TextProperties
     updateTextAlign(textAlign) {
         let toolbarTextSubAlignment = document.getElementById('toolbarTextSubAlignment');
         if (toolbarTextSubAlignment) {
             toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
         }
         if (toolbarTextSubAlignment) {
             for (const toolbarText of toolbarTextSubAlignment.items) {
                 toolbarText.cssClass = toolbarText.cssClass.replace(' tb-item-selected', '');
             }
             const index = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2);
             toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
         }
     }
      //To update position alignment value of the TextProperties
     updateHorVertAlign(horizontalAlignment, verticalAlignment) {
         let toolbarHorVerAlignment = document.getElementById('toolbarTextAlignment');
         if (toolbarHorVerAlignment) {
             toolbarHorVerAlignment = toolbarHorVerAlignment.ej2_instances[0];
         }
         if (toolbarHorVerAlignment) {
             for (const toolbarHorVer of toolbarHorVerAlignment.items) {
                 toolbarHorVer.cssClass = toolbarHorVer.cssClass.replace(' tb-item-selected', '');
             }
             let index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
             toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
             index = verticalAlignment === 'Bottom' ? 3 : (verticalAlignment === 'Center' ? 4 : 5);
             toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
         }
     }
    //To update connector properties for the selected Item
     bindConnectorProperties(connector, selectedItem) {
         selectedItem.preventPropertyChange = true;
         selectedItem.connectorProperties.lineColor.value = this.getHexColor(connector.style.strokeColor);
         selectedItem.connectorProperties.lineStyle.value = connector.style.strokeDashArray ? connector.style.strokeDashArray : 'None';
         selectedItem.connectorProperties.lineType.value = connector.type;
         selectedItem.connectorProperties.lineWidth.value = connector.style.strokeWidth;
         selectedItem.connectorProperties.sourceType.value = connector.sourceDecorator.shape;
         selectedItem.connectorProperties.targetType.value = connector.targetDecorator.shape;
         selectedItem.connectorProperties.opacity.value = connector.style.opacity * 100;
         selectedItem.connectorProperties.opacityText = selectedItem.connectorProperties.opacity + '%';
         selectedItem.connectorProperties.lineJumpSize.value = connector.bridgeSpace;
         selectedItem.connectorProperties.lineJump.value = connector.constraints ? true : false;
         if (selectedItem.connectorProperties.lineJump.value) {
             document.getElementById('lineJumpSizeDiv').style.display = '';
         }
         else {
             document.getElementById('lineJumpSizeDiv').style.display = 'none';
         }
         selectedItem.connectorProperties.targetSize.value = connector.targetDecorator.width;
         selectedItem.connectorProperties.sourceSize.value = connector.sourceDecorator.width;
         selectedItem.preventPropertyChange = false;
     }
     //Returns the RGB color string to its corresponding hexadecimal color representation value.
     getHexColor(colorStr) {
         let a = document.createElement('div');
         a.style.color = colorStr;
         let colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(
             (a) => {
                 return parseInt(a, 10);
             }
         );
         document.body.removeChild(a);
         return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
     }
     //returns the offset text annotation value based on position
     getOffset(position) {
         switch (position.toLowerCase()) {
             case 'topleft':
                 return { x: 0, y: 0 };
             case 'topcenter':
                 return { x: 0.5, y: 0 };
             case 'topright':
                 return { x: 1, y: 0 };
             case 'middleleft':
                 return { x: 0, y: 0.5 };
             default:
                 return { x: 0.5, y: 0.5 };
             case 'middleright':
                 return { x: 1, y: 0.5 };
             case 'bottomleft':
                 return { x: 0, y: 1 };
             case 'bottomcenter':
                 return { x: 0.5, y: 1 };
             case 'bottomright':
                 return { x: 1, y: 1 };
         }
     }
     //return the positon of the annotation text based on offset values
     getPosition(offset) {
         if (offset.x === 0 && offset.y === 0) {
             return 'TopLeft';
         }
         else if (offset.x === 0.5 && offset.y === 0) {
             return 'TopCenter';
         }
         else if (offset.x === 1 && offset.y === 0) {
             return 'TopRight';
         }
         else if (offset.x === 0 && offset.y === 0.5) {
             return 'MiddleLeft';
         }
         else if (offset.x === 1 && offset.y === 0.5) {
             return 'MiddleRight';
         }
         else if (offset.x === 0 && offset.y === 1) {
             return 'BottomLeft';
         }
         else if (offset.x === 0.5 && offset.y === 1) {
             return 'BottomCenter';
         }
         else if (offset.x === 1 && offset.y === 1) {
             return 'BottomRight';
         }
         else {
             return 'Center';
         }
     }
     // To hide Property panel
     hideElements(elementType, diagram) {
         const diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
         if (diagramContainer.classList.contains(elementType)) {
             diagramContainer.classList.remove(elementType);
             (document.getElementById('hideProperty')).style.backgroundColor = '';
             (document.getElementById('hideProperty')).style.color = '#fff';
             (document.getElementById('hideProperty')).ej2_instances[0].isPrimary = true;
         }
         else {
             diagramContainer.classList.add(elementType);
             (document.getElementById('hideProperty')).style.backgroundColor = '#e3e3e3';
             (document.getElementById('hideProperty')).style.color = 'black';
             (document.getElementById('hideProperty')).ej2_instances[0].isPrimary = false;
         }
         if (diagram) {
             diagram.updateViewPort();
         }
     }
     //To show Property panel based on selected Items
     objectTypeChange(objectType) {
         document.getElementById('diagramPropertyContainer').style.display = 'none';
         document.getElementById('nodePropertyContainer').style.display = 'none';
         document.getElementById('textPropertyContainer').style.display = 'none';
         document.getElementById('connectorPropertyContainer').style.display = 'none';
         // eslint-disable-next-line
         switch (objectType) {
             case 'diagram':
                 document.getElementById('diagramPropertyContainer').style.display = '';
                 break;
             case 'node':
                 document.getElementById('nodePropertyContainer').style.display = '';
                 break;
             case 'connector':
                 document.getElementById('connectorPropertyContainer').style.display = '';
                 break;
         }
     }

     //to enable Menu bar Items
     enableMenuItems(itemText, selectedItem) {
         if (selectedItem && selectedItem.selectedDiagram) {
             let selectedItems = selectedItem.selectedDiagram.selectedItems.nodes;
             selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors);
             if (itemText) {
                //  const commandType = itemText.replace(/[' ']/g, '');
                 if (selectedItem.pasteData.length === 0 && itemText === 'Paste') {
                     return true;
                 }
                 if (itemText === 'Undo' && selectedItem.selectedDiagram.historyManager.undoStack.length === 0) {
                     return true;
                 }
                 if (itemText === 'Redo' && selectedItem.selectedDiagram.historyManager.redoStack.length === 0) {
                     return true;
                 }
                 if (selectedItem.diagramType !== 'GeneralDiagram') {
                     if ( itemText === 'Paste' || itemText === 'Show Rulers' || itemText === 'Show Guides'
                         || itemText === 'Show Grid' || itemText === 'Snap To Grid') {
                         return true;
                     }
                 }
             }
         }
         return false;
     }
      //to get the Paper size of the selected Items
     getPaperSize(paperName) {
         const paperSize = new PaperSize();
         // eslint-disable-next-line
         switch (paperName) {
             case 'Letter':
                 paperSize.pageWidth = 816;
                 paperSize.pageHeight = 1056;
                 break;
             case 'Legal':
                 paperSize.pageWidth = 816;
                 paperSize.pageHeight = 1344;
                 break;
             case 'Tabloid':
                 paperSize.pageWidth = 1056;
                 paperSize.pageHeight = 1632;
                 break;
             case 'A3':
                 paperSize.pageWidth = 1122;
                 paperSize.pageHeight = 1587;
                 break;
             case 'A4':
                 paperSize.pageWidth = 793;
                 paperSize.pageHeight = 1122;
                 break;
             case 'A5':
                 paperSize.pageWidth = 559;
                 paperSize.pageHeight = 793;
                 break;
             case 'A6':
                 paperSize.pageWidth = 396;
                 paperSize.pageHeight = 559;
                 break;
         }
         return paperSize;
     }
     //To remove the sub child of the selected node
     removeChild(selectedItem) {
         const diagram = selectedItem.selectedDiagram;
         if (diagram.selectedItems.nodes.length > 0) {
             selectedItem.preventPropertyChange = true;
             diagram.historyManager.startGroupAction();
             this.removeSubChild(diagram.selectedItems.nodes[0], selectedItem);
             diagram.historyManager.endGroupAction();
             diagram.doLayout();
             selectedItem.preventPropertyChange = false;
         }
         selectedItem.isModified = true;
     }
     //To update the selection of the option in the context menu
     updateContextMenuSelection(boolean, args, diagram) {
         if (diagram.selectedItems.nodes.length > 0) {
             var bpmnNode = diagram.selectedItems.nodes[0];
             var checked = boolean;
             if (((bpmnNode.shape)).shape === 'Gateway') {
                 if (!args.parentItem) {
                     for (let i = 0; i < args.items[21].items.length; i++) {
                         if (((bpmnNode.shape).gateway.type === args.items[21].items[i].text || (bpmnNode.shape).gateway.type === args.items[21].items[i].id) || !checked) {
                             this.addTick(args, 21, checked, i);
                         }
                     }
                 }
             }
             else if ((bpmnNode.shape).shape === 'Activity') {
                 if (!args.parentItem) {
                     if ((bpmnNode.shape).activity.activity === 'Task') {
                         for (let i = 0; i < args.items[13].items.length; i++) {
                             if ((bpmnNode.shape).activity.activity === args.items[13].items[i].id || !checked) {
                                 this.addTick(args, 13, checked, i);
                             }
                         }
                         for (let i = 0; i < args.items[20].items.length; i++) {
                             if ((bpmnNode.shape).activity.task.type === args.items[20].items[i].id || !checked) {
                                 this.addTick(args, 20, checked, i);
                             }
                         }
                         if ((bpmnNode.shape).activity.task.call) {
                             this.singleItemTick(args, 17, true);
                         }
                         else {
                             this.singleItemTick(args, 17, false);
                         }
                         for (let i = 0; i < args.items[11].items.length; i++) {
                             if (((bpmnNode.shape).activity.task.loop === args.items[11].items[i].text || (bpmnNode.shape).activity.task.loop === args.items[11].items[i].id) || !checked) {
                                 this.addTick(args, 11, checked, i);
                             }
                         }
                         if ((bpmnNode.shape).activity.task.compensation) {
                             this.singleItemTick(args, 12, true);
                         }
                         else {
                             this.singleItemTick(args, 12, false);
                         }
                     }
                     else if ((bpmnNode.shape).activity.activity === 'SubProcess') {
                         for (let i = 0; i < args.items[13].items.length; i++) {
                             if ((bpmnNode.shape).activity.activity === args.items[13].items[i].id || !checked) {
                                 this.addTick(args, 13, checked, i);
                             }
                         }
                         for (let i = 0; i < args.items[11].items.length; i++) {
                             if (((bpmnNode.shape).activity.subProcess.loop === args.items[11].items[i].text || (bpmnNode.shape).activity.subProcess.loop === args.items[11].items[i].id) || !checked) {
                                 this.addTick(args, 11, checked, i);
                             }
                         }
                         for (let i = 0; i < args.items[14].items.length; i++) {
                             if (((bpmnNode.shape).activity.subProcess.boundary === args.items[14].items[i].text || (bpmnNode.shape).activity.subProcess.boundary === args.items[14].items[i].id) || !checked) {
                                 this.addTick(args, 14, checked, i);
                             }
                         }
                         if ((bpmnNode.shape).activity.subProcess.compensation) {
                             this.singleItemTick(args, 12, true);
                         }
                         else {
                             this.singleItemTick(args, 12, false);
                         }
                         if ((bpmnNode.shape).activity.subProcess.adhoc) {
                             this.singleItemTick(args, 10, true);
                         }
                         else {
                             this.singleItemTick(args, 10, false);
                         }
                     }
                 }
             }
             else if ((bpmnNode.shape).shape === 'Event') {
                 if (!args.parentItem) {
                     for (let i = 0; i < args.items[19].items.length; i++) {
                         if (((bpmnNode.shape).event.event === args.items[19].items[i].text || (bpmnNode.shape).event.event === args.items[19].items[i].id) || !checked) {
                             this.addTick(args, 19, checked, i);
                         }
                     }
                     for (let i = 0; i < args.items[18].items.length; i++) {
                         if ((bpmnNode.shape).event.trigger === args.items[18].items[i].text || !checked) {
                             this.addTick(args, 18, checked, i);
                         }
                     }
                 }
             }
             else if ((bpmnNode.shape).shape === 'DataObject') {
                 if (!args.parentItem) {
                     for (let i = 0; i < args.items[15].items.length; i++) {
                         if ((bpmnNode.shape).dataObject.type === args.items[15].items[i].text || !checked) {
                             this.addTick(args, 15, checked, i);
                         }
                     }
                     if ((bpmnNode.shape).dataObject.collection) {
                         this.singleItemTick(args, 16, true);
                     }
                     else {
                         this.singleItemTick(args, 16, false);
                     }
                 }
             }
         }
         if (diagram.selectedItems.connectors.length > 0) {
             var bpmnConnector = diagram.selectedItems.connectors[0];
             var checked = boolean;
             if (((bpmnConnector.shape)).type === 'Bpmn') {
                 if ((bpmnConnector.shape).flow === 'Association') {
                     if (!args.parentItem) {
                         for (let i = 0; i < args.items[9].items.length; i++) {
                             if (((bpmnConnector.shape).association === args.items[9].items[i].id || (bpmnConnector.shape).association === args.items[9].items[i].text) || !checked) {
                                 this.addTick(args, 9, checked, i);
                             }
                         }
                         this.singleItemTick(args, 5, true);
                         this.singleItemTick(args, 6, false);
                         this.singleItemTick(args, 7, false);
                     }
                 }
                 if ((bpmnConnector.shape).flow === 'Sequence') {
                     if (!args.parentItem) {
                         for (let i = 0; i < args.items[8].items.length; i++) {
                             if (((bpmnConnector.shape).sequence === args.items[8].items[i].text || (bpmnConnector.shape).sequence === args.items[8].items[i].id) || !checked) {
                                 this.addTick(args, 8, checked, i);
                             }
                         }
                         this.singleItemTick(args, 5, false);
                         this.singleItemTick(args, 6, true);
                         this.singleItemTick(args, 7, false);
                     }
                 }
                 if ((bpmnConnector.shape).flow === 'Message') {
                     if (!args.parentItem) {
                         for (let i = 0; i < args.items[22].items.length; i++) {
                             if (((bpmnConnector.shape).message === args.items[22].items[i].text || (bpmnConnector.shape).message === args.items[22].items[i].id) || !checked) {
                                 this.addTick(args, 22, checked, i);
                             }
                         }
                         this.singleItemTick(args, 5, false);
                         this.singleItemTick(args, 6, false);
                         this.singleItemTick(args, 7, true);
                     }
                 }
             }
         }

     };
     //To add tick icon to the context menu
     addTick(args, index, checked, i) {
         if (checked) {
             if ((args.items[index]).items[i].iconCss.indexOf('sf-icon-check-tick') === -1) {
                 (args.items[index]).items[i].iconCss += ' sf-icon-check-tick';
             }
         }
         else {
             if ((args.items[index]).items[i].iconCss.indexOf('sf-icon-check-tick') !== -1) {
                 (args.items[index]).items[i].iconCss = (args.items[index]).items[i].iconCss.replace(' sf-icon-check-tick', '');
             }
         }
     };
     //To toggle the checkmark icon for a specific item in the context menu 
     singleItemTick(args, index, boolean) {
         if (boolean) {
             if (args.items[index].iconCss.indexOf('sf-icon-check-tick') === -1) {
                 args.items[index].iconCss += ' sf-icon-check-tick';
             }
         }
         else {
             if (args.items[index].iconCss.indexOf('sf-icon-check-tick') !== -1) {
                 args.items[index].iconCss = args.items[index].iconCss.replace(' sf-icon-check-tick', '');
             }
         }
     };
     //Returns the name of the Diagram
     fileName(){
        return document.getElementById('diagramName').innerHTML;
    }
     
 }