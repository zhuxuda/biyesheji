﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Turing.aspx.cs" Inherits="OA.Turing" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0043)http://www.tuling123.com/plugin/proexp.html -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>产品体验</title>
    <link rel="icon" href="http://www.tuling123.com/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="js/turing/reset.css">
    <link rel="stylesheet" href="js/turing/proexp.css">
    <link rel="stylesheet" href="js/turing/top.css">
    <link rel="stylesheet" href="js/turing/footer.css">
    <link href="js/turing/base.css" rel="stylesheet" type="text/css">
    <style>
        .modal
        {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            z-index: 20;
            display: none;
        }
        .modal .bg
        {
            width: 100%;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            background: #000;
            filter: alpha(opacity=50);
            opacity: 0.5;
        }
        .modal .modal_text
        {
            width: 600px;
            position: absolute;
            z-index: 20;
            left: 50%;
            top: 150px;
            margin-left: -300px;
            background: #fff;
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        }
        .modal .modal_text .head
        {
            padding: 15px;
            border-bottom: 1px solid #e5e5e5;
        }
        .modal .modal_text .head h1
        {
            text-align: center;
            height: 25px;
            line-height: 25px;
            font-size: 18px;
        }
        .modal .modal_text .head button
        {
            float: right;
            border: 0;
            width: 25px;
            height: 25px;
            cursor: pointer;
            background: none;
        }
        .modal .modal_text .text
        {
            padding: 15px;
        }
        .modal .modal_text .text p
        {
            height: 20px;
            font-size: 14px;
            color: #428bca;
            cursor: pointer;
            text-align: center;
            margin: 0 0 10px;
        }
        .modal .modal_text .text p a
        {
            color: #428bca;
            text-decoration: none;
        }
        .modal .modal_text .text p a:hover
        {
            text-decoration: underline;
        }
    </style>
    <script type="text/javascript" src="js/turing/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="js/turing/base.js"></script>
    <style>
        #header
        {
            width: 100%;
            height: 85px;
            position: static;
            background: #FFF none repeat scroll 0% 0%;
            box-shadow: 0px 0px 5px #CCC;
        }
    </style>
    <style type="text/css"></style>
</head>
<body onload="setfocus()">
    <form id="form1" runat="server">
    <script type="text/javascript" src="js/turing/browser.js"></script>
    <script type="text/javascript">
        $(function () {

            //判断会员是否登录
            $.ajax({
                url: "/web/member!ajaxProexpMemberVerify.action",
                type: "POST",
                dataType: "json",
                //async: false,
                cache: false,
                success: function (data) {
                    if (data.status == 'success') {
                        //已登录
                        $('.login').hide();
                        $('.zhuce').hide();
                        $('.gerenzhongxin').show();
                        if (data.message == "") {
                            apd = "<div class='left''><div class='text'><i></i><span>和图灵机器人来聊聊吧~</span></div></div>";
                            $("#kefu_text").append(apd);
                        } else {
                            apd = "<div class='left''><div class='text'><i></i><span>和" + data.message + "来聊聊吧~</span></div></div>";
                            $("#kefu_text").append(apd);
                        }
                    } else {
                        //未登录
                        $('.gerenzhongxin').hide();
                        $('.login').show();
                        $('.zhuce').show();
                        apd = "<div class='left''><div class='text'><i></i><span>和图灵机器人来聊聊吧~</span></div></div>";
                        $("#kefu_text").append(apd);
                    }
                }
            });
        });
    </script>
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div class="modal">
        <div class="modal_text">
            <div class="head">
                <button>
                    ×</button>
                <h1>
                    你可以这样问我</h1>
            </div>
            <div class="text" id="modal">
                <p>
                    <a href="http://www.tuling123.com/plugin/proexp.html#">1</a></p>
                <p>
                    <a href="http://www.tuling123.com/plugin/proexp.html#">1</a></p>
            </div>
        </div>
        <div class="bg">
        </div>
    </div>
    <div id="wrap1" class="wrap">
        <div class="m-pro-exp">
            <h1>
                图灵机器人</h1>
            <div class="exp_left">
                <div class="box" id="box">
                    <div id="kefu_text" runat="server">
                        
                        <div class="left">
                            <div class="text">
                                <i></i><span>和图灵机器人来聊聊吧~</span></div>
                        </div>
                        
                    </div>
                </div>
                <div class="text_btn">
                    <div class="textareaWapper_z">
                        <textarea id="text" runat="server"></textarea>
                    </div>
                    <input type="button" id="btn" value="发送">
                    <%--<asp:Button ID="btn" runat="server" Text="发送" OnClick="btn_Click" />--%>
                </div>
            </div>
            <div class="exp_right">
                <ul>
                    <li>
                        <img src="js/turing/icon146.png">
                        <p>
                            聊天</p>
                    </li>
                    <li>
                        <img src="js/turing/icon147.png">
                        <p>
                            笑话</p>
                    </li>
                    <li>
                        <img src="js/turing/icon148.png">
                        <p>
                            图片</p>
                    </li>
                    <li>
                        <img src="js/turing/icon149.png">
                        <p>
                            天气</p>
                    </li>
                    <li>
                        <img src="js/turing/icon150.png">
                        <p>
                            问答</p>
                    </li>
                    <li>
                        <img src="js/turing/icon151.png">
                        <p>
                            百科</p>
                    </li>
                    <li>
                        <img src="js/turing/icon152.png">
                        <p>
                            故事</p>
                    </li>
                    <li>
                        <img src="js/turing/icon153.png">
                        <p>
                            新闻</p>
                    </li>
                    <li>
                        <img src="js/turing/icon154.png">
                        <p>
                            菜谱</p>
                    </li>
                    <li>
                        <img src="js/turing/icon155.png">
                        <p>
                            星座</p>
                    </li>
                    <li>
                        <img src="js/turing/icon156.png">
                        <p>
                            凶吉</p>
                    </li>
                    <li>
                        <img src="js/turing/icon157.png">
                        <p>
                            成语接龙</p>
                    </li>
                    <li>
                        <img src="js/turing/icon158.png">
                        <p>
                            快递</p>
                    </li>
                    <li>
                        <img src="js/turing/icon159.png">
                        <p>
                            飞机</p>
                    </li>
                    <li>
                        <img src="js/turing/icon160.png">
                        <p>
                            列车</p>
                    </li>
                    <li>
                        <img src="js/turing/icon161.png">
                        <p>
                            计算</p>
                    </li>
                </ul>
            </div>
        </div>
        <div id="wrap" class="wrap">
        </div>
    </div>
    
    
    </form>
   
    <script type="text/javascript">
            //<![CDATA[
		$( function(){
			var showkey = [
			    {
			        "id": "聊天",
			        "value": ["你好，你是美女么？","挖掘机技术哪家强？"]
			    },
			    {
			        "id": "笑话",
			        "value": ["讲个笑话","冷笑话"]
			    },
			    {
			        "id": "图片",
			        "value": ["刘亦菲的图片"]
			    },
			    {
			        "id": "天气",
			        "value": ["北京今天的天气","北京今天的空气质量"]
			    },
			    {
			        "id": "问答",
			        "value": ["地球到月球的距离","感冒应该怎么办","虎皮鹦鹉吃什么"]
			    },
			    {
			        "id": "百科",
			        "value": ["百科周杰伦","李连杰的介绍"]
			    },
			    {
			        "id": "故事",
			        "value": ["讲个故事","讲个白雪公主的故事"]
			    },
			    {
			        "id": "新闻",
			        "value": ["我要看新闻","体育新闻","科技新闻","周杰伦的新闻"]
			    },
			    {
			        "id": "菜谱",
			        "value": ["红烧肉怎么做","辣子鸡丁的菜谱"]
			    },
			    {
			        "id": "星座",
			        "value": ["天蝎座明天的运势","现在是什么星座","今年属牛的运势"]
			    },
			    {
			        "id": "吉凶",
			        "value": ["周杰伦这个名字好不好","10086凶吉"]
			    },
			    {
			        "id": "成语接龙",
			        "value": ["开始成语接龙"]
			    },
			    {
			        "id": "快递",
			        "value": ["顺丰快递"]
			    },
			    {
			        "id": "飞机",
			        "value": ["明天从北京到上海的航班"]
			    },
			    {
			        "id": "列车",
			        "value": ["明天从北京到石家庄的火车"]
			    },
			    {
			        "id": "计算",
			        "value": ["3乘以5等于多少","25*25等多少"]
			    }
			];
			
			var str = "";
			$(".exp_right li").on("click", function(){
				var index = $(this).index();
				var len = showkey[index].value.length;
				for( var i = 0;i<len;i++ ){
					str +="<p><a onclick='subtest(this)' href='javascript:void(0)'>"+ showkey[index].value[i] +"</a></p>"
				}
				$("#modal").html( str );
				$(".modal").show().children(".bg").show();
				str = "";
			});
			$(".modal .head button").on("click", function(){
				$(".modal").hide();
			});
			
			//这里是点击确定
			$("#btn").on("click", function(){
				var test = $("#text").val();
				if( test == "" ){
					return false;
				};
				apd =  	"<div class='right''>\
							<div class='text'>\
								<i></i><span>"+ test +"</span>\
							</div>\
						</div>";
				$("#kefu_text").append(apd);
				//这里请求后台获取返回值
				submitvalues(test);
				$("#text").val("");
				//这个是获取高度让它一直在底部
				var height = $("#kefu_text").height();
				$("#box").scrollTop( height);
			});
			$("#text").on("keydown", function(e){
				var button = $("#btn");//新加
				e = e || window.event;
				var keys = e.keyCode;
				if( keys == "13" ){
					 button.click();
					 return false;
				};
			});
				
		});
	var a = $("#kefu_text");//信息展示框
	var b = $("#text");//输入框
	//设置光标默认在输入框内
	function setfocus() {
		var textarea = $('#text');
		textarea.focus();
	}
		
	function subtest(dom){
		var test = $(dom).html();
		apd =  	"<div class='right''>\
					<div class='text'>\
						<i></i><span>"+ test +"</span>\
					</div>\
				</div>";
		$("#kefu_text").append(apd);
	
		submitvalues(test);
		//这个是获取高度让它一直在底部
		var height = $("#kefu_text").height();
		$("#box").scrollTop( height);
		$('.modal').hide();
	}
		
	
	String.prototype.trim = function () { // 重写
		return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
	}
	
	function submitvalues(content){

		content = content.replace('+', "%2B");
	    content = content.replace('&', "%26");
	    content = content.replace('%', "%25");
        $.getJSON("http://www.tuling123.com/openapi/api",{"key":"7472fe4b01d0888230b7e6793391b244","info":content,"userid": "eb2edb736"},function(result){
            $.each(result,function(i,field){
                obj=JSON.parse(field);
                alert(obj);
                  
            });
        });
//        $.ajax({
//            type:"POST",
//            url:"http://www.tuling123.com/openapi/api",
//            data:{
//                "key":"7472fe4b01d0888230b7e6793391b244",
//                "info":content
//                },
//            dataType:"json",
//            success:function(data){
//               
//                
//            }
//        });
//		$.ajax({
//			url: "/web/product_exp_new!result.action",
//			data: {"info":content,"monitor": "monitor"},
//			type: "POST",
//			dataType: "xml",
//			cache: false,
//			success: function(data) {
//				var xml = data;
//				var type =  $(xml).find("MsgType").text();
//				if("text" == type){
//					getResult( xml, content, 0);
//					var height = $("#kefu_text").height();
//					$("#box").scrollTop( height);
//				}else if("news" == type){
//					getResult( xml, content, 1);
//					var height = $("#kefu_text").height();
//					$("#box").scrollTop( height);
//				}else{
//					errorresult();
//					//$.dialog({type: "warn", content: "长时间未使用页面，请刷新后重新尝试", ok: "确 定", cancel: "取 消", modal: true, okCallback: reloads});
//				}
//			},
//			error:function(){
//				   //errorresult();
//                   //$.dialog({type: "warn", content: "长时间未使用页面，请刷新后重新尝试", ok: "确 定", cancel: "取 消", modal: true, okCallback: reloads});
//			}
//		});
	}
	//刷新页面
	function reloads(){
		location.reload();
	}
	//当ajax出错的时候
	function errorresult(){
		var li = $("<div/>").appendTo(a);
		li.attr({
			"class": "left",
		});
		var  div = $("<div/>").appendTo(li).attr({
			"class": "text"
		});
		$("<i/>").appendTo(div);
		var span = $("<span/>").appendTo(div);
		span.html("图灵机器人被外星人抓走了，请稍后再试~");
	}
	
	function getResult( xml, content, msgType){
		var text = $(xml).find("Content").text();
		var li = $("<div/>").appendTo(a);
		if(0 == msgType){// text类型的返回消息
			li.attr({
				"class": "left",
			});
			var  div = $("<div/>").appendTo(li).attr({
				"class": "text"
			});
			$("<i/>").appendTo(div);
			var span = $("<span/>").appendTo(div);
			span.html(text);
		}else if(1 == msgType){// news类型的返回消息
			li.attr({
				"class": "center_box"
			});
			$("<i/>").appendTo(li);
			getNews(xml, content, li);
		}
	}
	function getNews(xml, content, li){ // 拼接图文类的返回消息
		var robot_news = $("<div/>").appendTo(li).attr({
			"class": "center"
		});
		var articleCount = parseInt($(xml).find("ArticleCount").text());
		var items = $(xml).find("item");
		items.each(function(i, value){
			if(i<3){				
				var item = [ $(value).find("Title").text(), $(value).find("Description").text(),
				             $(value).find("PicUrl").text(), $(value).find("Url").text() ];
				var root = null;
			   getMoreNews(robot_news, i, articleCount, item);
			}
		});
	
	}
	
	function getMoreNews(robot_news, i, articleCount, item){
		var root = null;
		if(0==i){
			root = $("<a/>").appendTo(robot_news).attr({
				"href" : item[3],
				"style"  : "text-decoration:none;",
				"target" : "_blank"
			});
			var div_head = $("<div/>").appendTo(root).attr({
				"class" : "head"
			});
			var div_img = $("<div/>").appendTo(div_head).attr({
				"class" : "head_img"
			});
			$("<img/>").appendTo(div_img).attr({
				"src"   : item[2]||"..images/defaultFirst.jpg"
			});
			var div_text =$("<div/>").appendTo(div_head).attr({
				"class" : "head_text"
			});
			div_text.html(item[0]);			
		}else{
			root = $("<div/>").appendTo(robot_news).attr({
				"class" : "center_text"
			});
			var ab = $("<a/>").appendTo(root);
			if(item[3].length==0){
				ab.attr({
					"href" : "javascript:void(0);",
					"style"  : "text-decoration:none;"
				})
			}else{
				ab.attr({
					"href" : item[3],
					"target" : "_blank",
					"style"  : "text-decoration:none;"
				})
			}
			var div_desc = $("<div/>").appendTo(ab).attr({
				"class" : "center_lf"
			});
			div_desc.html(item[0]);
			var div_pic = $("<div/>").appendTo(root).attr({
				"class" : "center_rt"
			});
			$("<img/>").appendTo(div_pic).attr({
				"src"   : item[2]||"../images/default.jpg",
			});
		}
	}

		$('#text').on('scroll',function(){
			return false;
		})
            //]]>
    </script>
</body>
</html>
