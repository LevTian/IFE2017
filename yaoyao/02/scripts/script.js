/* var reminds = ["必填，长度为4-16个字符", 
				"请输入密码", 
				"再次输入密码", 
				"请输入邮箱", 
				"请输入手机号码"];
var  correct = ["名称可用", 
				"密码可用", 
				"两次密码相同", 
				"邮箱格式正确", 
				"手机号码格式正确"];
var error = ["姓名不可用，长度为4-16个字符",
				"",
				"两次密码不一致",
				"邮箱格式不正确",
				"手机号码格式不正确"];

function addFocusEvent(inputs)
{
	if (inputs.length == 0)
	{
		return -1;
	}
	for (var i = 0; i < inputs.length-1; i++)
	{
		var input = inputs[i];
		input.i = i;
		input.addEventListener("focus", function(event)
		{
			var nextNode = this.nextSibling;
			var parent = input.parentNode;
			var p = document.createElement("p");
			var text = document.createTextNode(reminds[this.i]);
			p.appendChild(text);
			parent.insertBefore(p, this.nextSibling);
		}, false);
	}
}


function addBlurEvent(inputs)
{
	if (inputs.length == 0)
	{
		return -1;
	}
	for (var i = 0; i < inputs.length-1; i++)
	{
		var input = inputs[i];
		input.i = i;
		input.addEventListener("blur", function(event)
		{
			this.res = judge(this);
			var p = document.createElement("p");
			if (this.res)
			{
				this.str = correct[this.i];
				var text = document.createTextNode(this.str);
				p.appendChild(text);
				p.style.color = "#0f0";
			}
			else
			{
				this.str = error[this.i];
				var text = document.createTextNode(this.str);
				p.appendChild(text);
				p.style.color = "#f00";
			}
			var parent = input.parentNode;
			parent.replaceChild(p, this.nextSibling);	//替换掉获得焦点时的提示语
		}, false);
	}
}
*/
//以上注释为第一次尝试使用动态添加提示语


function judge(input)
{
	var id = input.getAttribute("id");
	var value = input.value;
	var res;
	switch (id)
	{
		case "name": 
			if (value.length >= 4 && value.length <= 16)
			{
				res = true;
			}
			else
			{
				res = false;
			}; break;
		case "psw1": 
			if (value)
				res = true; 
			else
				res = false;
			break;
		case "psw2": 
			var psw1 = document.getElementById("psw1").value;
			if (value == psw1 && value != "")
			{
				res = true;
			}
			else
			{
				res = false;
			}
			break;
		case "mail": 
			if (/\w+@\w+/.test(value))
			{
				res = true;
			}
			else
			{
				res = false;
			}; break;
		case "phone": 
			if (/\d+/.test(value))
			{
				res = true;
			}
			else
			{
				res = false;
			}; break;
	}
	return res;
}

function addFocusEvent(inputs)
{
	if (inputs.length == 0)
	{
		return -1;
	}
	for (var i = 0; i < inputs.length-1; i++)
	{
		var input = inputs[i];
		input.i = i;
		input.addEventListener("focus", function(event)
		{
			this.parent = this.parentNode;
			this.span = this.parent.getElementsByTagName("span");
			this.span[0].setAttribute("style", "display: inline;");
			this.span[1].setAttribute("style", "display: none;");
			this.span[2].setAttribute("style", "display: none;");
		}, false);
	}
}

function addBlurEvent(inputs)
{
	if (inputs.length == 0)
	{
		return -1;
	}
	for (var i = 0; i < inputs.length-1; i++)
	{
		var input = inputs[i];
		input.i = i;
		input.addEventListener("blur", function(event)
		{
			this.res = judge(this);
			if (this.res)
			{
				this.parent = this.parentNode;
				this.span = this.parent.getElementsByTagName("span");
				this.span[0].setAttribute("style", "display: none;");
				this.span[1].setAttribute("style", "display: inline;");
				this.span[1].setAttribute("class", "correct");
				this.span[2].setAttribute("style", "display: none;");
			}
			else
			{
				this.parent = this.parentNode;
				this.span = this.parent.getElementsByTagName("span");
				this.span[0].setAttribute("style", "display: none;");
				this.span[1].setAttribute("style", "display: none;");
				this.span[2].setAttribute("style", "display: inline;");
				this.span[2].setAttribute("class", "error");
			}
		}, false);
	}
}

function submit()
{
	var spans = document.getElementsByTagName("span");
	for (var i = 0; i < spans.length; i++)
	{
		var cls = spans[i].getAttribute("class");
		if (cls == "error")
		{
			alert(spans[i].lastChild.nodeValue);
		}
	}
}

function init()
{
	var inputs = document.getElementsByTagName("input");
	var button = document.getElementById("button");
	addFocusEvent(inputs);
	addBlurEvent(inputs);
	button.addEventListener("click", function(){
		submit();
	}, false);
}

init(); 



