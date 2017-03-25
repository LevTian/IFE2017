var acity = ["北京", "天津", "上海", "重庆"];
var bjschool = ["北京大学", "清华大学", "中国人民大学", "北京师范大学"];
var tjschool = ["天津大学", "南开大学"];
var shschool = ["同济大学", "复旦大学", "上海交通大学"];
var cqschool = ["重庆大学", "西南大学"];

function addOption(select, array)
{
	for (var i = 0; i < array.length; i++)
	{
		var option = document.createElement("option");
		var str = array[i];
		var text = document.createTextNode(str);
		option.appendChild(text);
		option.setAttribute("name", str);
		select.appendChild(option);
	}
}

function delOption(select)
{
	var opts = select.childNodes;
	var length = opts.length;	//对于长度会变短的数组必须将长度在for循环前记录
	for (var i = 0; i < length; i++)
	{
		select.removeChild(opts[0]);	//此处数组下标不能用i,因为数组的长度在减小，减小到比i小时就会出错
	}
	
}

function init()
{
	var student = document.getElementById("student");
	var notstudent = document.getElementById("notstudent");
	var city = document.getElementById("city");
	var school = document.getElementById("school");
	var forunit = document.getElementById("forunit");
	var forschool = document.getElementById("forschool");
	//城市和学校需要在初始化时加载，不是点击student时加载
	addOption(city, acity)
	addOption(school, bjschool);
	//click时只显示和隐藏，不能用于添加，用于添加会导致，每次点击都添加
	student.addEventListener("click", function(event){
		forunit.setAttribute("style", "display:none");
		forschool.setAttribute("style", "display:inline;");
	}, false);
	
	notstudent.addEventListener("click", function(event){
		forunit.setAttribute("style", "display:inline;");
		forschool.setAttribute("style", "display:none;");
	}, false);
	//option事件为onchange
	city.addEventListener("change", function(event){
		var str = event.target.value;	//获得当前选择的城市	
		switch (str)
		{
			case "北京": 
				delOption(school);	//添加学校前先将其它城市的学校删除
				addOption(school, bjschool); 
				break;
			case "天津": 
				delOption(school);
				addOption(school, tjschool); 
				break;
			case "上海": 
				delOption(school);
				addOption(school, shschool); 
				break;
			case "重庆": 
				delOption(school);
				addOption(school, cqschool); 
				break;
		}	
	}, false);
}

init();