### 01.jQuery基础

jQuery函数$()也就是jQuery(),4种调用方法

> 1.常用的调用方法是传入CSS选择器(字符串)给$()方法

例如:$('div')表示选择所有的div,第二个参数可选,填入元素,表示在该元素的子集中选择

> 2.第二种调用方式是传递一个Element,Document,window对象给$()

此时,jQuery会将这些对象封装成jQuery对象并返回(可以试试用jQuery方法,而不用原生方法)

> 3.传入html文本字符串给$()

jQuery会依据传入文本创建好html元素并封装为jQuery对象返回

可以传入第二个参数,表示该元素的一些属性

如:jQuery创建元素

```let img = $('<img/>',{src:url,css:{borderWidth:5},click:handleClick})```

创建一个<img/>标签

> 4.传入一个函数给$()

当文档加载完且DOM可操作时,传入函数被调用

jQuery(function(){

​	//jQuery代码

});

等价写法还有$(function(){})

$(document).ready(function(){})

和原生的window.onload = function(){}功能类似.

传递给$()的函数被调用时,this指向document对象,唯一的参数指向jQuery函数.

jQuery.noConflict();//换源$()为初始值

jQuery(function($){

})//$()成为jQuery对象的局部别名(本来为全局)



### 02.jQuery,getter和setter

通常getter()只会获取第一个元素,二setter()可以设置多个

##### attr(),元素属性

```
$('form').attr('action');//获取第一个form的action
$('#icon').attr('src','icon.gig')//设置id为icon元素的src值
```

##### css(),元素样式

```
$('h1').css('font-weight');//获取第一个h1的字体重量
$('h1').css('fontWeight');//也可采用驼峰格式
$('p').css({color:'red',padding:'10px'});//设置多个值
也可传入函数
$('p').css('font-size',function(v){...})
```

##### 获取设置css类

```
$('h1').addClass('hilite')//给所有<h1>添加类名hilite
$('p').removeClass('hilite')//删除类名
$('div').toggleClass('hilite')//存在该类名则删除,不存在则添加
$('p').hasCLass('first')//检测类名,只能接受单个类名
$('p').is('.first.hilite')//is比hasClass灵活
```

##### 获取设置表单的值

```
$('#inp').val()//获取文本值
```

##### 获取设置元素内容

```
$('div').text()//返回所有
$('div').html()//只返回第一个
```

##### 获取设置元素位置宽高

```
let position = $('#btn').offset()//获取当前位置
position.top += 100
$('#btn').offset(position)//设置心的位置

$('#btn').width()//获取宽度,不包括内边距,边框,外边框
$('#btn').innerWidth()//包含内边距和宽度
$('#btn').outWidth()//包含元素内边距和边框的尺寸

$(window).height();
$(window).scrollTop()//滚动条
$(window).scrollTop(1000);//设置值
```

### 03.修改文档结构

##### 插入和替换元素

```
$('div.box').append('<p>你好</p>');//添加元素,结尾处
$('div.box').prepend('<p>你好</p>');//起始处
$('div.box').after('<hr/>');//在元素后面添加水平线
$('div.box').before('<hr/>');//在元素前面添加水平线
$('hr').replaceWith('<hr/>');//将hr替换为br
$('h2').each(function(){
	let h2 = $(this);
	h2.replaceWith('<h1>'+h2.html()+"</h1>");//将h2替换为h1内容不变
})
```

##### 复制元素

```
$('a').clone().appentTo('#list')//复制所有的a,插入到id为list中
//不会复制事件处理程序

```

##### 删除

```
enpty()删除子节点,包括文本
remove()删除节点,以及节点内的内容
```

### 04.jQuery事件处理

##### 事件简单注册

> $('p').click(function(){});

##### 事件高级注册

> $('p').bind('click',function(){})
>
> $('div').bind('click mouseup',f)//注册多个事件

##### 事件注销(unbind())

> $('*'),unbind()注销所有bind绑定的事件

##### 自定义事件

##### 事件监听

```

$('#targrt').on('click',function(event){
    console.log('target');  //被点击了
    $('body').css('backgroundColor','#ff0');

```



### 05.动画效果

##### 简单动画

```
fadeIn fadeOut fadeTo
这是最简单的动画: fadeIn()和fadeout()简单地改变CSS的opacity属性来显示或隐藏元素。两者都接受可选的时长和回调参数。fadeTo()稍有不同:它需要传人一个opacity目标值，fadeTo()会将元素的当前opacity值变化到目标值。调用fadeTo()方法时，第一参数必须是时长(或选项对象），第二参数是opacity目标值，回调函数则是可选的第三个参数。

```

```
show() hide() toggle()
上面的fadeOut()方法可以让元素不可见，但依旧保留了元素在文档布局中的占位。hide()方法则会将元素从布局中移除，就好像把CSS的display属性设置为none一样。当不带参数调用时，hide()和show()方法只是简单地立刻隐藏或显示选中元素。带有时长（或选项对象）参数时，它们会让隐藏或显示有个动画过程。hide()在将元素的opacity减少到0时，同时它还会将元素的宽度和高度收缩到o.show()则进行反向操作。
toggle()可以改变在上面调用它的元素的可视状态:如果隐藏，则调用s how();如果显示，则调用hide()。与s how()和hide()一样，必须传入时长或选项对象给toggle()来产生动画效果。给toggle()传入true和不带参数调用show()是一样的，传入false则和不带参数调用hide()是一样的。注意，如果传入两个或多个函数参数给toggle()，它会注册为事件处理程序，这在19.4.1节讲述过。

```

```
slideDown() slideUp() slideToggle()
slideUp()会隐藏jQuery对象中的元素，方式是将其高度动态变化到0，然后设置CSS的display属性为“none”。 slideDown()执行反向操作，来使得隐藏的元素再次可见。slideToggle()使用向上滑动或向下滑动动画来切换元素的可见性。这三个方法都接受可选的时长和回调参数（或选项对象参数）。

```

##### 自定义动画

```
animate()第一个参数指定动画内容,剩余参数指定如何制作动画
//第一个参数为对象,指定属性要变化到的目标值
$('img').animate({height:0})//高度变为0

$('img').animate({
opacity:.25,
fontsize: 10,
},{
	duration: 500,//500毫秒
	complete: function(){}//动画完成执行方法
})
```

```
//1.动画属性对象
$('p').animate({
	opacity:'-=.1',//相对值
	with:'hide'//hide保存当前值然后将该属性变为0
				//show将值还原为之前
				//toggle
})
//2.动画选项对象

duration指定动画持续时间
fast, slow, jQuery.fx.speeds定义

complete动画完成时的回调函数

step属性指定在动画每一步或每一帧的回调函数,this指向正在连续变化的袁术

queue属性指定订花是否需要队列化,依次执行,默认是队列化

缓动动画
easing属性指定缓动动画名,默认使用名为'swing'的正弦函数
线性变化用linear


可以将duration easing conplete指定为animate的参数
如:$('img').animate({'width':'+=100'},500,'linear');
```

##### 动画取消,延迟和队列

```
开始新动画前,取消之前的动画
$('img').bind({
	mouseover:function(){$(this).stop().fadeTo(300,1.0);},
	mouseout: function(){$(this).stop().fadeTo(300,0.5);},
})
delay()添加延迟
//延迟0.2s执行上滑
$('img').fadeTo(100,0.5).delay(200).slideUp();
```



### 06.jQuery的Ajax

##### load()

> setInterval(function(){$('#status').onload('status_report.html');},600)每隔0.6s显示最新报告

> $('#temp').load('wheater_report.html  #tempetature');//只加载文档的选中部分(tempetature)

```
除了必须的URL参数，load()方法还接受两个可选参数。第一个可选参数表示的数据，可以追加到URL后面，或者与请求一起发送。如果传入的是字符串，则会追加到URL后面（放在“?”或“&”后面)。如果传入对象，该对象会被转化为一个用“&”分隔的名/值对后与请求一起发送。（对象转化为字符串的具体细节在19.6.2节下面的“2.jQuery.getJSON()”节中描述。）通常情况下，load()方法发送HTTP GET请求，但是如果传入数据对象，则它会发送POST请求。下面是两个例子:

$('#temp').load('us_weather.html','zipcode=02134')
$('#temp').load('us_weather.html',{zipcode:02134,units:'F'})


另一个可选参数是回调函数
load()方法的另一个可选参数是回调函数。当Ajax请求成功或未成功，以及（当请求成功时）URL加载完毕并插入选中元素时，会调用该回调函数。如果没有指定任何数据，回调函数可以作为第二个参数传入。否则，它必须是第三个参数。在jQuery对象的每一个元素上都会调用回调函数，并且每次调用都会传入三个参数:被加载URL的完整文本内容、状态码字符串，以及用来加载该URL的XMLHttpRequest对象。其中，状态参数是jQuery的状态码，不是HTTP的状态码，其值是类似“success”, “error”和“timeout”的字符串。

```

##### Ajax工具函数

```
jQuery的其他Ajax高级工具不是方法，而是函数，可以通过jQuery或$直接调用，而不是在jQuery对象上调用。jQuery.getscript()加载并执行JavaScript代码文件。jQuery.getJ5ON()加载URL，将其解析为JSON,并将解析结果传递到指定的回调函数中。这两个函数都会调用一个更通用的URL获取函数: jQuery.get()。最后，jQuery.post()和jQuery.get()很类似，除了执行的是HTTP POST而不是GET请求。与load()方法一样，所有这些函数都是异步的:在任何数据加载前它们就会返回调用者，加载结果则通过调用指定的回调函数来通知。

```



> 1.jQuery.getScript()

jQuery.getscript()函数的第一个参数是JavaScript代码文件的URL。它会异步加载文件，加载完成后在全局作用域执行该代码。它能同时适用于同源和跨源脚本:

1l加载一个类库，并在加载完成时立刻使用它
jQuery.getScript( "jsljquery.my_plugin.js",function() {
$('div').my_plugin(); /使用加载的类库
});



> 2.jQuery.getJSON()

用指定的回调函数。jQuery.get3SON()获取到文本后，不会将其当做脚本执行，而会将其解析为JSON

假设data.json包含文本:‘{"x":1, "y":2}'

jQuery.getJSON("data.json", function(data) i
il data参数是对象{ x:1, y:2 }
);



> 传递数据给jQuery的Ajax工具

```
$('#submit_button').click(function(event) i
$(this.form).1oad(
/通过加载新内容来替换表单
this.form.action, '
/表单url
$(this.form).serialize(); /将表单数据附加到表单url后面event.preventDefault();
/取消掉表单的默认提交
this.disabled - "disabled";
1防止多次提交
;

```



> 3.jQuery.get()和Jquery.post()

```
jQuery.get()和jQuery.post()获取指定URL的内容，如果有数据的话，还可传入指定数据，最后则将结果传递给指定的回调函数。jQuery.get()使用HTTP GET请求来实现，jQuery.post()使用HTTP POST请求，其他两者则都是一样的。与jQuery.get]SON()一样，这两个方法也接受相同的三个参数:必需的URL，可选的数据字符串或对象，以及一个技术上可选但实际上总会使用的回调函数。调用的回调函数会被传入三个参数:第一个参数是返回的数据，第二个是“success”字符串﹔第三个则是XMLHttpRequest对象（如果有的话）

```





> jQuery.ajax()

```
jQuery的所有Ajax工具最后都会调用jQuery.ajax()一这是整个类库中最复杂的函数jQuery.ajax()仅接受一个参数:一个选项对象，该对象的属性指定Ajax请求如何抄的很多细节。例如，jQuery.getScript(url，callback)与以下jQuery.ajax()的调等价:
jQuery.ajax(i
type: "GET",
l/HTTP请求方法
url: url,
/要获取数据的ur1
data: null,
不给ur1添加任何数据
dataType: "script",ll一旦获取到数据，立刻当做脚本执行success: cal1backt完成时调用该函数
};

```



### 07.工具函数

> jQuery.each()

> jQuery.map()

> jQuery.merge(e1,e2),将e2添加到e1中(参数类型为数组或者对象)

> jQuery.parseJSON()解析json格式的字符串

> jQuery.trim()接收字符串参数,去除字符串开头和结尾的空白自负

### 08.jQuery选择器和选取方法

```
$('p')//选择所有的P标签
$('#btn')//选择id为btn的标签

$('h1, h2, h3')//选择h1 h2 h3标签


$('div').eq(1)//选取第二个div标签,接收负数(倒数)

$('div').slice(2, 5)//选取第3,4,5个p标签
$('div').slice(-3)//选取最后三个div

$('div').filter('.note')等价$('div.note')
$("div").filter( ".note")
1/与$( "div.note")一样
$("div").filter($(".note"))
1/与$( "div.note")一样
$("div").filter(function(idx) { return idx%2==0 }.)1/与$("div:even")一样


add()方法扩大选区
$('div').add(p)选择div和p
```

> 建议用到直接查找官网api

### 09.jQuery插件

### 10.jQuery UI类库