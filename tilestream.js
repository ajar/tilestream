/*
//Tilestream Library beta(v1.0.0);
//Developed by: Aaron Csetter (Studio Nacho) on March 23, 2019;
// License: personal and experimental use only. Commercial use prohibited without the consent of Aaron Csetter.
// Developer's Email : aaron@csetter.com
// Developer's Deiscord : imNACHO#0001
*/
const Tilestream = {
    settings : {
        _target : document.getElementById('container'),
        _autoRows : true,
        _modalBox : true,
        _demoMode : true,
        _editorMode : true,
        _responsive : true,
        _rowImgMax : 4,
        _rowRatioMax : 6.1,
        _tileGap : 5,
        _rowGap : 5,
        _customRows : [1, 3, 2],
        _mobileSize : 600,
        _mobileRowImgMax : 2,
        _mobileRowRatioMax : 1.5,
        _mobileTileGap : 3,
        _mobileRowGap : 3,
        _tabletSize : 900,
        _tabletRowImgMax : 3,
        _tabletRowRatioMax : 6,
        _tabletTileGap : 4,
        _tabletRowGap : 4,
    },
    set : {
        autoRows : function(value){
            if(typeof value === 'boolean') {
                Tilestream.settings._autoRows = value;
            } else {
                console.log('ERROR')
            }
        },
        modalBox : function(value){
            if(typeof value === 'boolean') {
                Tilestream.settings._modalBox = value;
            } else {
                console.log('ERROR')
            }
        },
        demoMode : function(value){
            if(typeof value === 'boolean') {
                Tilestream.settings._demoMode = value;
            } else {
                console.log('ERROR')
            }
        },
        responsive : function(value){
            if(typeof value === 'boolean') {
                Tilestream.settings._responsive = value;
            } else {
                console.log('ERROR')
            }
        },
        rowMax : function(imgVal, ratioVal){
            if(typeof imgVal && typeof ratioVal === 'number') {
                Tilestream.settings._rowImgMax = imgVal;
                Tilestream.settings._rowRatioMax = ratioVal;
            } else {
                console.log('ERROR')
            }
        },
        rowImgMax : function(value){
            if(typeof value === 'number') {
                Tilestream.settings._rowImgMax = value;
            } else {
                console.log('ERROR')
            }
        },
        rowRatioMax : function(value){
            if(typeof value === 'number') {
                Tilestream.settings._rowRatioMax = value;
            } else {
                console.log('ERROR')
            }
        },
        mobile : function(sizeVal, imgVal, ratioVal){
            if(typeof sizeVal && typeof imgVal && typeof ratioVal === 'number') {
                Tilestream.settings._mobileSize = sizeVal;
                Tilestream.settings._mobileRowImgMax = imgVal;
                Tilestream.settings._mobileRowRatioMax = ratioVal;
            } else {
                console.log('ERROR')
            }
        },
        tablet : function(sizeVal, imgVal, ratioVal){
            if(typeof sizeVal && typeof imgVal && typeof ratioVal === 'number') {
                Tilestream.settings._tabletSize = sizeVal;
                Tilestream.settings._tabletRowImgMax = imgVal;
                Tilestream.settings._tabletRowRatioMax = ratioVal;
            } else {
                console.log('ERROR')
            }
        },
        mobileRowImgMax : function(value){
            if(typeof value === 'number') {
                Tilestream.settings._mobileRowImgMax = value;
            } else {
                console.log('ERROR')
            }
        },
        mobileRowRatioMax : function(value){
            if(typeof value === 'number') {
                Tilestream.settings._mobileRowRatioMax = value;
            } else {
                console.log('ERROR')
            }
        },
        customRows : function(values){
            if(typeof values === 'number' && values > 0){
                Tilestream.settings._customRows = [value];
            } else if(typeof values === 'object') {
                let arr = [];
                for(i=0; i<values.length; i++) {
                    if (typeof values[i] === 'number' && values[i] > 0) {
                        arr.push(value[i]);
                    } else if(values[i] = 0){
                        console.log('ERROR: Values of zero will not be added to the customRows parameter. Tilestream.set.customRows([values])');
                    };
                };
                Tilestream.settings._customRows = arr;
            };
        },
    },
    properties : {
        currentView : 2,
        objectCount : function(object){
            if(Object.keys) {
                return Object.keys(object).length;
            } else {
                var length = 0;
                for(var key in object) {
                    if(object.hasOwnProperty(key)) {
                        ++length;
                    }
                }
                return length;
            }
        },
    },
    tiles : {},
    tilerows : {},
    Tile : function(src, alt){
        this.src = src;
        this.alt = alt;
        this.id = 'tile'+(Tilestream.properties.objectCount(Tilestream.tiles) + 1);
        Tilestream.tiles[this.id] = {};
        Tilestream.tiles[this.id].src = this.src;
        Tilestream.tiles[this.id].alt = this.alt;
    },
    autoQueue : function(){
        Tilestream.properties.autoRows = Tilestream.settings._autoRows;
        Tilestream.properties.rowImgMax = Tilestream.settings._rowImgMax;
        Tilestream.properties.rowRatioMax = Tilestream.settings._rowRatioMax;
        var tileCount = Tilestream.properties.objectCount(Tilestream.tiles);
        var loadCount = 0
        var divQueue = document.createElement('div');
        var target = Tilestream.settings._target;
        var stream = document.createElement('div');
        stream.id = 'tilestream';
        stream.setAttribute('style', 'display: block; width: 100%;');
        divQueue.setAttribute('id', 'tile-queue');
        divQueue.setAttribute('style', 'display: none');
        target.appendChild(divQueue);
        target.appendChild(stream);
        for(i=0; i<tileCount; i++) {
            let index = 'tile'+(i+1);
            let tile = Tilestream.tiles[index];
            let element = document.createElement('img');
            element.id = index;
            element.src = tile.src;
            element.className = 'tile';
            element.alt = tile.alt;
            element.setAttribute('style', 'width:100%');
            divQueue.appendChild(element);
            element.onload = function() {
                loadCount++
                if (loadCount == tileCount) {
                    Tilestream.sizeListener();
                    Tilestream.compile();
                    Tilestream.modal();
                }
            }
        };
        console.log('queue finished');
    },
    queue : function(value) {
        if(value.length){
            Tilestream.properties.autoRows = Tilestream.settings._autoRows;
            Tilestream.properties.rowImgMax = Tilestream.settings._rowImgMax;
            Tilestream.properties.rowRatioMax = Tilestream.settings._rowRatioMax;
            Tilestream.tiles = {};
            var divQueue = document.createElement('div');
            var target = Tilestream.settings._target;
            var stream = document.createElement('div');
            stream.id = 'tilestream';
            stream.setAttribute('style', 'display: block; width: 100%;');
            divQueue.setAttribute('id', 'tile-queue');
            divQueue.setAttribute('style', 'display: none');
            target.appendChild(divQueue);
            target.appendChild(stream);
            for(i=0;i<value.length; i++){
                let tileId = 'tile'+(i+1);
                value[i].id = tileId;
                Tilestream.tiles[value[i].id] = {};
                Tilestream.tiles[value[i].id].src = value[i].src;
                Tilestream.tiles[value[i].id].alt = value[i].alt;
                let element = document.createElement('img');
                element.id = value[i].id;
                element.src = value[i].src;
                element.className = 'tile';
                element.alt = value[i].alt;
                element.setAttribute('style', 'width:100%');
                divQueue.appendChild(element);
            };
        };
    },
    compile : function(){
        Tilestream.tilerows = {};
        let tilerowTileId;
        let tileIdCount = 0;
        let rowCount = 0;
        let rowId;
        let autoCount = 0;
        let ratioCount = 0;
        let tileCount = document.getElementsByClassName('tile').length;
        let rowImgMax = Tilestream.properties.rowImgMax;
        let rowRatioMax = Tilestream.properties.rowRatioMax;
        var customRows = Tilestream.settings._customRows;
        var customRowsLength = Tilestream.settings._customRows.length;
        let customRowsCount = 0;

        for(i=0; i<tileCount; i++) {
            let tileId = 'tile'+(i+1);
            let tileObject = Tilestream.tiles[tileId];
            let tile = document.getElementById(tileId);
            //let newFr = await Tilestream.ratioCalc(tile);
            let tileFr = tile.naturalWidth/tile.naturalHeight;
            Tilestream.tiles[tileId].fr = tileFr;
            if(Tilestream.properties.autoRows) {
                ratioCount = ratioCount + tileFr;
                if (i === 0) {
                    rowCount = 1;
                    rowId = 'row' + rowCount;
                    Tilestream.tilerows[rowId] = {};
                    Tilestream.tilerows[rowId].fr = (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount = 1;
                } else if(autoCount < rowImgMax && ratioCount < rowRatioMax) { 
                    Tilestream.tilerows[rowId].fr += (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount += 1;
                } else if (rowImgMax === 1){
                    Tilestream.tilerows[rowId].fr = (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount = 1;
                    rowCount += 1;
                    ratioCount = 0;
                } else {
                    rowCount += 1;
                    rowId = 'row' + rowCount;
                    Tilestream.tilerows[rowId] = {};
                    Tilestream.tilerows[rowId].fr = (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount = 1;
                    ratioCount = tileFr;
                };
            } else if (!Tilestream.properties.autoRows) {
                ratioCount = ratioCount + tileFr;
                if (i === 0) {
                    rowCount = 1;
                    rowId = 'row' + rowCount;
                    Tilestream.tilerows[rowId] = {};
                    Tilestream.tilerows[rowId].fr = '';
                    Tilestream.tilerows[rowId][tileId] = {};
                    
                };
                if(customRowsCount < customRowsLength && autoCount < customRows[customRowsCount]){
                    Tilestream.tilerows[rowId].fr += (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount += 1;
                } else if(customRowsCount < customRowsLength) {
                    rowCount += 1;
                    rowId = 'row' + rowCount;
                    Tilestream.tilerows[rowId] = {};
                    Tilestream.tilerows[rowId].fr = (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount = 1;
                    customRowsCount += 1;
                } else if(customRowsCount = customRowsLength && autoCount < customRows[0]){
                    Tilestream.tilerows[rowId].fr += (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount += 1;
                    customRowsCount = 0;
                 } else if(customRowsCount = customRowsLength){
                    rowCount += 1;
                    rowId = 'row' + rowCount;
                    Tilestream.tilerows[rowId] = {};
                    Tilestream.tilerows[rowId].fr = (' ' + tileFr + 'fr');
                    Tilestream.tilerows[rowId][tileId] = tileObject;
                    autoCount = 1;
                    customRowsCount = 1;
                 } else {
                     console.log('logic error! damn...')
                 }
            };
        };
        
        for(i=0; i<Tilestream.properties.objectCount(Tilestream.tilerows); i++) {
            let tilerowId = 'row'+(i+1);
            let stream = document.getElementById('tilestream');
            let tilerowSum = Tilestream.properties.objectCount(Tilestream.tilerows[tilerowId]) - 1;
            if(tilerowSum === 1) {
                Tilestream.tilerows[tilerowId].fr = '1fr';
            };
            let tilerow = document.createElement('div');
            let tilerowStyle = 'Display: grid; box-sizing: border-box; margin:auto; width: 100%; grid-template-columns:'+ Tilestream.tilerows[tilerowId].fr +'; grid-gap: '+ Tilestream.properties.tileGap + ';padding-bottom: '+ Tilestream.properties.rowGap; 
            tilerow.id = tilerowId;
            tilerow.className = 'tilerow';
            tilerow.setAttribute('style', tilerowStyle);
            stream.appendChild(tilerow);
            for(j=0; j<tilerowSum; j++) {
                tileIdCount += 1;
                tilerowTileId = 'tile' + tileIdCount;
                let tile = document.getElementById(tilerowTileId);
                tilerow.appendChild(tile);
            };   
        };
    },
    imgLoad : async function() {
        let tileCount = document.getElementsByClassName('tile').length;
    },

    sizeListener : function(){
        let tablet = 1;
        let mobile = 0;
        let stream = document.getElementById('tilestream');
        if(Tilestream.settings._responsive) {
            if (stream.offsetWidth < Tilestream.settings._mobileSize + 1) {
                Tilestream.properties.currentView = 0;
            } else if(stream.offsetWidth < Tilestream.settings._tabletSize + 1) {
                Tilestream.properties.currentView = 1;
            } else {
                Tilestream.properties.currentView = 2;
            };
            if (Tilestream.properties.currentView === mobile) {
                Tilestream.properties.autoRows = true;
                Tilestream.properties.rowImgMax = Tilestream.settings._mobileRowImgMax;
                Tilestream.properties.rowRatioMax = Tilestream.settings._mobileRowRatioMax;
                Tilestream.properties.tileGap = Tilestream.settings._mobileTileGap+'px';
                Tilestream.properties.rowGap = Tilestream.settings._mobileRowGap+'px';
            } else if(Tilestream.properties.currentView === tablet) {
                Tilestream.properties.autoRows = true;
                Tilestream.properties.rowImgMax = Tilestream.settings._tabletRowImgMax;
                Tilestream.properties.rowRatioMax = Tilestream.settings._tabletRowRatioMax;
                Tilestream.properties.tileGap = Tilestream.settings._tabletTileGap+'px';
                Tilestream.properties.rowGap = Tilestream.settings._tabletRowGap+'px';
            } else {
                Tilestream.properties.autoRows = Tilestream.settings._autoRows;
                Tilestream.properties.rowImgMax = Tilestream.settings._rowImgMax;
                Tilestream.properties.rowRatioMax = Tilestream.settings._rowRatioMax;
                Tilestream.properties.tileGap = Tilestream.settings._tileGap+'px';
                Tilestream.properties.rowGap = Tilestream.settings._rowGap+'px';
            };
        };
    },
    reset : function(){
        let resizeView = Tilestream.properties.currentView;
        Tilestream.sizeListener();
        let stream = document.getElementById('tilestream');
        let queue = document.getElementById('tile-queue');
        if (resizeView != Tilestream.properties.currentView) {
            let domRows = document.getElementsByClassName('tilerow');
            let domTiles = document.getElementsByClassName('tile');
            for(i=0; i<domTiles.length; i++) {
                let tileId = 'tile' + (i+1);
                let tile = document.getElementById(tileId);
                queue.appendChild(tile);
            };
            while (stream.firstChild) {
                stream.removeChild(stream.firstChild);
            };
            Tilestream.compile();
        };
    },
    fontAwesome : function(){
        var fa = document.createElement('link');
        fa.rel='stylesheet';
        fa.href='https://use.fontawesome.com/releases/v5.7.2/css/all.css';
        fa.integrity='sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr';
        fa.crossOrigin='anonymous';
        document.head.appendChild(fa);
    },
    editor : function(){
        Tilestream.fontAwesome();
        var target = Tilestream.settings._target;
        var toolbar = document.createElement('div');
        toolbar.id = 'tilestream-toolbar';
        let toolbarStyle = 'font-family: arial; background-color: #3f3f3f; width: 100%; margin-bottom: 5px; padding-top: 2px; padding-bottom: 2px; align-items: center';
        let buttonStyle = 'box-sizing: border-box; display: inline-flex; padding: 10px; background-color: #007eff; border: none; color: #fff; text-align: center; text-decoration: none; font-size: 16px; margin: auto; cursor: pointer; margin-left: 2px; margin-right: 3px; border: 1px solid white';
        toolbar.setAttribute('style', toolbarStyle);
        target.appendChild(toolbar);

        var docButton = document.createElement('button');
        docButton.id = 'doc-button';
        docButton.class = 'editor-button';
        docButton.setAttribute('style', buttonStyle);
        var docIcon = document.createElement('i');
        docIcon.className = 'fas fa-book';
        toolbar.appendChild(docButton);
        docButton.appendChild(docIcon);
        docButton.onclick = function(){
            window.open('http://tilestream.csetter.com', '_blank');
        };

        var resetButton = document.createElement('button');
        resetButton.id = 'reset-button';
        resetButton.setAttribute('style', buttonStyle);
        var resetIcon = document.createElement('i');
        resetIcon.className = 'fas fa-redo-alt';
        toolbar.appendChild(resetButton);
        resetButton.appendChild(resetIcon);
        resetButton.onclick = function(){
            Tilestream.properties.autoRows = Tilestream.settings._autoRows;
            Tilestream.properties.rowImgMax = Tilestream.settings._rowImgMax;
            Tilestream.properties.rowRatioMax = Tilestream.settings._rowRatioMax;
            Tilestream.properties.tileGap = Tilestream.settings._tileGap+'px';
            Tilestream.properties.rowGap = Tilestream.settings._rowGap+'px';
            Tilestream.sizeListener();
            let stream = document.getElementById('tilestream');
            let queue = document.getElementById('tile-queue');
            let domTiles = document.getElementsByClassName('tile');
            for(i=0; i<domTiles.length; i++) {
                let tileId = 'tile' + (i+1);
                let tile = document.getElementById(tileId);
                queue.appendChild(tile);
            };
            while (stream.firstChild) {
                stream.removeChild(stream.firstChild);
            };
            Tilestream.compile();
        };

        var editorForm = document.createElement('form');
        editorForm.id = 'editor-form';
        let formStyle = 'display: inline-flex; padding: 7.5px 10px; background-color: #007eff; border: none; color: #fff; text-align: center; text-decoration: none; font-size: 18px; margin: auto; margin-left: 2px; margin-right: 3px; border: 1px solid white; align-items: center;';
        editorForm.setAttribute('style', formStyle);
        var imgParam = document.createElement('input');
        imgParam.id = 'rowimgmax';
        imgParam.value = Tilestream.settings._rowImgMax;
        imgParam.setAttribute('style', 'padding-left: 3px; margin: 0 auto; width: 40px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px')
        imgParam.type = 'number';
        var imgTxt = document.createElement('div');
        imgTxt.id = 'form-imgtxt';
        imgTxt.innerHTML = 'rowImgMax:';
        imgTxt.setAttribute('style', 'padding-right: 3px')

        var ratioParam = document.createElement('input');
        ratioParam.id = 'rowratiomax';
        ratioParam.value = Tilestream.settings._rowRatioMax;
        ratioParam.setAttribute('style', 'padding-left: 3px; margin: 0 auto; width: 40px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px');
        ratioParam.type = 'number';
        var ratioTxt = document.createElement('div');
        ratioTxt.id = 'form-ratiotxt';
        ratioTxt.innerHTML = 'rowRatioMax:';
        ratioTxt.setAttribute('style', 'padding-left: 5px; padding-right: 3px');

        toolbar.appendChild(editorForm);
        editorForm.appendChild(imgTxt);
        editorForm.appendChild(imgParam);
        editorForm.appendChild(ratioTxt);
        editorForm.appendChild(ratioParam);

        var saveButton = document.createElement('button');
        saveButton.id = 'save-button';
        saveButton.setAttribute('style', buttonStyle);
        var saveIcon = document.createElement('i');
        saveIcon.className = 'fas fa-play';
        toolbar.appendChild(saveButton);
        saveButton.appendChild(saveIcon);
        saveButton.onclick = function(){
            let imgInput = imgParam.value;
            let ratioInput = ratioParam.value;
            let stream = document.getElementById('tilestream');
            let queue = document.getElementById('tile-queue');
            let domTiles = document.getElementsByClassName('tile');
            if (imgInput) {
                Tilestream.properties.rowImgMax = imgInput;
                for(i=0; i<domTiles.length; i++) {
                    let tileId = 'tile' + (i+1);
                    let tile = document.getElementById(tileId);
                    queue.appendChild(tile);
                };
                while (stream.firstChild) {
                    stream.removeChild(stream.firstChild);
                };
                Tilestream.compile();
            };
            if (ratioInput) {
                Tilestream.properties.rowRatioMax = ratioInput;
                for(i=0; i<domTiles.length; i++) {
                    let tileId = 'tile' + (i+1);
                    let tile = document.getElementById(tileId);
                    queue.appendChild(tile);
                };
                while (stream.firstChild) {
                    stream.removeChild(stream.firstChild);
                };
                Tilestream.compile();
            };
        };
    },
    modal : function(){
        let tiles = document.getElementsByClassName('tile');
        let modal = document.createElement('div');
        let modalImg = document.createElement('img');
        let closeButton = document.createElement('span');
        let modalTitle = document.createElement('div');
        modalTitle.id = 'modal-title';
        closeButton.id = 'close';
        closeButton.innerHTML = '&times;';
        modal.id= 'tilestream-modal';
        modalImg.id = 'modal-img';
        modal.setAttribute('style', 'display: none; width: 100%; height: 100%; position: fixed; z-index: 1; left: 0; top: 0; overflow: auto; background-color: rgba(0,0,0,0.9)');
        modalImg.setAttribute('style', 'margin: auto; display: block;');
        modalTitle.setAttribute('style', 'position: absolute; top: 15px; left: 35px; padding-right: 60px; color: #f1f1f1; font-size: 30px; font-family: arial; font-weight: 500; text-shadow: 0px 0px 5px rgb(0,0,0,0.7)');
        closeButton.setAttribute('style', 'cursor: pointer; position: absolute; top: 15px; right: 35px; color: #f1f1f1; font-size: 40px; font-weight: bold; text-shadow: 0px 0px 5px rgb(0,0,0,0.7)');
        Tilestream.settings._target.appendChild(modal);
        modal.appendChild(modalTitle);
        modal.appendChild(closeButton);
        modal.appendChild(modalImg);

        for(i=0;i<tiles.length;i++){
            let tileId = 'tile'+(i+1);
            let tile = document.getElementById(tileId);
            tile.style.cursor = 'pointer';
            tile.onclick = function(){
                modalImg.src = tile.src;
                modalTitle.innerHTML = tile.alt;
                modal.style.display = 'grid';
                if(modalImg.style.width) {
                    modalImg.style.removeProperty('width');
                };
                if(modalImg.style.height) {
                    modalImg.style.removeProperty('height');
                };
                if (tile.naturalWidth >= tile.naturalHeight) {
                    if(tile.naturalWidth < window.innerWidth) {
                        modalImg.style.width = tile.naturalWidth;
                    } else {
                        modalImg.style.width = '100%';
                    };
                } else {
                    if(tile.naturalHeight < window.innerHeight) {
                        modalImg.style.height = tile.naturalHeight;
                    } else {
                        modalImg.style.height = '100%';
                    }
                };
            };
        };
        closeButton.onclick = function(){
            modal.style.display = 'none';
        };
    },
};

const tile1 = new Tilestream.Tile('demo_tiles/axon_4-fx1.778.png', 'This Is A Very Long Title For Testing');
const tile2 = new Tilestream.Tile('demo_tiles/axon_2-fx1.375.png', 'test2');
const tile3 = new Tilestream.Tile('demo_tiles/axon_3-fx1.png', 'test3');
const tile4 = new Tilestream.Tile('demo_tiles/axon_8-fx0.5625.png', 'test4');
const tile5 = new Tilestream.Tile('demo_tiles/axon_9-fx0.5625.png', 'test4');
const tile6 = new Tilestream.Tile('demo_tiles/axon_10-fx0.5625.png', 'test4');
const tile7 = new Tilestream.Tile('demo_tiles/axon_12-fx3.png', 'test4');
const tile8 = new Tilestream.Tile('demo_tiles/axon_11-fx3.png', 'test4');
const tile9 = new Tilestream.Tile('demo_tiles/axon_13-fx1.778.png', 'test4');
const tile10 = new Tilestream.Tile('demo_tiles/axon_14-fx1.778.png', 'test4');
const tile11 = new Tilestream.Tile('demo_tiles/axon_15-fx1.778.jpg', 'test4');
const tile12 = new Tilestream.Tile('demo_tiles/axon_5-fx0.5625.png', 'test');
const tile13 = new Tilestream.Tile('demo_tiles/axon_1-fx3.png', 'test');
const tile14 = new Tilestream.Tile('demo_tiles/axon_6-fx0.5625.png', 'test');
const tile15 = new Tilestream.Tile('demo_tiles/axon_7-fx0.5625.png', 'test');
const tile16 = new Tilestream.Tile('demo_tiles/axon_16-fx1.png', 'test');
const tile17 = new Tilestream.Tile('demo_tiles/axon_17-fx3.png', 'test');
const tile18 = new Tilestream.Tile('demo_tiles/axon_18-fx3.png', 'test');
const tile19 = new Tilestream.Tile('demo_tiles/axon_19-fx3.png', 'test');
const tile20 = new Tilestream.Tile('demo_tiles/axon_22-fx1.778.gif', 'test');

Tilestream.autoQueue();

window.onresize = function(){
    Tilestream.reset();
};
