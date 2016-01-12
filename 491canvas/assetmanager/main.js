var AM = new AssetManager();

/* 1. Take images from local, push it to downloadQueue

 * 2. Loop iteratively, take from downloadQueue, Save it in an AssetManager member called cache,
 * to keep track of whether the count is reached,
 * It's actually only a matter of waiting to loop until downloadQueue.length, but go fancy, and have two AssetManager
 * variables called successCount and errorCount. When successCount+errorCount reaches downloadQueue.length, stop
 *
 * 3. */
AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/guy.png");
AM.queueDownload("./img/mushroomdude.png");
AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/notthere.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var img = AM.getAsset("./img/mushroomdude.png");

    ctx.drawImage(img, 0, 0);

    console.log("All Done!");
});

console.log("successCount == " + AM.successCount)
console.log("errorCount == " + AM.errorCount)
