//存储分数
let grades = new Array(16);
const len = grades.length;
let score = 0;
grades.fill(0, 0, 16); //初始值为0

//获取显示分数的dom元素
const dScore = document.querySelector('.show');
const doms = document.querySelectorAll('.cell');
const hidden = document.querySelector('.hidden');
dScore.innerHTML = 0;

function show() {
	for (let i = 0; i < 16; i++) {
		if (grades[i] !== 0) {
			doms[i].innerText = grades[i];
			//先清除之前的样式
			doms[i].setAttribute('class', 'cell');
			//添加类名 ,已加上样式
			doms[i].classList.add('num' + grades[i]);
		} else {
			doms[i].innerText = '';
			doms[i].setAttribute('class', 'cell');
		}
	}
}

//产生随机数范围在空下表个数之内
const random = () => {
	let zeros = []; //存放空下表数
	
	for (let i = 0; i < len; i++) {
		if (grades[i] == 0) {
			//存放空位置的下标,新出现的数字智能出现在
			zeros.push(i);
		}
	}
	//从空下表中随机取出一个下标
	let num = zeros[Math.floor(Math.random() * zeros.length)];
	return num;
}

function init() {
	//初始出现2个数字2
	let x1, x2;
	while (true) {
		x1 = random();
		x2 = random();
		//x1与 x2初始位置不相同
		if (x1 != x2)
			break;
	}
	//更新分数数组的值
	grades[x1] = twoOrFour();
	grades[x2] = twoOrFour();
	//更新dom的值
	show();
}
//按一定概率产生2或者4
function twoOrFour() {
	return Math.random() < 0.8 ? 2 : 4;
}
//移动事件处理
const handMove = (type) => {
	
	let types = {
		left: 'left',
		up: 'up',
		right: 'right',
		down: 'down',
	}
	let j;
	//先更新数组中的值,然后在更新dom值
	if (type === types.left) {
		//左移
		for (let i = 1; i < len; i++) {
			j = i;
			while (j % 4 != 0) { //第一列不参数
				merge(j - 1, j); //与其左边的元素
				//
				j -= 1;
			}
		}
	} else if (type === types.up) {
		//上移
		for (let i = 4; i < len; i++) { //从第二行开始
			j = i;
			while (j >= 4) {
				merge(j - 4, j); //与其上边的元素
				j -= 4;
			}
		}
	} else if (type === types.right) {
		//右移
		for (let i = 14; i >= 0; i--) {
			j = i;
			while (j % 4 != 3) { //不为第4列
				merge(j + 1, j); //与其右边的元素
				j += 1;
			}
		}
	} else if (type === types.down) {
		//下移
		for (let i = 11; i >= 0; i--) {
			j = i;
			while (j <= 11) { //到第三行结束为止
				merge(j + 4, j);
				j += 4;
			}
		}
	}

	//合并后 ,要在产生随机数
	let num = random();
	grades[num] = twoOrFour();
	//更新数据
	show();
}
const merge = (preIndex, curIndex) => {
	//preIndex前面的分数索引,curIndex当前的分数索引
	if (grades[curIndex] != 0) {
		if (grades[preIndex] == 0) {
			grades[preIndex] = grades[curIndex];
			grades[curIndex] = 0;
		} else if (grades[preIndex] == grades[curIndex]) { //两者相加
			grades[preIndex] += grades[curIndex];
			score += grades[preIndex];
			dScore.innerHTML = score;
			grades[curIndex] = 0;
		}
	}
}
//获取键盘事件
function handeKeywords() {
	
	document.addEventListener('keydown', (e) => {
		if(over()){
			console.log('游戏结束...');
			clean();
			hidden.style.display = 'block';
			return;
		}
		//这里用keyCode来确认按键
		console.log(e.keyCode);
		let code = e.keyCode;
		if (code == 37 || code == 65) {
			console.log('左移');
			handMove('left');
		} else if (code == 38 || code == 87) {
			console.log('上移');
			handMove('up');
		} else if (code == 39 || code == 68) {
			console.log('右移');
			handMove('right');
		} else if (code == 40 || code == 83) {
			console.log('下移');
			handMove('down');
		} else
			console.log(e);
	})
}

//游戏结束判断
function over(){
	for(let i=0;i<len;i++){
		if(grades[i] == 0)
			return false;
		if(i%4 !=3){
			if(grades[i] == grades[i+1])
				return false;
		}
		if(i<12){
			if(grades[i] == grades[i+4])
				return false
		}
	}
	return true;	
}
function clean(){
	start.style.display = 'inline-block';
	grades.fill(0, 0, 16);
}


const restart = document.querySelector('.restart');
const start = document.querySelector('.start');
start.onclick = () => {
	console.log('游戏开始...');
	start.style.display = 'none';
	init();
	handeKeywords();
}
restart.onclick = function() {
	console.log('重新开始');
	hidden.style.display = 'none';
	clean();
	//分数清零
	score = 0;
	dScore.innerHTML = 0;
	show();
}
