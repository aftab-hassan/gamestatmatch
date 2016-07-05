/**
 * Created by aftab on 4/1/2016.
 */

/*Creating serve json input
 -------------------------

 1.Get data
 wimbledon2012 = "20120706-M-Wimbledon-SF-Roger_Federer-Novak_Djokovic"
 wimbledon2015 = "20150712-M-Wimbledon-F-Roger_Federer-Novak_Djokovic"

 write.csv(df11[which(df11$match_id == wimbledon2015),],"C:\\Users\\aftab\\Desktop\\2015.csv",row.names=FALSE)
 write.csv(df11[which(df11$match_id == wimbledon2012),],"C:\\Users\\aftab\\Desktop\\2012.csv",row.names=FALSE)

 2.Use the site for conversion
 http://www.convertcsv.com/csv-to-json.htm
 */

//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//
//    ga('create', 'UA-23542009-21', 'auto');
//    ga('send', 'pageview');

/* Global variables required for UI and other non-three.js functions */
var JSONobj;
var playerIndex=-1,playerSelection; //Safin, Stepanek
var serveIndex=-1,serveSelection; //First serve, Second serve
var serveDirection;//ad_wide, ad_middle, ad_t, deuce_t, deuce_middle, deuce_wide
var row;//1 Total, 1 1, 1 2, 2 Total, 2 1, 2 2
var numServes;

/* Controllers */
/* file controller */
document.getElementById('myFile').addEventListener('change',readSingleFile,false)

/* Selection related UI related functions */
function updateSelection(selectionmade)
{
    /* playerSelection - Safin Stepanek */
    if(selectionmade == "playerSelection")
    {
        playerSelection=document.getElementById("playerselect");
        playerIndex = playerSelection[playerSelection.selectedIndex].index;
        playerSelection = playerSelection[playerSelection.selectedIndex].value;
        //addTextHelper(0,"serve direction",-12,0,4,true,3,0.1,-Math.PI / 2);
        playSound('../sounds/loadingshuffle',1);
        addTextHelper(0,playerSelection,-15,0,0,false,4,0.1,-Math.PI / 2,0xf0f8ff);
        console.log("playerSelection == "+playerSelection);
    }

    /* serveSelection - First serve, Second serve */
    else if(selectionmade == "serveSelection")
    {
        /* first serve, second serve, both serves Selection */
        serveSelection=document.getElementById("serveselect");
        serveIndex = serveSelection[serveSelection.selectedIndex].index;
        serveSelection = serveSelection[serveSelection.selectedIndex].value;
        console.log("serveSelection == "+serveSelection);
    }

    /* court Position selection*/
    else
    {
        /* ad_wide, ad_middle, ad_t, deuce_t, deuce_middle, deuce_wide */
        //if(hasUnderscore(selectionmade) == true)
        //{
        //console.log("came inside this,selectionmade=="+selectionmade);
        serveDirection = selectionmade;

        //var delimiter = "_";
        ////console.log(playerSelection + "'s " + selectionmade.split(delimiter)[1] + " " + serveSelection + " to the " + selectionmade.split(delimiter)[0] + " side")
        //document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade.split(delimiter)[1] + " " + serveSelection + " to the " + selectionmade.split(delimiter)[0] + " side";
        //}

        /* wide, middle, t */
        //else
        //{
        //console.log(playerSelection + "'s " + " " + selectionmade + " " + serveSelection)
        //document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade + " " + serveSelection;
        //}
        console.log("serveDirection == "+serveDirection);

        init();
    }

    /* The following if check ensures that I try to find the 'row' from the JSON file, only after the
     * player and serve have been seleected from drop down list */
    if(playerIndex != -1 && serveIndex != -1)
    {
        /* 1 Total, 1 1, 1 2, 2 Total, 2 1, 2 2 */
        if(serveIndex == 1)
            row = playerIndex + " Total";
        else if(serveIndex == 2)
            row = playerIndex + " 1";
        else if(serveIndex == 3)
            row = playerIndex + " 2";
        console.log("playerSelection=="+playerSelection+",serveSelection=="+serveSelection+",row=="+row);
    }
}

/* function to load demo file contents */
function loadDemoFile()
{
        JSONobj = [
            {
                "match_id": "20120706-M-Wimbledon-SF-Roger_Federer-Novak_Djokovic",
                "row": "1 Total",
                "deuce_wide": 22,
                "deuce_middle": 13,
                "deuce_t": 20,
                "ad_wide": 16,
                "ad_middle": 11,
                "ad_t": 19,
                "err_net": 10,
                "err_wide": 15,
                "err_deep": 10,
                "err_wide_deep": 1,
                "err_foot": 0,
                "err_unknown": 0
            },
            {
                "match_id": "20120706-M-Wimbledon-SF-Roger_Federer-Novak_Djokovic",
                "row": "1 1",
                "deuce_wide": 16,
                "deuce_middle": 4,
                "deuce_t": 17,
                "ad_wide": 11,
                "ad_middle": 5,
                "ad_t": 12,
                "err_net": 0,
                "err_wide": 0,
                "err_deep": 0,
                "err_wide_deep": 0,
                "err_foot": 0,
                "err_unknown": 0
            },
            {
                "match_id": "20120706-M-Wimbledon-SF-Roger_Federer-Novak_Djokovic",
                "row": "1 2",
                "deuce_wide": 6,
                "deuce_middle": 9,
                "deuce_t": 3,
                "ad_wide": 5,
                "ad_middle": 6,
                "ad_t": 7,
                "err_net": 10,
                "err_wide": 15,
                "err_deep": 10,
                "err_wide_deep": 1,
                "err_foot": 0,
                "err_unknown": 0
            },
            {
                "match_id": "20120706-M-Wimbledon-SF-Roger_Federer-Novak_Djokovic",
                "row": "2 Total",
                "deuce_wide": 21,
                "deuce_middle": 17,
                "deuce_t": 21,
                "ad_wide": 22,
                "ad_middle": 16,
                "ad_t": 17,
                "err_net": 21,
                "err_wide": 12,
                "err_deep": 8,
                "err_wide_deep": 2,
                "err_foot": 0,
                "err_unknown": 0
            },
            {
                "match_id": "20120706-M-Wimbledon-SF-Roger_Federer-Novak_Djokovic",
                "row": "2 1",
                "deuce_wide": 15,
                "deuce_middle": 9,
                "deuce_t": 15,
                "ad_wide": 19,
                "ad_middle": 2,
                "ad_t": 14,
                "err_net": 0,
                "err_wide": 0,
                "err_deep": 0,
                "err_wide_deep": 0,
                "err_foot": 0,
                "err_unknown": 0
            },
            {
                "match_id": "20120706-M-Wimbledon-SF-Roger_Federer-Novak_Djokovic",
                "row": "2 2",
                "deuce_wide": 6,
                "deuce_middle": 8,
                "deuce_t": 6,
                "ad_wide": 3,
                "ad_middle": 14,
                "ad_t": 3,
                "err_net": 21,
                "err_wide": 12,
                "err_deep": 8,
                "err_wide_deep": 2,
                "err_foot": 0,
                "err_unknown": 0
            }
        ];
    //console.log(JSONobj[0].ad_wide);
    //console.log(JSONobj[0].match_id);

    /* populating drop down list - "match_id":"20041107-M-Paris_Masters-F-Marat_Safin-Radek_Stepanek", */
    var dropdownListID = document.getElementById("playerselect");
    var defaultOption = new Option("Select player","Select player");
    var player1 = new Option(JSONobj[0].match_id.split("-")[4].split('_').join(' '),JSONobj[0].match_id.split("-")[4].split('_').join(' '));
    var player2 = new Option(JSONobj[0].match_id.split("-")[5].split('_').join(' '),JSONobj[0].match_id.split("-")[5].split('_').join(' '));
    dropdownListID.options[0] = defaultOption;
    dropdownListID.options[1] = player1;
    dropdownListID.options[2] = player2;
}


/* function to read file */
function readSingleFile(evt)
{
    //console.log("came inside readSingleFile...");

    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
    console.log(f);

    if (f)
    {
        var r = new FileReader();
        r.onload = function(e)
        {
            var contents = e.target.result;
            console.log("contents =="+contents);
            JSONobj = JSON.parse(contents);
            //console.log(JSONobj[0].ad_wide);
            //console.log(JSONobj[0].match_id);

            /* populating drop down list - "match_id":"20041107-M-Paris_Masters-F-Marat_Safin-Radek_Stepanek", */
            var dropdownListID = document.getElementById("playerselect");
            var defaultOption = new Option("Select player","Select player");
            var player1 = new Option(JSONobj[0].match_id.split("-")[4].split('_').join(' '),JSONobj[0].match_id.split("-")[4].split('_').join(' '));
            var player2 = new Option(JSONobj[0].match_id.split("-")[5].split('_').join(' '),JSONobj[0].match_id.split("-")[5].split('_').join(' '));
            dropdownListID.options[0] = defaultOption;
            dropdownListID.options[1] = player1;
            dropdownListID.options[2] = player2;
        }
        r.readAsText(f);
    }
    else
    {
        alert("Failed to load file");
    }
}

/* setting variable called 'serveTabClickCount' in browser storage */
function setCount(value)
{
    // Storing the data:
    localStorage.setItem("serveTabClickCount",value);
}

function getCount()
{
    // Receiving the data:
    return localStorage.getItem("serveTabClickCount");
}

/* to scroll through top of page */
window.scrollTo(0,0);

/* on closing the page */
window.onbeforeunload = function() {
    //console.log("came inside window.onbeforeunload,value=="+getCount())
    localStorage.removeItem("serveTabClickCount");
    //console.log("came inside window.onbeforeunload,value=="+getCount())
    return '';
};

/* boolean check if a string 's' has white space in it */
function hasUnderscore(s) {
    return s.indexOf('_') >= 0;
}
/*************************************************************************************************************/
/* Three.js */
/* Three.js variables */
var angularSpeed = 0.2;
var lastTime = 0;
var SCREEN_WIDTH,SCREEN_HEIGHT,scene,camera,renderer,light,container,animationTracker,controls;
var courtSelection;
var floormesh=null,floorTexture,floorMaterial,floorGeometry;//floor
var skyBoxGeometry,skyBoxMaterial,skyBox;//sky
var textMeshArray = [];
/* far side */
var farBaselineZ = -35;
/* near side */
var nearBaselineZ = 15;
/* left side */
var leftSinglesLineX = -15, leftDoublesLineX = -20;
/* right side */
var rightSinglesLineX = 15, rightDoublesLineX = 20;
/* coordinates needing computation */
var midLineX = leftDoublesLineX + (rightDoublesLineX - leftDoublesLineX)/2
var nearServiceBoxZ = nearBaselineZ - (0.4 * ((nearBaselineZ - farBaselineZ)/2));
var farServiceBoxZ = farBaselineZ + (0.4 * ((nearBaselineZ - farBaselineZ)/2));
var netLineZ = nearBaselineZ - ((nearBaselineZ - farBaselineZ)/2)
var pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var clothGeometry;

/* three.js helper functions */

/* initiates three.js functionality - this is just a wireframe, not used in code */
function workingInitTemplate()
{
    /*
     * 1.set SCREEN_WIDTH and SCREEN_HEIGHT
     * 2.scene
     * 3.camera
     * 4.renderer
     * 5.object(say cube)
     * 6.object properties
     * 7.light
     * 8.weave together
     * */
    //console.log("came inside the workingInitTemplate function...")

    /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
    SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight-100;

    /* 2.scene*/
    scene = new THREE.Scene();

    /* 3.camera */
    camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    //camera.position.x = 0;
    //camera.position.y = 30;
    //camera.position.z = 40;

    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 40;
    camera.lookAt(scene.position);

    /* 4.renderer */
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)

    /* 5.object */
    cube = new THREE.Mesh(new THREE.CubeGeometry(20,10,10) , new THREE.MeshNormalMaterial(
        {color:'lightblue',wireframe:'true',wireframeLineWidth:'10'}))
    //var geometry = new THREE.BoxGeometry( 5, 5, 5 );
    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //cube = new THREE.Mesh( geometry, material );

    /* 6.object properties */
    cube.rotation.z = 0.5;
    cube.rotation.y = 0.5;
    cube.position.y += 30;

    /* 7.light */
    light = new THREE.DirectionalLight('white',1);
    light.position.set(0,10,10).normalize();

    /* 8.weave together */
    document.body.appendChild(renderer.domElement);
    container = document.getElementById('ThreeJS')
    container.appendChild(renderer.domElement);
    scene.add(cube);
    renderer.render(scene,camera);

    //animate();
}

function init()
{
    //console.log("init function called...");
    //console.log("globalClickCount=="+getCount());

    //console.log("playerIndex=="+playerIndex+",serveIndex=="+serveIndex+",serveDirection=="+serveDirection);
    //console.log("localStorage variable=="+getCount());
    if(getCount() == null)
    {
        /* set the variable for localStorage */
        setCount(1);
        //console.log("localStorage variable has been set, value=="+getCount());

        /*
         * 1.set SCREEN_WIDTH and SCREEN_HEIGHT
         * 2.scene
         * 3.camera
         * 4.renderer
         * 5.object(say cube)
         * 6.object properties
         * 7.light
         * 8.weave together
         * */
        //console.log("came inside the init function...")
        //console.log("came inside the config setting part of init function...")

        /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
        SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight;

        /* 2.scene*/
        scene = new THREE.Scene();

        /* 3.camera */
        camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
        camera.position.x = 0;
        camera.position.y = 40;
        camera.position.z = 58;
        camera.lookAt(scene.position);

        /* 4.renderer */
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)

        /* 5.object */
        //cube = new THREE.Mesh(new THREE.CubeGeometry(20,10,10) , new THREE.MeshNormalMaterial(
        //    {color:'lightblue',wireframe:'true',wireframeLineWidth:'10'}))

        /* 6.object properties */
        //cube.rotation.z = 0.5;
        //cube.rotation.y = 0.5;
        //cube.position.y += 30;

        /* 7.light - commented out is the earlier light configuration which renders court lines as black
         , what is below is what gives the court the white lines */
        //light = new THREE.DirectionalLight('white',1);
        ////light.position.set(0,10,10).normalize();
        //light.position.set(20,20,0).normalize();

        // ambient
        scene.add( new THREE.AmbientLight( 0xffffff, 0.4 ) );
        // light
        light = new THREE.PointLight( 0xffffff, 0.5 );
        light.position.set( 20, 20, 0 );
        camera.add( light );

        /* adding elements to scene */
        resizeWindowAndToggleOnM();
        drawCourt();
        drawNet();
        //playSound('../sounds/courtBackground.mp3',0);
        drawFloorAndSky();
        datGUIControls();

        /* 8.weave together */
        container = document.getElementById('ThreeJS')
        container.appendChild(renderer.domElement);
        //scene.add(cube);

        /* test function to draw Court markers */
        //showDistanceMarkersOnCourt();
    }

    else
    {
        /* disabling the dropdown lists since selections have been made
         * Keeping them open, just floods
         * 1. Percentage comparison about on-court statistics - ad_wide + ... deuce_wide != 100 %
         * 2. Too much text going from sky to the court area */
        document.getElementById("playerselect").disabled=true;
        document.getElementById("playerselect").style="background-color:#d3d3d3";

        document.getElementById("serveselect").disabled=true;
        document.getElementById("serveselect").style="background-color:#d3d3d3";

        //console.log("count=="+getCount())
        setCount(parseInt(getCount())+1);
        //console.log("came inside the config setting NOT NEEDED part of init function...")

        /* display serve information */
        var space = 3;
        var sphereYRadiusAdjustment = 1;

        //show ball marker
        var markerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.8,31,31), new THREE.MeshLambertMaterial({
            color: getCurveColor(serveDirection),
            opacity: 1,
            transparent: true,
            //wireframe : true,
        }));
        markerSphere.position.x = -43;
        markerSphere.position.y = 26-((getCount()-1)*space) + sphereYRadiusAdjustment;
        markerSphere.position.z = 0;
        scene.add(markerSphere);

        //show text
        playSound('../sounds/loadingshuffle',2);
        addTextHelper(0,"Direction : "+getServeDirectionToAddText(),-40,26-((getCount()-1)*space),0,false,1.8,0.1,0,0xf0f8ff);
        addTextHelper(0,"Serves : "+getNumberOfServesToAddText(serveDirection),-12,26-((getCount()-1)*space),0,false,1.8,0.1,0,0xf0f8ff);
        addTextHelper(0,"Avg. Height : "+getAverageServeHeightToAddText(),5,26-((getCount()-1)*space),0,false,1.8,0.1,0,0xf0f8ff);
        addTextHelper(0,"Avg. Speed : "+getAverageServeSpeedToAddText(),23,26-((getCount()-1)*space),0,false,1.8,0.1,0,0xf0f8ff);
        //console.log("y coordinate == "+22-((getCount()-1)*space));

        /* testing the split function */
        //showStripwiseSplit();

        /* plot serve trajectory */
        drawIncrementalTubeAndSphere();
    }

    renderer.render(scene,camera);
}

function resizeWindowAndToggleOnM()
{
    //////////////
    //// EVENTS //
    //////////////

    // automatically resize renderer
    THREEx.WindowResize(renderer, camera);
    // toggle full-screen on given key press
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
}

/* test function to draw a line before I figured the problem was with camera.lookAt(scene.position)*/
function drawLine()
{
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( 0, 10, 0 ),
        new THREE.Vector3( 0, -30, -10 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
}

/* actual dimensions - draw court using TubeGeometry (uses drawCourtHelper) */
//function drawCourt()
//{
//    var correctionFactor = 0.5;
//
//    //left side
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,-39.5))
//    drawCourtHelper(new THREE.Vector3(-18*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(-18*correctionFactor,0*correctionFactor,-39.5))
//
//    //right side
//    drawCourtHelper(new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,-39.5))
//    drawCourtHelper(new THREE.Vector3(18*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(18*correctionFactor,0*correctionFactor,-39.5))
//
//    //far side baseline
//    drawCourtHelper(new THREE.Vector3(-18*correctionFactor,0*correctionFactor,-39.5),new THREE.Vector3(18*correctionFactor,0*correctionFactor,-39.5))
//
//    //near side baseline
//    drawCourtHelper(new THREE.Vector3(-18*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(18*correctionFactor,0*correctionFactor,39.5))
//
//    //far side service box
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,-21),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,-21))
//
//    //near side service box
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,21),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,21))
//
//    //middle line vertical
//    drawCourtHelper(new THREE.Vector3(0*correctionFactor,0*correctionFactor,21),new THREE.Vector3(0*correctionFactor,0*correctionFactor,-21))
//
//    //middle line horizontal
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,0),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,0))
//
//    //far side mid tip
//    drawCourtHelper(new THREE.Vector3(0*correctionFactor,0*correctionFactor,-39.5),new THREE.Vector3(0*correctionFactor,0*correctionFactor,-38.5))
//
//    //near side mid tip
//    drawCourtHelper(new THREE.Vector3(0*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(0*correctionFactor,0*correctionFactor,38.5))
//}

/* draw court using TubeGeometry (uses drawCourtHelper) */
function drawCourt()
{
    ///* far side */
    //var farBaselineZ = -35;
    //
    ///* near side */
    //var nearBaselineZ = 15;
    //
    ///* left side */
    //var leftSinglesLineX = -15, leftDoublesLineX = -20;
    //
    ///* right side */
    //var rightSinglesLineX = 15, rightDoublesLineX = 20;
    //
    ///* coordinates needing computation */
    //var midLineX = leftDoublesLineX + (rightDoublesLineX - leftDoublesLineX)/2
    //var nearServiceBoxZ = nearBaselineZ - (0.4 * ((nearBaselineZ - farBaselineZ)/2));
    //var farServiceBoxZ = farBaselineZ + (0.4 * ((nearBaselineZ - farBaselineZ)/2));

    //left side
    drawCourtHelper(new THREE.Vector3(leftSinglesLineX,0,nearBaselineZ),new THREE.Vector3(leftSinglesLineX,0,farBaselineZ))
    drawCourtHelper(new THREE.Vector3(leftDoublesLineX,0,nearBaselineZ),new THREE.Vector3(leftDoublesLineX,0,farBaselineZ))

    //right side
    drawCourtHelper(new THREE.Vector3(rightSinglesLineX,0,nearBaselineZ),new THREE.Vector3(rightSinglesLineX,0,farBaselineZ))
    drawCourtHelper(new THREE.Vector3(rightDoublesLineX,0,nearBaselineZ),new THREE.Vector3(rightDoublesLineX,0,farBaselineZ))

    //far side baseline
    drawCourtHelper(new THREE.Vector3(leftDoublesLineX,0,farBaselineZ),new THREE.Vector3(rightDoublesLineX,0,farBaselineZ))

    //near side baseline
    drawCourtHelper(new THREE.Vector3(leftDoublesLineX,0,nearBaselineZ),new THREE.Vector3(rightDoublesLineX,0,nearBaselineZ))

    //far side service box
    drawCourtHelper(new THREE.Vector3(leftSinglesLineX,0,farServiceBoxZ),new THREE.Vector3(rightSinglesLineX,0,farServiceBoxZ))

    //near side service box
    drawCourtHelper(new THREE.Vector3(leftSinglesLineX,0,nearServiceBoxZ),new THREE.Vector3(rightSinglesLineX,0,nearServiceBoxZ))

    //middle line vertical
    drawCourtHelper(new THREE.Vector3(midLineX,0,farServiceBoxZ),new THREE.Vector3(midLineX,0,nearServiceBoxZ))

    //far side mid tip
    drawCourtHelper(new THREE.Vector3(midLineX,0,farBaselineZ),new THREE.Vector3(midLineX,0,farBaselineZ+1))

    //near side mid tip
    drawCourtHelper(new THREE.Vector3(midLineX,0,nearBaselineZ),new THREE.Vector3(midLineX,0,nearBaselineZ-1))

    //addTextHelper(0,"MARAT SAFIN",-5,24,0,false,2,0.1);
    //addText("Serve Direction",-3,23,0,true,1,0.1);

    //var cube = new THREE.Mesh(new THREE.CubeGeometry(1,1,1), new THREE.MeshLambertMaterial({
    //    color: 'orange',
    //}));
    //cube.position.x = -10;
    //cube.position.y = 10;
    //cube.position.z = 0;
    //
    //var light = new THREE.DirectionalLight('white', 1);
    //light.position.set(10,40,50).normalize();
    //scene.add(light);
    //scene.add(cube);
    //
    //sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5,31,31), new THREE.MeshLambertMaterial({
    //
    //    color: 'red',
    //    opacity: 0.4,
    //    transparent: true,
    //    wireframe : true,
    //}));
    //sphere.position.x = -10;
    //sphere.position.y = 20;
    //sphere.position.z = 0;
    //
    //scene.add(sphere);

    //addTextHelper(0,"serve direction",-3,27,0,true,2,0.1,0);
    addTextHelper(0,"serve direction",-12,0,4,true,3,0.1,-Math.PI / 2,0xf0f8ff);
}

function drawCourtHelper(coordinate1, coordinate2)
{
    var courtMesh;

    /* left singles horizontal */
    // path
    var points = [];
    points.push(coordinate1,coordinate2 )

    // params
    var pathSegments = 512;
    var tubeRadius = 0.15;
    var radiusSegments = 5;
    var closed = false;

    // material
    var material = new THREE.MeshPhongMaterial( {
        //color: 0x00ffff, //alice blue
        color: 'white',
        side: THREE.DoubleSide
    } );

    var path = new THREE.CatmullRomCurve3( points );

    // geometry
    var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, open );

    // to buffer goemetry
    geometry = new THREE.BufferGeometry().fromGeometry( geometry );

    // courtMesh
    courtMesh = new THREE.Mesh( geometry, material );
    scene.add( courtMesh );
}

function drawFloorAndSkyAnimate()
{
    requestAnimationFrame( drawFloorAndSkyAnimate );
    renderer.render(scene,camera);
    controls.update();
}

function drawFloorAndSky()
{
    //////////////
    // CONTROLS //
    //////////////
    // move mouse and: left   click to rotate,
    //                 middle click to zoom,
    //                 right  click to pan
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.target.set( 0, 8, 0 );

    ///////////
    // FLOOR //
    ///////////
    // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
    //var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    floorTexture = new THREE.ImageUtils.loadTexture( '../images/grass256.jpg' );
    while (floorTexture == null);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 20, 20 );
    // DoubleSide: render texture on both sides of mesh
    floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    floorGeometry = new THREE.PlaneGeometry(110, 110, 1, 1);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    /////////
    // SKY //
    /////////
    // recommend either a skybox or fog effect (can't use both at the same time)
    // without one of these, the scene's background color is determined by webpage background
    // make sure the camera's "far" value is large enough so that it will render the skyBox!
    skyBoxGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);

    /* keeping it going */
    requestAnimationFrame( drawFloorAndSkyAnimate );
    renderer.render(scene,camera);
    controls.update();
}

function visualizeServe()
{
    alert("came inside visualizeServe...")
}

function getTubeData(XCoordinateStart,XCoordinateEnd)
{
    //console.log("came inside getTubeData...");

    var XCoordinate = (Math.random()*(XCoordinateEnd-XCoordinateStart))+XCoordinateStart;
    var YCoordinate = (Math.random()*(30-25))+25;
    var ZCoordinate = Math.floor((Math.random() * (25-12)) + 12 ) *  -1;//get random number between -12 and -25

    var numPoints = 10;
    var start;
    /* ad side */
    if(XCoordinateStart >= 0 && XCoordinateStart <= 15)
        start = new THREE.Vector3(-0, 0, 80);
    /* deuce side */
    else if(XCoordinateStart >= -15 && XCoordinateStart <= 0)
        start = new THREE.Vector3(0, 0, 80);
    var middle = new THREE.Vector3(0, YCoordinate, 20);
    var end = new THREE.Vector3(XCoordinate, 0, ZCoordinate);

    var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
    var tube = new THREE.TubeGeometry(curveQuad, numPoints, 0.5, 1, false);

    var points = [];
    for(var i = 0;i<tube.vertices.length;i++)
    {
        if(tube.vertices[i].z <= 15)
            points.push(new THREE.Vector3(tube.vertices[i].x,tube.vertices[i].y,tube.vertices[i].z));
    }
    //points = tube.vertices;
    //console.log("printing tube vertices...")
    //for(var i = 0;i<tube.vertices.length;i++)
    //{
    //    console.log("vertices["+i+"]==("+tube.vertices[i].x+","+tube.vertices[i].y+","+tube.vertices[i].z+")")
    //}

    //console.log("returned points...");
    return points;
}

function getCurveColor(serveDirection)
{
    switch(serveDirection)
    {
        case 'ad_wide':
            return 0x00ffff;
        case 'ad_middle':
            return 0x9ACD32;
        case 'ad_t':
            return 0xFF3300;
        case 'deuce_t':
            return 0x000033;
        case 'deuce_middle':
            return 0xFEE0C6;
        case 'deuce_wide':
            return 0xFF6600;
    }
}

//function getCurveColor(serveDirection)
//{
//    var toReturn;
//    switch(serveDirection)
//    {
//        case 'ad_wide':
//        {
//            toReturn = 0x00ffff;
//            break;
//        }
//
//        case 'ad_middle':
//        {
//            toReturn = 0x9ACD32;
//            break;
//        }
//
//        case 'ad_t':
//        {
//            toReturn = 0xFF3300;
//            break;
//        }
//
//        case 'deuce_t':
//        {
//            toReturn = 0x000033;
//            break;
//        }
//
//        case 'deuce_middle':
//        {
//            toReturn = 0xFEE0C6;
//            break;
//        }
//
//        case 'deuce_wide':
//        {
//            toReturn = 0xFF6600;
//            break;
//        }
//    }
//    console.log("came inside getCurveColor with serveDirection=="+serveDirection+", returning"+toReturn);
//    return toReturn;
//}

function drawIncrementalTubeAndSphere()
{
    var curveColor;
    var curveColorDebug;
    var tubeMesh;
    var nEnd = 0,nMax,nStep = 1000;

    //console.log("serveDirection=="+serveDirection)
    var XCoordinateStart,XCoordinateEnd;

    numServes = getServeCountInDirection(serveDirection)
    console.log("numServes ==" + numServes);

    /* setting XCoordinate based on  serveDirection */
    switch (serveDirection) {
        case 'deuce_wide':
            XCoordinateStart = -15;
            XCoordinateEnd = -10;
            curveColor = getCurveColor(serveDirection);//alice blue
            curveColorDebug = 'alice blue'
            break;
        case 'deuce_middle':
            XCoordinateStart = -10;
            XCoordinateEnd = -3;
            curveColor = getCurveColor(serveDirection);//yellow green
            curveColorDebug = 'yellow green'
            break;
        case 'deuce_t':
            XCoordinateStart = -3;
            XCoordinateEnd = 0;
            curveColor = getCurveColor(serveDirection);//red
            curveColorDebug = 'red'
            break;
        case 'ad_t':
            XCoordinateStart = 0;
            XCoordinateEnd = 3;
            curveColor = getCurveColor(serveDirection);//blue
            curveColorDebug = 'blue'
            break;
        case 'ad_middle':
            XCoordinateStart = 3;
            XCoordinateEnd = 10;
            curveColor = getCurveColor(serveDirection);//caramel
            curveColorDebug = 'caramel'
            break;
        case 'ad_wide':
            XCoordinateStart = 10;
            XCoordinateEnd = 15;
            curveColor = getCurveColor(serveDirection);//orange
            curveColorDebug = 'orange'
            break;
    }

    //if required, add serveDepth later
    //switch (serveDepth) {
    //    case 'deuce_wide':
    //        XCoordinateStart = -15;
    //        XCoordinateEnd = -12;
    //        break;
    //    case 'ad_wide':
    //        XCoordinateStart = 12;
    //        XCoordinateEnd = 15;
    //        break;
    //}

    /* curve config */
    // params
    var pathSegments = 512;
    var tubeRadius = 0.2;
    var radiusSegments = 8;
    var closed = false;

    // material
    var material = new THREE.MeshPhongMaterial( {
        opacity: 0.4,
        transparent: true,
        color:curveColor,
        side: THREE.DoubleSide
    } );
    //console.log("serveDirection=="+serveDirection+",curveColorDebug=="+curveColorDebug);

    //// ambient
    //scene.add( new THREE.AmbientLight( 0xffffff, 0.4 ) );
    //
    //// light
    //var light = new THREE.PointLight( 0xffffff, 0.5 );
    //light.position.set( 20, 20, 0 );
    //camera.add( light );

    //gets the points required by the serve's TubeGeometry
    for(var i =0;i<numServes;i++)
    {
        var points = getTubeData(XCoordinateStart,XCoordinateEnd);

        // path
        var path = new THREE.CatmullRomCurve3( points );

        // geometry
        var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

        // to buffer goemetry
        geometry = new THREE.BufferGeometry().fromGeometry( geometry );
        nMax = geometry.attributes.position.count;

        // tubeMesh
        tubeMesh = new THREE.Mesh( geometry, material );
        scene.add(tubeMesh);
        animateIncrementalServe(tubeMesh,nEnd,nStep,nMax);

        displaySphere(points,curveColor);
    }
    material = null;
}

/* The simpler replacement of this is just : scene.add( tubeMesh ); */
function animateIncrementalServe(tubeMesh,nEnd,nStep,nMax) {

    animationTracker = requestAnimationFrame( function(){animateIncrementalServe(tubeMesh,nEnd,nStep,nMax)} );

    //below line to repeat process (run in loop)
    //nEnd = ( nEnd + nStep ) % nMax;

    nEnd = ( nEnd + nStep );

    if(nEnd > nMax)
    {
        cancelAnimationFrame(animationTracker);
        return;
    }

    tubeMesh.geometry.setDrawRange( 0, nEnd );
    console.log("inside animateIncrementalServe, nEnd=="+nEnd+"nMax=="+nMax);
    renderer.render( scene, camera );
}

function displaySphere(points,curveColor)
{
    //console.log("came inside displaySphere");

    //for(var i = 0;i<points.length;i++)
    //{
    //    if(i%3 == 0)
    //    {
    //        sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2,31,31), new THREE.MeshLambertMaterial({
    //            color: 'yellow',
    //            opacity: 1.0,
    //            transparent: true,
    //        }));
    //
    //        sphere.position.x = points[i].x;
    //        sphere.position.y = points[i].y;
    //        sphere.position.z = points[i].z;
    //
    //        scene.add(sphere);
    //    }
    //}
    //renderer.render(scene, camera);

    var sphere;
    /* adding the start point to be yellow */
    sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2,31,31), new THREE.MeshLambertMaterial({

        color: 'yellow',
        opacity: 1.0,
        transparent: true,
    }));
    sphere.position.x = points[0].x;
    sphere.position.y = points[0].y;
    sphere.position.z = points[0].z;
    scene.add(sphere);

    /* adding the end point to be curveColor */
    sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2,31,31), new THREE.MeshLambertMaterial({
        color: curveColor,
        opacity: 1.0,
        transparent: true,
    }));
    sphere.position.x = points[points.length-1].x;
    sphere.position.y = points[points.length-1].y;
    sphere.position.z = points[points.length-1].z;
    scene.add(sphere);

    renderer.render(scene, camera);
}

/* text related functions */
function generateRandomString(length)
{
    var randomString = "";
    var wideNumbers = ['2','3','4','5','6','8'];
    var hexAlphabet = ['A','B','C','D','E','F'];
    var randomChoice = Math.floor(Math.random()*100);
    if(randomChoice %2 == 0)
    {
        //console.log("randomChoice even... == "+randomChoice);
        for(var i = 0;i<length;i++)
        {
//                randomString += Math.floor(Math.random() * 2)
            randomString += wideNumbers[Math.floor(Math.random() * (wideNumbers.length - 1) )]
        }
    }
    else
    {
        //console.log("randomChoice odd... "+randomChoice);
        for(var i = 0;i<length;i++)
        {
            randomString += hexAlphabet[Math.floor(Math.random() * (hexAlphabet.length - 1) )]
        }
    }
    return randomString;
}

//function addTextHelper(textAnimationCount,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight)
//{
//    /* Logic
//     Assume : var textLoadBreakpointsArray = [5,10,20,30,40]
//     var textBlinkBreakpointsArray = [50,100,150,200];
//
//     LOAD STAGE
//     ----------
//     * 1.textAnimationCount == 1, addText() function not called
//     * 2.textAnimationCount == 2, addText() function not called
//     * 3.textAnimationCount == 3, addText() function not called
//     * 4.textAnimationCount == 4, addText() function not called
//     * 5.textAnimationCount == 5, addText() function called,
//     *                            deletes empty array,
//     *                            displays text==DBBBABAADCE,
//     *                            added to textMeshArray so as to delete next time addText() is called, which is at 10
//     * 6-9.textAnimationCount == 6-9,addText() function not called, mesh keeps displaying same text==DBBBABAADCE
//     * 10.textAnimationCount == 10,addText() function called,
//     *                          deletes the mesh displaying DBBBABAADCE,
//     *                          displays text==08282382282,
//     * 10-19                    and keeps displaying so till 19
//     * ..
//     * ..
//     * 30.textAnimationCount == 30, deletes ABCDEFFGSD, displays 43643646334
//     * 30-39.textAnimationCount == addText() function not called, displays text==43643646334
//     * 40.textAnimationCount == 40, addText() function called,
//     *                              deletes the mesh displaying DBBBABAADCE,
//     *                              displays text 4652345236
//     *
//     *  BLINK STAGE
//     *  -----------
//     *  50-59 displays MARAT SAFIN, 60-99 displays ""
//     *   60 because (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay), and not <= blinkDelay
//     *  100-109 displays MARAT SAFIN, 110-149 displays ""
//     *  150-159 displays MARAT SAFIN, 160-199 displays ""
//     * 200 displays persistent text MARAT SAFIN
//     *
//     * 50-59 explained
//     * 50.textAnimationCount == 50
//     *  addText() function called,
//     *  deletes empty textMeshArray
//     *  displays MARAT SAFIN
//     *  adds MARAT SAFIN to mesh
//     *
//     * 51.textAnimationCount == 51
//     *  addText() function called,
//     *  deletes textMeshArray having MARAT SAFIN
//     *  displays new text MARAT SAFIN
//     *  adds MARAT SAFIN to mesh
//     *  ..
//     *  ..
//     *
//     * 60.textAnimationCount == 60
//     *  addText() function called,
//     *  deletes textMeshArray having MARAT SAFIN
//     *  displays new text ""
//     *  adds "" to textMeshArray
//     *  61-99.textAnimationCount == 61-99
//     *  addText() function called,
//     *  deletes textMeshArray having ""
//     *  displays new text ""
//     *  adds "" to textMeshArray
//     *
//     * */
////        console.log("text=="+text);
////    console.log("textAnimationCount=="+textAnimationCount);
////        console.log("came inside addTextHelper as addTextHelper("+textAnimationCount+","+text+","+XCoordinate+","+YCoordinate+","+ZCoordinate+","+persist+")");
////        textAnimationCount++;
//
////        console.log("textAnimationCount=="+textAnimationCount);
//
//    /* shuffle and load characters */
//    var textLoadBreakpointsArray = [5,10,20,30,40]
//    if(textLoadBreakpointsArray.indexOf(textAnimationCount) > -1)
//    {
//        addText(generateRandomString(text.length),XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
//    }
//
//    /* blink */
//    var textBlinkBreakpointsArray = [50,100,150,200];
//    var blinkDelay = 10;
//    var blinkDisplayNeeded = false;
//    if(textAnimationCount >= textBlinkBreakpointsArray[0] && textAnimationCount < textBlinkBreakpointsArray[textBlinkBreakpointsArray.length - 1])
//    {
//        for(var i = 0;i<textBlinkBreakpointsArray.length;i++)
//        {
//            if( (textAnimationCount - textBlinkBreakpointsArray[i]) >=0 &&
//                (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay)
//            {
//                blinkDisplayNeeded = true;
//                break;
//            }
//        }
//        //console.log("textAnimationCount=="+textAnimationCount+",blinkDisplayNeeded=="+blinkDisplayNeeded+",teed off by"+textBlinkBreakpointsArray[i]);
//        if(blinkDisplayNeeded == true)
//            addText(text,XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
//        else
//            addText("",XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
//    }
//
//    /* final persistent display */
//    if(textAnimationCount == textBlinkBreakpointsArray[textBlinkBreakpointsArray.length -1])
//        addText(text,XCoordinate,YCoordinate,ZCoordinate,true,textSize,textHeight)
//
//    requestAnimationFrame( function(){addTextHelper(textAnimationCount+1,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight)} );
//}

function addTextHelper(textAnimationCount,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight,textRotation,textColor)
{
    /* Logic
     Assume : var textLoadBreakpointsArray = [5,10,20,30,40]
     var textBlinkBreakpointsArray = [50,100,150,200];

     LOAD STAGE
     ----------
     * 1.textAnimationCount == 1, addText() function not called
     * 2.textAnimationCount == 2, addText() function not called
     * 3.textAnimationCount == 3, addText() function not called
     * 4.textAnimationCount == 4, addText() function not called
     * 5.textAnimationCount == 5, addText() function called,
     *                            deletes empty array,
     *                            displays text==DBBBABAADCE,
     *                            added to textMeshArray so as to delete next time addText() is called, which is at 10
     * 6-9.textAnimationCount == 6-9,addText() function not called, mesh keeps displaying same text==DBBBABAADCE
     * 10.textAnimationCount == 10,addText() function called,
     *                          deletes the mesh displaying DBBBABAADCE,
     *                          displays text==08282382282,
     * 10-19                    and keeps displaying so till 19
     * ..
     * ..
     * 30.textAnimationCount == 30, deletes ABCDEFFGSD, displays 43643646334
     * 30-39.textAnimationCount == addText() function not called, displays text==43643646334
     * 40.textAnimationCount == 40, addText() function called,
     *                              deletes the mesh displaying DBBBABAADCE,
     *                              displays text 4652345236
     *
     *  BLINK STAGE
     *  -----------
     *  50-59 displays MARAT SAFIN, 60-99 displays ""
     *   60 because (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay), and not <= blinkDelay
     *  100-109 displays MARAT SAFIN, 110-149 displays ""
     *  150-159 displays MARAT SAFIN, 160-199 displays ""
     * 200 displays persistent text MARAT SAFIN
     *
     * 50-59 explained
     * 50.textAnimationCount == 50
     *  addText() function called,
     *  deletes empty textMeshArray
     *  displays MARAT SAFIN
     *  adds MARAT SAFIN to mesh
     *
     * 51.textAnimationCount == 51
     *  addText() function called,
     *  deletes textMeshArray having MARAT SAFIN
     *  displays new text MARAT SAFIN
     *  adds MARAT SAFIN to mesh
     *  ..
     *  ..
     *
     * 60.textAnimationCount == 60
     *  addText() function called,
     *  deletes textMeshArray having MARAT SAFIN
     *  displays new text ""
     *  adds "" to textMeshArray
     *  61-99.textAnimationCount == 61-99
     *  addText() function called,
     *  deletes textMeshArray having ""
     *  displays new text ""
     *  adds "" to textMeshArray
     *
     * */
//        console.log("text=="+text);
//    console.log("textAnimationCount=="+textAnimationCount);
//        console.log("came inside addTextHelper as addTextHelper("+textAnimationCount+","+text+","+XCoordinate+","+YCoordinate+","+ZCoordinate+","+persist+")");
//        textAnimationCount++;

//        console.log("textAnimationCount=="+textAnimationCount);

    /* shuffle and load characters */
    var textLoadBreakpointsArray = [5,10,15]
    if(textLoadBreakpointsArray.indexOf(textAnimationCount) > -1)
    {
        addText(generateRandomString(text.length),XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight,textRotation,textColor)
    }

    /* blink */
    var textBlinkBreakpointsArray = [20,35];
    var blinkDelay = 10;
    var blinkDisplayNeeded = false;
    if(textAnimationCount >= textBlinkBreakpointsArray[0] && textAnimationCount < textBlinkBreakpointsArray[textBlinkBreakpointsArray.length - 1])
    {
        for(var i = 0;i<textBlinkBreakpointsArray.length;i++)
        {
            if( (textAnimationCount - textBlinkBreakpointsArray[i]) >=0 &&
                (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay)
            {
                blinkDisplayNeeded = true;
                break;
            }
        }
        //console.log("textAnimationCount=="+textAnimationCount+",blinkDisplayNeeded=="+blinkDisplayNeeded+",teed off by"+textBlinkBreakpointsArray[i]);
        if(blinkDisplayNeeded == true)
            addText(text,XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight,textRotation,textColor)
        else
            addText("",XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight,textRotation,textColor)
    }

    /* final persistent display */
    if(textAnimationCount == textBlinkBreakpointsArray[textBlinkBreakpointsArray.length -1])
        addText(text,XCoordinate,YCoordinate,ZCoordinate,true,textSize,textHeight,textRotation,textColor)

    requestAnimationFrame( function(){addTextHelper(textAnimationCount+1,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight,textRotation,textColor)} );
}

/* adds text given a string */
/* Correct call : addTextHelper(0,"serve direction",-12,0,4,true,3,0.1,-Math.PI / 2); */
function addText(text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight,textRotation,textColor)
{
    //console.log(" came inside addText as addText("+text+","+XCoordinate+","+YCoordinate+","+ZCoordinate+","+persist+")");
    //console.log("text=="+text);

    //clear till last
    for(var i =0;i<textMeshArray.length;i++)
        scene.remove(textMeshArray[i]);

    // add 3D text
    //var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    //var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    //var materialFront = new THREE.MeshBasicMaterial( { color: 0xf0f8ff } );
    //var materialSide = new THREE.MeshBasicMaterial( { color: 0xf0f8ff } );
    var materialFront = new THREE.MeshBasicMaterial( { color: textColor } );
    var materialSide = new THREE.MeshBasicMaterial( { color: textColor } );
    var materialArray = [ materialFront, materialSide ];

//	var textGeom = new THREE.TextGeometry( "Hello, World!",
//			{
//				size: 1, height: 0.1, curveSegments: 3,
//				font: fontname, weight:'bold',
//				bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
//				material: 0, extrudeMaterial: 1
//			});
    var textGeom = new THREE.TextGeometry( text, {
        font: 'digital-7',size:textSize,height:textHeight
    });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    var textMesh = new THREE.Mesh(textGeom, textMaterial );

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    textMesh.position.set( XCoordinate,YCoordinate,ZCoordinate );
    //textMesh.rotation.x = -Math.PI / 4;
    textMesh.rotation.x = textRotation;
    scene.add(textMesh);
    if(persist == false)
        textMeshArray.push(textMesh);

    renderer.render(scene,camera);

    //if(persist == false)
    //    scene.remove(textMesh);
}

/* helper function to addText giving serve information, which translates
 * ad_wide : Ad court wide
 * ad_middle : Ad court middle
 * ad_t : Ad court T
 * deuce_wide : Deuce court wide
 * deuce_middle : Deuce court middle
 * deuce_t : Deuce court T
 * */
function getServeDirectionToAddText()
{
    switch(serveDirection)
    {
        case 'ad_wide':
            return "Ad court wide";
        case 'ad_middle':
            return "Ad court mid";
        case 'ad_t':
            return "Ad court T";
        case 'deuce_wide':
            return "Deuce court wide";
        case 'deuce_middle':
            return "Deuce court mid";
        case 'deuce_t':
            return "Deuce court T";
    }
}

function getServeCountInDirection(serveDirection)
{
    for(var i = 0; i < JSONobj.length; i++)
    {
        if(JSONobj[i].row == row)
            return JSONobj[i][serveDirection];
    }
}

/* helper function to addText giving serve information, on the number of serves made in that direction */
function getNumberOfServesToAddText(serveDirection)
{
    //return "22/88";
    numServes = getServeCountInDirection(serveDirection)

    var totalServes = 0;
    for(var i = 0;i<JSONobj.length;i++)
    {
        if(JSONobj[i].row == row)
        {
            totalServes = JSONobj[i]["ad_wide"] + JSONobj[i]["ad_middle"] + JSONobj[i]["ad_t"]
                +JSONobj[i]["deuce_t"] + JSONobj[i]["deuce_middle"] + JSONobj[i]["deuce_wide"];
            break;
        }
    }
    console.log("numServes=="+numServes);
    console.log("totalServes=="+totalServes);
    return (numServes.toString() + " / " + totalServes.toString());
}

/* helper function to addText giving serve information, on the number of serves made in that direction */
function getNumberOfServesToAddText2015(serveDirection)
{
    switch(serveDirection)
    {
        case "deuce_wide":
            return "36 / 72";
        case "deuce_middle":
            return "7 / 72";
        case "deuce_t":
            return "29 / 72";
        case "ad_wide":
            return "34 / 69";
        case "ad_middle":
            return "7 / 69";
        case "ad_t":
            return "28 / 69";
    }
}

/* helper function to addText giving serve information, on the average height of serves made in that direction */
function getAverageServeHeightToAddText()
{
    return (Math.floor(((Math.random()*(20-10))+10)).toString() + "m");
}

/* helper function to addText giving serve information, on the average speed of serves made in that direction */
function getAverageServeSpeedToAddText()
{
    return (Math.floor((Math.random()*(140-100))+100).toString() + "mph");
}

function showStripwiseSplit()
{
    var stripData = [
        {
            position : 'deuce_wide',
            start : -15,
            end : -10,
        },
        {
            position : 'deuce_middle',
            start : -10,
            end : -3,
        },
        {
            position : 'deuce_t',
            start : -3,
            end : 0,
        },
        {
            position : 'ad_t',
            start : 0,
            end : 3,
        },
        {
            position : 'ad_middle',
            start : 3,
            end : 10,
        },
        {
            position : 'ad_wide',
            start : 10,
            end : 15,
        }
    ];

    addTextHelper(0,"2015",-5,0,12,true,5,0.1,-Math.PI / 2);
    addTextHelper(0,"Wimbledon Finals",-10,0,14,true,2,0.1,-Math.PI / 2);

    addTextHelper(0,"2012",-5,0,-28,true,5,0.1,-Math.PI / 2);
    addTextHelper(0,"Wimbledon Semi Finals",-10,0,-26,true,2,0.1,-Math.PI / 2);

    /* setting the length, width and height of cube */
    for(var i = 0; i <stripData.length;i++)
    {
        var width = stripData[i].end - stripData[i].start;
        var length = farServiceBoxZ-netLineZ;
        var height = 0.1;
        var curveColor = getCurveColor(stripData[i].position);

        var cube1 = new THREE.Mesh(new THREE.CubeGeometry(width,length,height), new THREE.MeshLambertMaterial({
            color: curveColor,
        }));

        /* cube 2012 */
        /* setting the position of cube */
        cube1.position.x = stripData[i].start + (width/2);
        cube1.position.y = 0;
        cube1.position.z = netLineZ + (length/2);
        cube1.rotation.x = Math.PI / 2;

        /* add cube to scene */
        scene.add(cube1);

        var cube2 = new THREE.Mesh(new THREE.CubeGeometry(width,length,height), new THREE.MeshLambertMaterial({
            color: curveColor,
        }));

        /* cube 2015 */
        /* setting the position of cube */
        cube2.position.x = stripData[i].start + (width/2);
        cube2.position.y = 0;
        cube2.position.z = netLineZ - (length/2);
        cube2.rotation.x = Math.PI / 2;

        /* add cube to scene */
        scene.add(cube2);

        var textSize = 2;
        var textColor = 0x000000;//black default

        if(stripData[i].position == "deuce_t" || stripData[i].position == "ad_t")
            textSize = 1;

        if(stripData[i].position == "deuce_t" || stripData[i].position == "ad_t")
            textColor = 0xffffff;

        /* text 2012 */
        var percentageString = getNumberOfServesToAddText(stripData[i].position);
        console.log("percentageString == "+percentageString);
        var percentage = Math.round((percentageString.split(" / ")[0] / percentageString.split(" / ")[1]) * 100);
        addTextHelper(0,percentage.toString(),stripData[i].start + (width/2) - 1,0,netLineZ - 6,true,textSize,0.1,-Math.PI / 2,textColor);
        addTextHelper(0,"%",stripData[i].start + (width/2),0,netLineZ - 4,true,textSize,0.1,-Math.PI / 2,textColor);

        /* text 2015 */
        percentageString = getNumberOfServesToAddText2015(stripData[i].position);
        console.log("percentageString == "+percentageString);
        percentage = Math.round((percentageString.split(" / ")[0] / percentageString.split(" / ")[1]) * 100);
        addTextHelper(0,percentage.toString(),stripData[i].start + (width/2) - 1,0,netLineZ + 6,true,textSize,0.1,-Math.PI / 2,textColor);
        addTextHelper(0,"%",stripData[i].start + (width/2),0,netLineZ - 4,true,textSize,0.1,-Math.PI / 2,textColor);
    }
}


function showDistanceMarkersOnCourt()
{
    playSound('../sounds/loadingshuffle',1);

    var numMarkingsOnEachSide = 5;
    var markerInterval = (Math.abs(farBaselineZ) - Math.abs(netLineZ))/numMarkingsOnEachSide;
    var actualDistance = 39;
    var actualInterval = actualDistance/numMarkingsOnEachSide;
    var count = 0;
    for(var i = netLineZ;i>=farBaselineZ;)
    {
        console.log("marking at i=="+i +",actual interval = "+actualInterval * count);
        drawCourtHelper(new THREE.Vector3(leftDoublesLineX - 2,0,i),new THREE.Vector3(leftDoublesLineX - 4,0,i))

        addTextHelper(0,(actualInterval * count).toString() + " feet",leftDoublesLineX - 20,0,i,true,3,0.1,-Math.PI / 2,0xf0f8ff);

        i -= markerInterval;
        count++;
    }
}

function drawNet()
{
    console.log("came inside drawNet...");
    netConfig();
    netAnimate();
}

function netConfig()
{
    // cloth material

    var clothLoader = new THREE.TextureLoader();
    var clothTexture = clothLoader.load( '../images/circuit_pattern.png' );
    //console.log("next line prints THREE.RepeatWrapping ... ");
    //console.log(THREE.RepeatWrapping);
    //console.log(clothTexture.wrapS);
    //clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
    //clothTexture.anisotropy = 16;

    var clothMaterial = new THREE.MeshPhongMaterial( {
        specular: 0x030303,
        map: clothTexture,
        side: THREE.DoubleSide,
        alphaTest: 0.5
    } );

    // cloth geometry
    clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );
    clothGeometry.dynamic = true;

    var uniforms = { texture:  { type: "t", value: clothTexture } };

    // cloth mesh

    var object = new THREE.Mesh( clothGeometry, clothMaterial );
    object.position.set( 0, 0, -10 );
    object.castShadow = true;
    scene.add( object );

    object.customDepthMaterial = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        side: THREE.DoubleSide
    } );
}

function netAnimate() {

    requestAnimationFrame( netAnimate );

    var time = Date.now();

    windStrength = Math.cos( time / 7000 ) * 20 + 40;
    windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );

    simulate( time );
    netRender();

}

function netRender() {

    var timer = Date.now() * 0.0002;

    var p = cloth.particles;

    for ( var i = 0, il = p.length; i < il; i ++ ) {

        clothGeometry.vertices[ i ].copy( p[ i ].position );

    }

    clothGeometry.computeFaceNormals();
    clothGeometry.computeVertexNormals();

    clothGeometry.normalsNeedUpdate = true;
    clothGeometry.verticesNeedUpdate = true;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}

function datGUIControls()
{
    console.log("came inside datGUIControls....");

    /////////////
    // dat.GUI //
    /////////////
    var gui = new dat.GUI();
    //var gui = new dat.GUI( { width: 300 } );
    gui.domElement.id = 'gui';

    var parameters =
    {
        f: function() { showStripwiseSplit() },
        visible: false,
    };

    gui.add( parameters, 'f' ).name('Show summary');

    var cubeVisible = gui.add( parameters, 'visible' ).name('Court markers').listen();
    cubeVisible.onChange(function(value)
    {   console.log(value);
        showDistanceMarkersOnCourt();
    });

    gui.open();
}

function playSound(sourceBase,duration)
{
    var audio = document.createElement('audio');
    var source = document.createElement('source');
    var sourceFile;

    //source.src = '../sounds/loadingshuffle1.mp3';
    if(duration > 0)
        sourceFile = sourceBase + duration.toString() +  '.mp3';
    else
        sourceFile = sourceBase;

    source.src = sourceFile;
    audio.appendChild(source);
    audio.play();
}