var canvas = document.getElementById('wave-canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.parentNode.offsetWidth;
canvas.height = canvas.parentNode.offsetHeight;
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

var waveHight = canvas.height / 5; // 浪高
var waves = ["rgba(157, 187, 210, 0.2)",
    "rgba(171, 216, 201, 0.2)",
    "rgba(157,192,249, 0.2)",
    "rgba(0,222,255, 0.2)"]; // 四个波浪
var step = 0; // 初始角度
function loop() {
  step++;
  ctx.clearRect(0,0,canvas.width,canvas.height); // 清空

  for(var j = waves.length - 1; j >= 0; j--) {
    // var offset = step + j * Math.PI * 12;
    ctx.fillStyle = waves[j]; // 填充颜色
    var angle = (step+j*45)*Math.PI/180; // 四个波浪，波浪相位差45
    var deltaHeight = Math.sin(angle) * waveHight;
    var deltaHeightRight = Math.cos(angle) * waveHight;
    ctx.beginPath();
    ctx.moveTo(0, waveHight + deltaHeight); // 路径起点--左上角
    // ctx.lineTo(canvas.width, canvas.height/2 + deltaHeightRight);
    ctx.bezierCurveTo(canvas.width /3 , waveHight+deltaHeight, canvas.width * 2 / 3, waveHight+deltaHeightRight, canvas.width, waveHight+deltaHeightRight); // 上方路经由贝塞尔曲线绘制，即波浪，最终到达右上角
    ctx.lineTo(canvas.width, canvas.height); // 路径右下角
    ctx.lineTo(0, canvas.height); // 路径左下角
    // ctx.lineTo(0, canvas.height / 2 + deltaHeight);
    // ctx.closePath();
    ctx.fill(); // 自动闭合并填充路径
  }
  requestAnimFrame(loop);
}

loop();

