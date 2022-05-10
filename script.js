window.onload = function() {
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image(); 
    img.src = './template.jpg';
    img.onload = async () => {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "600 130px Assistant";
        
        var response;
        var json;
        var geoJerusalem = 281184;
        response = await fetch("https://www.hebcal.com/shabbat?cfg=json&M=on&geonameid=" + geoJerusalem);
        json = await response.json();
        var parashaString = json.items[1].hebrew;
        var jerusalemEnter = json.items[0].title.split(" ")[2];
        var jerusalemExist = json.items[2].title.split(" ")[1];

        var geoTelaviv = 293397;
        response = await fetch("https://www.hebcal.com/shabbat?cfg=json&M=on&geonameid=" + geoTelaviv);
        json = await response.json();
        var telavivEnter = json.items[0].title.split(" ")[2];
        var telavivExist = json.items[2].title.split(" ")[1];

        var geoBeersheva = 295530;
        response = await fetch("https://www.hebcal.com/shabbat?cfg=json&M=on&geonameid=" + geoBeersheva);
        json = await response.json();
        var beershevaEnter = json.items[0].title.split(" ")[2];
        var beershevaExist = json.items[2].title.split(" ")[1];

        var geoHaifa = 294801;
        response = await fetch("https://www.hebcal.com/shabbat?cfg=json&M=on&geonameid=" + geoHaifa);
        json = await response.json();
        var haifaEnter = json.items[0].title.split(" ")[2];
        var haifaExist = json.items[2].title.split(" ")[1];

        var parashaWidth = ctx.measureText(parashaString).width;
        ctx.fillText(parashaString , (canvas.width/2) - (parashaWidth / 2), 415);

        if (window.localStorage) {
            if (!localStorage.getItem('reload')) {
                localStorage['reload'] = true;
                setTimeout(() => window.location.reload(), 500);
            } else {
                localStorage.removeItem('reload');
            }
        }
        
        ctx.font = "700 95px Assistant";
        var jerusalemString = `${jerusalemExist}             ${jerusalemEnter}`;
        var jerusalemWidth = ctx.measureText(jerusalemString).width;
        ctx.fillText(jerusalemString , (canvas.width/2) - (jerusalemWidth / 2) - 230, 710 + 140*0);
    
        var telavivString = `${telavivExist}             ${telavivEnter}`;
        var telavivWidth = ctx.measureText(telavivString).width;
        ctx.fillText(telavivString , (canvas.width/2) - (telavivWidth / 2) - 230, 710 + 140*1);


        var beershevaString = `${beershevaExist}             ${beershevaEnter}`;
        var beershevaWidth = ctx.measureText(beershevaString).width;
        ctx.fillText(beershevaString , (canvas.width/2) - (beershevaWidth / 2) - 230, 710 + 140*2);


        var haifaString = `${haifaExist}             ${haifaEnter}`;
        var haifaWidth = ctx.measureText(haifaString).width;
        ctx.fillText(haifaString , (canvas.width/2) - (haifaWidth / 2) - 230, 710 + 140*3);

        var loader = document.getElementById("loader");
        var button = document.getElementById("download");
        setTimeout(() => {
            loader.style.display = 'none';
            button.style.display = 'flex';
        }, 1000);
    }
};

const download = () => {
    ReImg.fromCanvas(document.getElementById('canvas')).downloadPng("shabbat-times.png");
}