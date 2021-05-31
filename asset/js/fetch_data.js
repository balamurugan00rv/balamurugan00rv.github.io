
        // var myJsonData;
        const getjson = async () => {
            const response = await fetch("asset/data.json")
            const jsondata = await response.json();
            // console.log(jsondata);
            return jsondata;
    }
        // console.log("myJsonData" +myJsonData);
        function readjson(jsondata) {
            // console.log(jsondata);
            // var busDetails = $.parseJSON(jsondata);
            // var busArray = new Array(jsondata['buses']);
            // console.log(jsondata['buses'][0]);
            var tmpbusname;
            for ( var i=0; i < jsondata['buses'].length;++i){
                tmpbusname = jsondata['buses'][i];
                console.log("busName = "+tmpbusname)
                for (var j=0; j < jsondata[tmpbusname].length;++j) {
                    console.log(jsondata[tmpbusname][j]);
                }
            }
        }

        function fetch_data() {
            console.log("im in fetch data")
        }

        function get_all_stops(route1element, route2element) {
         getjson().then(jsondata => {
            var tmpbusname;
            for ( var i=0; i < jsondata['buses'].length;++i){
                tmpbusname = jsondata['buses'][i];
                // console.log("busName = "+tmpbusname)
                for (var j=0; j < jsondata[tmpbusname].length;++j) {
                    var route = jsondata[tmpbusname][j]['stopname'];
                    // console.log("stopname ="+route);
                    if($("#"+route1element.id+" option:contains('"+route+"')").length ==0)
                    {
                        route1element.append(new Option(route, route));
                    }
                    if($("#"+route2element.id+" option:contains('"+route+"')").length ==0)
                    {
                        route2element.append(new Option(route, route));
                    }
                }
            }
         });
        }

        function updateTable(fromstop, tostop){
            getjson().then(jsondata => {
                var tmpbusname;
                var selectBus = [];
                for ( var i=0; i < jsondata['buses'].length;++i){
                    tmpbusname = jsondata['buses'][i];
                    // console.log("busName = "+tmpbusname)
                    fromstopflag = false;
                    tostopflag = false;
                    for (var j=0; j < jsondata[tmpbusname].length;++j) {
                        var currstopname = jsondata[tmpbusname][j]['stopname'];
                        if ( currstopname == fromstop){
                            fromstopflag = true;
                        }
                        if ( fromstopflag == true ){
                        if ( currstopname == tostop){
                            tostopflag = true;
                        }
                    }
                    }
                    if ( fromstopflag == true && tostopflag == true){
                        selectBus.push(tmpbusname);
                    }
                }
                var filteredBusObj = {"buses":[]};
                for ( var k = 0; k < selectBus.length; ++k){
                    filteredBusObj["buses"].push(selectBus[k]);
                    var busName = selectBus[k];
                    filteredBusObj[busName] = [];
                    for ( var busslen = 0; busslen < jsondata[busName].length;++busslen){
                        if ( fromstop == jsondata[busName][busslen]['stopname'] || tostop == jsondata[busName][busslen]['stopname']){
                            filteredBusObj[busName].push(jsondata[busName][busslen])
                        }
                    }
                }
                drawTable(filteredBusObj);
            });
        }