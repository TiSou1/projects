
const canvas = document.querySelector('canvas');
//直接代指画布上的一块允许我们绘制 2D 图形的区域。
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min,max){
	return Math.floor(Math.random()*(max-min)) + min;
}

function randomColor(){
	return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}

//小球对象构造器
//xy开始坐标 velx,vely水平数值速度,color颜色,size半径
function Ball(x,y,velX,velY,color,size){
	this.x = x;
	this.y=y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}
//给小球原型加上draw()方法
Ball.prototype.draw = function (){
	ctx.beginPath();//表明即将开始绘画
	//填充颜色
	ctx.fillStyle = this.color;
	//画圆
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
	//结束绘画
	ctx.fill();
}
//给小球原型加上update()方法,z这里不用箭头函数,this指向为window
Ball.prototype.update = function() {
	// console.log(this);
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
//碰撞检测
Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}

//动态创建25个小球
let balls = [];
while(balls.length < 25){
	let size = random(10,20);
	let ball = new Ball(
		random(0+size,width-size),
		random(0+size,height-size),
		random(-8,8),
		random(-8,8),
		randomColor(),
		size,
	);
	balls.push(ball);
}

//运动循环
function loop(){
	ctx.fillStyle = 'rgba(0,0,0,.25)';
	ctx.fillRect(0,0,width,height);
	
	for(let i=0;i<balls.length;i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}
	requestAnimationFrame(loop);
}
/*将整个画布的颜色设置成半透明的黑色。然后使用  fillRect()（这四个参数分别是起始的坐标、绘制的矩形的宽和高）画出一个填充满整个画布的矩形。这是在下一个视图画出来时用来遮住之前的视图的。如果不这样做得话，你就会在屏幕上看到一条蛇的形状而不是小球的运动了。用来填充的颜色设置成半透明的rgba(0,0,0,0.25)，也就是让之前的视图留下来一点点，从而你可以看到小球运动时的轨迹。如果你将 0.25 设置成 1 时，你就完全看不到了。试着改变其中的值查看造成的影响。
当且仅当小球数量小于 25 时，将 random() 函数产生的数字传入新的小球实例从而创建一个新的小球，并且加入到数组中。因此当屏幕上有 25 个小球时，不会再出现更多小球。你可以改变这个值，从而看到不同小球个数造成的影响。如果你的电脑或者浏览器性能不怎么样的话，几千个小球的速度就会明显慢下来。
遍历数组中的所有小球，并且让每个小球都调用 draw() 和 update() 函数来将自己画出来，并且再接下来的每一帧都按照其速度进行位置的更新。
使用 requestAnimationFrame() 方法再运行一次函数 —— 当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，这样我们可以得到一个平滑的动画效果。这主要是通过递归完成的 —— 也就是说函数每次运行的时候都会调用自己，从而可以一遍又一遍得运行。
*/

loop();

//创建小球实例
// let testBall = new Ball(50,100,4,4,'blue',10);
// testBall.x
// testBall.size
// testBall.color
// testBall.draw()